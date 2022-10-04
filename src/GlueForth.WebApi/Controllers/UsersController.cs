using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.OData;
using System.Web.Security;

namespace BlueNorth.WebApi
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.OData.Builder;
    using System.Web.OData.Extensions;
    using WebApiODataService1;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<PermissionPolicyUser>("PermissionPolicyUser");
    builder.EntitySet<Person>("Person");
    config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [ApiExplorerSettings(IgnoreApi = false)]
    public class UsersController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();
        const string USER_TYPE_NAME = "BlueNorth.Model.User";

        // GET: odata/Users
        /// <summary>
        /// Returns list of all Users. <code>User</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Users</returns>
        [EnableQuery]
        public IEnumerable<User> GetUsers()
        {
            var result = new List<User>();
            _db.Users.ToList().ForEach(x => result.Add(CloneUser(x)));
            return result;
        }

        private User CloneUser(User user)
        {
            return (User)_db.Entry(user).CurrentValues.ToObject();
        }

        // GET: odata/Users(5)
        /// <summary>
        /// Get <code>User</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>User</code></param>
        /// <returns><code>User</code> represented as root element, withoud referenced entities</returns>
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] Guid key)
        {
            return SingleResult.Create(_db.Users.Where(user => user.Oid == key));
        }

        /// <summary>
        /// Get <code>User</code> by UserName
        /// </summary>
        /// <param name="name">UserName</param>
        /// <returns><code>User</code> represented as RegUserDTO</returns>
        [Route("api/Users/GetByName")]
        public IHttpActionResult GetUserByName([FromODataUri] string name)
        {
            var result = _db.Users.FirstOrDefault(user => user.PermissionPolicyUser.UserName == name);
            var dto = new RegUserDTO(result);
            dto.LastModified = GetLastModifiedTime(result);
            dto.Password = Base64Encode(result.PermissionPolicyUser.StoredPassword);
            return Ok(dto);
        }

        /// <summary>
        /// Returns list of Organisations Users. <code>User</code> represented as simple structure { Oid, UserName, Name (full name) }
        /// </summary>
        /// <param name="organisationOid">Oid of Organisation</param>
        /// <returns>list of Users by Organisation</returns>
        public IHttpActionResult GetByOrganisation(Guid organisationOid)
        {
            var result = _db.Users.Where(user => user.Organisation1.Oid == organisationOid);
            return Ok(result.Select(x => new { x.Oid, x.PermissionPolicyUser.UserName, Name = x.Person1.FirstName + " " + x.Person1.LastName }));
        }

        private DateTime GetAssessmentLastModifiedTime(User result)
        {
            if (result.Unit != null && result.Unit.PrimaryFramework.HasValue)
            {
                var unitDataSets = _db.SPADataSets.Where(x => x.Unit.Value == result.Unit.Oid && x.Framework.Value == result.Unit.PrimaryFramework.Value && x.GCRecord == null).ToList();
                var lastModified = DateTime.MinValue;
                foreach (var ds in unitDataSets)
                {
                    var maxCreated = _db.Answers.Where(x => x.DataSet.Value == ds.OID && x.GCRecord == null).Max(x => x.Created);
                    var maxModified = _db.Answers.Where(x => x.DataSet.Value == ds.OID && x.GCRecord == null).Max(x => x.Modified);
                    maxModified = maxModified > maxCreated ? maxModified : maxCreated;
                    if (maxModified.HasValue && maxModified > lastModified)
                    {
                        lastModified = maxModified.Value;
                    }
                }
                return lastModified;
            }
            else return DateTime.MinValue;
        }

        private DateTime GetIndicatorsLastModifiedTime(User result)
        {
            var maxMod = _db.PrimaryDataValues.Where(x => x.IndicatorDataSet.Unit == result.Unit.Oid).Max(y => y.Modified);
            var maxCrtd = _db.PrimaryDataValues.Where(x => x.IndicatorDataSet.Unit == result.Unit.Oid).Max(y => y.Created);
            return maxCrtd > maxMod ? maxCrtd.GetValueOrDefault() : maxMod.GetValueOrDefault();
        }

        private DateTime GetLastModifiedTime(User result)
        {
            if (result.Unit != null && result.Unit.PrimaryFramework.HasValue)
            {
                var lastAssessmentModified = GetAssessmentLastModifiedTime(result);
                var lastIndicatorsModified = GetIndicatorsLastModifiedTime(result);
                return lastAssessmentModified > lastIndicatorsModified ? lastAssessmentModified : lastIndicatorsModified;
            }
            else return DateTime.MinValue;
        }


        /// <summary>
        /// Returns datetime of last Indicators'-related modification.
        /// </summary>
        /// <remarks>Used at Dashboard page</remarks>
        /// <returns>DateTime of last Indicator's value modification</returns>
        [Authorize]
        public IHttpActionResult GetIndicatorsLastModified()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            return Ok(GetIndicatorsLastModifiedTime(user));
        }

        /// <summary>
        /// Returns datetime of last Assessment'-related modification.
        /// </summary>
        /// <remarks>Used at Dashboard page</remarks>
        /// <returns>DateTime of last Assessment's value modification</returns>
        [Authorize]
        public IHttpActionResult GetAssessmentLastModified()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            return Ok(GetAssessmentLastModifiedTime(user));
        }

        /// <summary>
        /// Returns datetime of last data modification (Indicator or Assessment value.
        /// </summary>
        /// <remarks>Used at Dashboard page</remarks>
        /// <returns>DateTime of last data modification</returns>
        [Authorize]
        public IHttpActionResult GetLastModified()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            return Ok(GetLastModifiedTime(user));
        }

        /// <summary>
        /// Get full <code>User</code> information by UserName as UserDTO
        /// </summary>
        /// <param name="name">UserName</param>
        /// <returns><code>User</code> represented as UserDTO</returns>
        [Route("api/Users/GetByNameFull")]
        public IHttpActionResult GetFullUserByName([FromODataUri] string name)
        {
            var result = _db.Users.FirstOrDefault(user => user.PermissionPolicyUser.UserName == name);
            if (result == null) return NotFound();
            var res = new UserDTO(result) { LastModified = GetLastModifiedTime(result) };
            return Ok(res);
        }

        // POST: odata/Users
        /// <summary>
        /// POST Method for User update
        /// </summary>
        /// <param name="user"><code>UserDTO</code> instance</param>
        /// <returns>updated UserDTO</returns>
        public IHttpActionResult Post(UserDTO user)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var dbUser = _db.Users.Find(user.Oid);
            if (dbUser == null) return NotFound();
            var org = dbUser.Organisation;
            _db.Entry(dbUser).CurrentValues.SetValues(user);
            dbUser.Organisation = org;//patch
            if (!string.IsNullOrEmpty(user.PermissionPolicyUser?.StoredPassword))
            {
                //only password could be changed
                var permUser = _db.PermissionPolicyUsers.Find(user.PermissionPolicyUser.Oid);
                if (permUser != null) permUser.StoredPassword = user.PermissionPolicyUser.StoredPassword;
            }

            if (user.Person1 != null)
            {
                var person = _db.People.Find(user.Person1.Oid);
                _db.Entry(person).CurrentValues.SetValues(user.Person1);
                if (user.Person1.Party != null)
                {
                    var party = _db.Parties.Find(user.Person1.Party.Oid);
                    _db.Entry(party).CurrentValues.SetValues(user.Person1.Party);
                    foreach (var phone in user.Person1.Party.PhoneNumbers)
                    {
                        var dbPhone = _db.PhoneNumbers.Find(phone.Oid);
                        if (dbPhone != null)
                        {
                            dbPhone.Number = phone.Number;
                        }
                        else
                        {
                            var newPhone = _db.PhoneNumbers.Add(new PhoneNumber
                            {
                                Oid = Guid.NewGuid(),
                                Number = phone.Number,
                                PhoneType = phone.PhoneType
                            });
                            dbUser.Person1.Party.PhoneNumbers.Add(newPhone);
                        }
                    }

                    if (user.Person1.Party.Address != null)
                    {
                        var addr = _db.Addresses.Find(user.Person1.Party.Address.Oid);
                        _db.Entry(addr).CurrentValues.SetValues(user.Person1.Party.Address);
                    }
                }
            }

            Unit currentUnit = null;
            if (!string.IsNullOrEmpty(user.CurrentUnitId)) currentUnit = _db.Units.Find(new Guid(user.CurrentUnitId));
            dbUser.Unit = currentUnit;
            dbUser.AcceptedTermsConditions = user.AcceptedTermsConditions;
            try
            {
                _db.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                var sb = new StringBuilder();
                foreach (var failure in ex.EntityValidationErrors)
                {
                    sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                    foreach (var error in failure.ValidationErrors)
                    {
                        sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine();
                    }
                }

                throw new DbEntityValidationException("Entity Validation Failed - errors follow:\n" + sb, ex);
            }

            return Ok(new UserDTO(dbUser));
            //return Created(user);
        }

        // PATCH: odata/Users(5)
        /// <summary>
        /// NOT IN USE
        /// </summary>
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] Guid key, Delta<User> patch)
        {
            Validate(patch.GetInstance());

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = _db.Users.Find(key);
            if (user == null) return NotFound();

            patch.Patch(user);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(key))
                    return NotFound();
                throw;
            }

            return Ok(user);
        }

        // DELETE: odata/Users(5)
        /// <summary>
        /// NOT IN USE
        /// </summary>
        public IHttpActionResult Delete([FromODataUri] Guid key)
        {
            var user = _db.Users.Find(key);
            if (user == null) return NotFound();

            _db.Users.Remove(user);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(key))
                    return NotFound();
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        private bool UserExists(Guid key)
        {
            return _db.Users.Count(e => e.Oid == key) > 0;
        }

        /// <summary>
        /// Method for User assignment to Unit. If User not exists - it will be created
        /// </summary>
        /// <param name="regUser">AssignUserDTO instance</param>
        /// <returns>Ok - if succeeded</returns>
        [Route("api/Users/CreateAndAssign")]
        [Authorize]
        public IHttpActionResult Post(AssignUserDTO regUser)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var assigner = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            User user;
            if (_db.Users.Any(x => x.PermissionPolicyUser.UserName == regUser.Email && x.PermissionPolicyUser.GCRecord == null) || _db.Users.Any(x => x.Person1 != null && x.Person1.Email == regUser.Email))
            {//1052 scenario
                user = _db.Users.FirstOrDefault(x => x.PermissionPolicyUser.UserName == regUser.Email && x.PermissionPolicyUser.GCRecord == null);
                if (user == null)
                {
                    user = _db.Users.First(x => x.Person1 != null && x.Person1.Email == regUser.Email);
                }
                if (user.UserAssignedForUsers_UnitAssignedUnits.Any(x => x.AssignedUnits == Guid.Parse(regUser.CurrentUnitId))) return Ok("User already exists and already assigned");
                user.UserAssignedForUsers_UnitAssignedUnits.Add(_db.UserAssignedForUsers_UnitAssignedUnits.Add(new UserAssignedForUsers_UnitAssignedUnits() { OID = Guid.NewGuid(), AssignedForUsers = user.Oid, AssignedUnits = Guid.Parse(regUser.CurrentUnitId) }));
                _db.SaveChanges();
                var mailingService = new MailingService();
                mailingService.SendConfirmationEmail(user, "You have been assigned to a Sherpa Business Unit", assigner, _db.Units.Find(new Guid(regUser.CurrentUnitId)));

                return Ok("User already exists, assignment e-mail sent to " + regUser.Email);
            }
            try
            {
                var party = _db.Parties.Add(
                    new Party
                    {
                        Oid = Guid.NewGuid()
                    });

                party.Address = _db.Addresses.Add(
                    new Address
                    {
                        Oid = party.Oid
                    });

                party.PhoneNumbers.Add(
                    _db.PhoneNumbers.Add(
                        new PhoneNumber
                        {
                            PhoneType = "Mobile",
                            Oid = Guid.NewGuid()
                        }));

                party.PhoneNumbers.Add(
                    _db.PhoneNumbers.Add(
                        new PhoneNumber
                        {
                            PhoneType = "Phone",
                            Oid = Guid.NewGuid()
                        }));
                var person = _db.People.Add(
                    new Person
                    {
                        Oid = party.Oid,
                        Email = regUser.Email,
                        FirstName = regUser.FirstName,
                        LastName = regUser.LastName,
                        Party = party
                    });
                var generatedPassword = Membership.GeneratePassword(12, 3);
                var permUser = _db.PermissionPolicyUsers.Add(
                    new PermissionPolicyUser
                    {
                        Oid = Guid.NewGuid(),
                        UserName = regUser.Email,
                        StoredPassword = generatedPassword,
                        XPObjectType = _db.XPObjectTypes.First(x => x.TypeName == USER_TYPE_NAME),
                        IsActive = true
                    });

                user = _db.Users.Add(
                new User
                {
                    Oid = permUser.Oid,
                    Person1 = person,
                    PermissionPolicyUser = permUser
                });

                var userRole = _db.PermissionPolicyRoles.FirstOrDefault(x => x.Name == "User")
                               ??
                               new PermissionPolicyRole
                               {
                                   Oid = Guid.NewGuid(),
                                   Name = "User"
                               };

                permUser.PermissionPolicyUserUsers_PermissionPolicyRoleRoles.Add(
                    new PermissionPolicyUserUsers_PermissionPolicyRoleRoles
                    {
                        OID = Guid.NewGuid(),
                        PermissionPolicyRole = userRole,
                        PermissionPolicyUser = permUser
                    });

                user.Unit = _db.Units.Find(new Guid(regUser.CurrentUnitId));
                user.UserAssignedForUsers_UnitAssignedUnits.Add(_db.UserAssignedForUsers_UnitAssignedUnits.Add(new UserAssignedForUsers_UnitAssignedUnits() { OID = Guid.NewGuid(), AssignedForUsers = user.Oid, AssignedUnits = user.Unit.Oid }));
                _db.SaveChanges();
                var mailingService = new MailingService();
                mailingService.SendAssignUserEmail(user.PermissionPolicyUser.UserName, "You have been registered on Sherpa", generatedPassword, assigner.Person1?.FirstName + " " + assigner.Person1?.LastName, assigner.Organisation1.Organization.Name, user.Unit.Organization.Name);
                mailingService.SendUserRegistrationEmail(user);
            }
            catch (DbEntityValidationException ex)
            {
                var sb = new StringBuilder();
                foreach (var failure in ex.EntityValidationErrors)
                {
                    sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                    foreach (var error in failure.ValidationErrors)
                    {
                        sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine();
                    }
                }

                throw new DbEntityValidationException("Entity Validation Failed - errors follow:\n" + sb, ex);
            }

            return Ok("USER WAS ASSIGNED TO UNIT");
        }

        /// <summary>
        /// Method for resetting of User.CurrentUnit
        /// </summary>
        /// <param name="userOid">Oid of User</param>
        /// <returns>Ok - if succeeded</returns>
        [Route("api/Users/UnassignCurrentUnit")]
        public IHttpActionResult UnassignCurrentUnit([FromODataUri] Guid userOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var user = _db.Users.Find(userOid);
            user.CurrentUnit = null;
            _db.SaveChanges();
            return Ok();
        }

        /// <summary>
        /// Method for unassignment of Unit from User. 
        /// </summary>
        /// <param name="userOid">Oid of User</param>
        /// <param name="unitOid">Oid of Unit</param>
        /// <returns>Ok - if Succeeded</returns>
        [Route("api/Users/UnassignUnit")]
        public IHttpActionResult UnassignUnit([FromODataUri] Guid userOid, [FromODataUri] Guid unitOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var user = _db.Users.Find(userOid);
            var forRemoving = user.UserAssignedForUsers_UnitAssignedUnits.FirstOrDefault(x => x.AssignedUnits == unitOid);
            if (forRemoving != null)
            {
                _db.UserAssignedForUsers_UnitAssignedUnits.Remove(forRemoving);
            }
            else
            {
                var admforRemoving = user.UserCreatedByUsers_UnitCreatedUnits.FirstOrDefault(x => x.CreatedUnits == unitOid);
                if (admforRemoving == null) return BadRequest("Unit not assigned to this User");
                _db.UserCreatedByUsers_UnitCreatedUnits.Remove(admforRemoving);
            }
            if (user.CurrentUnit == unitOid) user.CurrentUnit = null;
            _db.SaveChanges();
            return Ok();
        }

        /// <summary>
        /// Mathod for assignment of User to Unit as Admin
        /// </summary>
        /// <param name="userOid">Oid of User</param>
        /// <param name="unitOid">Oid of Unit</param>
        /// <returns>Ok - if Succeeded</returns>
        [Route("api/Users/AssignUnitAsAdmin")]
        public IHttpActionResult AssignUnitAsAdmin([FromODataUri] Guid userOid, [FromODataUri] Guid unitOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var user = _db.Users.Find(userOid);
            var forRemoving = user.UserAssignedForUsers_UnitAssignedUnits.FirstOrDefault(x => x.AssignedUnits == unitOid);
            if (forRemoving == null) return BadRequest("Unit not assigned to this User");
            _db.UserAssignedForUsers_UnitAssignedUnits.Remove(forRemoving);
            _db.UserCreatedByUsers_UnitCreatedUnits.Add(new UserCreatedByUsers_UnitCreatedUnits() { CreatedByUsers = userOid, CreatedUnits = unitOid, OID = Guid.NewGuid() });
            _db.SaveChanges();
            return Ok();
        }

        /// <summary>
        /// Method that activate User, it's last step of User registration. Link to this method is part of registration e-mail
        /// </summary>
        /// <param name="token">token contains User informamtion and Expiration data</param>
        /// <returns>Ok - if succeeded, with succes message</returns>
        [HttpGet]
        public IHttpActionResult Confirm(string token)
        {
            var auth = FormsAuthentication.Decrypt(token);
            if (auth.Expired) return Ok("Activation link expired");
            var user = _db.Users.FirstOrDefault(x => x.PermissionPolicyUser.UserName == auth.Name);
            if (user == null) return Ok($"User {auth.Name} not found");
            user.PermissionPolicyUser.IsActive = true;
            _db.SaveChanges();
            new MailingService().SendUserRegistrationEmail(user);
            return Ok("E-mail confirmation succesfully finished. Check your e-mail box plz");
        }

        /// <summary>
        /// Method for new User registration. After User creation, also activation e-mail sending proceed
        /// </summary>
        /// <param name="regUser">RegUserDTO instance</param>
        /// <returns>UserDTO instance</returns>
        [Route("api/Users/Register")]
        public IHttpActionResult Post(RegUserDTO regUser)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (_db.Users.Any(x => x.PermissionPolicyUser.UserName == regUser.UserName && x.PermissionPolicyUser.GCRecord == null)) return BadRequest(String.Format("User with Username={0} already exists", regUser.UserName));
            if (_db.Users.Any(x => x.Person1 != null && x.Person1.Email == regUser.Email && x.Person1.Party.GCRecord == null)) return BadRequest("User with defined e-mail already exists");
            User user;
            try
            {
                var party = _db.Parties.Add(
                    new Party
                    {
                        Oid = Guid.NewGuid()
                    });

                party.Address = _db.Addresses.Add(
                    new Address
                    {
                        Oid = party.Oid
                    });

                var country = _db.Countries.Find(Guid.Parse(regUser.CountryId));
                if (country != null) party.Address.Country1 = country;

                party.PhoneNumbers.Add(
                    _db.PhoneNumbers.Add(
                        new PhoneNumber
                        {
                            PhoneType = "Mobile",
                            Number = regUser.Mobile,
                            Oid = Guid.NewGuid()
                        }));

                party.PhoneNumbers.Add(
                    _db.PhoneNumbers.Add(
                        new PhoneNumber
                        {
                            PhoneType = "Phone",
                            Number = regUser.Phone,
                            Oid = Guid.NewGuid()
                        }));

                var person = _db.People.Add(
                    new Person
                    {
                        Oid = party.Oid,
                        Email = regUser.Email,
                        FirstName = regUser.FirstName,
                        LastName = regUser.LastName,
                        Party = party
                    });

                var permUser = _db.PermissionPolicyUsers.Add(
                    new PermissionPolicyUser
                    {
                        Oid = Guid.NewGuid(),
                        UserName = regUser.UserName,
                        StoredPassword = regUser.Password,
                        XPObjectType = _db.XPObjectTypes.First(x => x.TypeName == USER_TYPE_NAME)
                    });

                user = _db.Users.Add(
                    new User
                    {
                        Oid = permUser.Oid,
                        Person1 = person,
                        PermissionPolicyUser = permUser
                    });

                var userRole = _db.PermissionPolicyRoles.FirstOrDefault(x => x.Name == "User")
                               ??
                               new PermissionPolicyRole
                               {
                                   Oid = Guid.NewGuid(),
                                   Name = "User"
                               };

                permUser.PermissionPolicyUserUsers_PermissionPolicyRoleRoles.Add(
                    new PermissionPolicyUserUsers_PermissionPolicyRoleRoles
                    {
                        OID = Guid.NewGuid(),
                        PermissionPolicyRole = userRole,
                        PermissionPolicyUser = permUser
                    });

                if (!string.IsNullOrEmpty(regUser.CurrentUnitId))
                    user.Unit = _db.Units.Find(new Guid(regUser.CurrentUnitId));
                if (!string.IsNullOrEmpty(regUser.OrganisationOid))
                    user.Organisation1 = _db.Organisations.Find(new Guid(regUser.OrganisationOid));
                user.AcceptedTermsConditions = true;
                _db.SaveChanges();
                var mailingService = new MailingService();
                var callbackUrl = Url.Request.RequestUri.AbsoluteUri.Substring(0, Url.Request.RequestUri.AbsoluteUri.IndexOf("api/Users/Register") - 1);
                mailingService.SendActivationEmail(user, "Sherpa account email verification", callbackUrl);
            }
            catch (DbEntityValidationException ex)
            {
                var sb = new StringBuilder();
                foreach (var failure in ex.EntityValidationErrors)
                {
                    sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                    foreach (var error in failure.ValidationErrors)
                    {
                        sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine();
                    }
                }

                throw new DbEntityValidationException("Entity Validation Failed - errors follow:\n" + sb, ex);
            }
            return Ok(new UserDTO(user));
        }

        // Encode
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        // Decode
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}
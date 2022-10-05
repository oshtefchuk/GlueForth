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

namespace GlueForth.WebApi
{
    [ApiExplorerSettings(IgnoreApi = false)]
    public class OrganisationsController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: odata/Organisations
        /// <summary>
        /// Returns list of all Organisations. <code>Organisation</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Organisations</returns>
        public IList<Organisation> GetOrganisations()
        {
            var result = new List<Organisation>();
            _db.Organisations.ToList().ForEach(organisation => result.Add(CloneOrganisation(organisation)));
            return result;
        }

        // GET: odata/Organisations(5)
        /// <summary>
        /// Get <code>Organisation</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>Organisation</code></param>
        /// <returns><code>Organisation</code> represented as root element, withoud referenced entities</returns>
        public Organisation GetOrganisation([FromODataUri] Guid key)
        {
            var organisation = _db.Organisations.FirstOrDefault(Organisation => Organisation.Oid == key);
            if (organisation == null) return null;
            //remove obvoius relations
            return CloneOrganisation(organisation);
        }

        /// <summary>
        ///     Make a copy only of members that participe in data communication
        /// </summary>
        /// <param name="organisation"></param>
        /// <returns></returns>
        private Organisation CloneOrganisation(Organisation organisation)
        {
            var cloneOrganisation = (Organisation) _db.Entry(organisation)
                .CurrentValues.ToObject();
            cloneOrganisation.Organization = (Organization) _db.Entry(organisation.Organization)
                .CurrentValues.ToObject();
            if (organisation.Organization.Party != null)
            {
                cloneOrganisation.Organization.Party = (Party) _db.Entry(organisation.Organization.Party)
                    .CurrentValues.ToObject();
                if (organisation.Organization.Party.Address != null)
                    cloneOrganisation.Organization.Party.Address = (Address) _db
                        .Entry(organisation.Organization.Party.Address)
                        .CurrentValues.ToObject();
                foreach (var phone in organisation.Organization.Party.PhoneNumbers)
                    cloneOrganisation.Organization.Party.PhoneNumbers.Add(
                        (PhoneNumber) _db.Entry(phone).CurrentValues.ToObject());
            }

            return cloneOrganisation;
        }

        // POST: odata/Organisations
        /// <summary>
        /// 
        /// </summary>
        /// <param name="organisation"></param>
        /// <returns></returns>
        [Authorize]
        public IHttpActionResult Post(Organisation organisation)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal) User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var dbOrganization = new Organisation();

            var isNewEntity = organisation.Oid == Guid.Empty;
            var isDefaultPropertyChanged = false;

            if (!isNewEntity)
            {
                dbOrganization = _db.Organisations.Find(organisation.Oid);

                if (dbOrganization != null)
                    isDefaultPropertyChanged = !dbOrganization.Organization.Name.Equals(organisation.Organization.Name);
            }

            if (isNewEntity)
            {
                //set one Id for all 1to1 referenced childs
                organisation.Oid = organisation.Organization.Oid = organisation.Organization.Party.Oid =
                    organisation.Organization.Party.Address.Oid = Guid.NewGuid();
                organisation.Organization.Party.PhoneNumbers.First().Oid = organisation.Oid; //initially we have 1 phone
                _db.Organisations.Add(organisation);
                user.Organisation1 = organisation;
                if (user.Person1?.Party?.Address != null)
                    user.Person1.Party.Address.Country = organisation.Organization.Party.Address.Country;
            }
            else
            {
                var dbOrganisation = _db.Organizations.Find(organisation.Oid);
                if (dbOrganisation != null)
                {
                    dbOrganisation.Name = organisation.Organization.Name;

                    var dbPhoneNumber = _db.PhoneNumbers.Find(organisation.Oid);
                    var phone = organisation.Organization.Party.PhoneNumbers.FirstOrDefault();
                    if (!string.IsNullOrEmpty(phone?.Number))
                        if (dbPhoneNumber != null)
                        {
                            dbPhoneNumber.Number = phone.Number;
                        }
                        else
                        {
                            dbPhoneNumber = new PhoneNumber
                            {
                                Number = phone.Number,
                                Oid = organisation.Oid
                            };
                            _db.PhoneNumbers.Add(dbPhoneNumber);
                        }

                    dbOrganisation.Party.Address.Street = organisation.Organization.Party.Address.Street;
                    dbOrganisation.Party.Address.City = organisation.Organization.Party.Address.City;
                    dbOrganisation.Party.Address.StateProvince = organisation.Organization.Party.Address.StateProvince;
                    dbOrganisation.Party.Address.Country = organisation.Organization.Party.Address.Country;
                }
                else
                {
                    return BadRequest("Organisation with this OID not found");
                }
            }

            try
            {
                _db.SaveChanges();
                if (isNewEntity)
                {
                    var mailingService = new MailingService();
                    mailingService.SendOrgRegistrationEmail(user, organisation);
                }
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

            return Ok(organisation.Oid);
        }

        // PATCH: odata/Organisations(5)
        /// <summary>
        /// NOT IN USE
        /// </summary>
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] Guid key, Delta<Organisation> patch)
        {
            Validate(patch.GetInstance());

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var Organisation = _db.Organisations.Find(key);
            if (Organisation == null) return NotFound();

            patch.Patch(Organisation);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganisationExists(key))
                    return NotFound();
                throw;
            }

            return Ok(Organisation);
        }

        /// <summary>
        /// NOT IN USE
        /// </summary>
        // DELETE: odata/Organisations(5)
        public IHttpActionResult Delete([FromODataUri] Guid key)
        {
            var Organisation = _db.Organisations.Find(key);
            if (Organisation == null) return NotFound();

            _db.Organisations.Remove(Organisation);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganisationExists(key))
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

        private bool OrganisationExists(Guid key)
        {
            return _db.Organisations.Count(e => e.Oid == key) > 0;
        }
    }
}
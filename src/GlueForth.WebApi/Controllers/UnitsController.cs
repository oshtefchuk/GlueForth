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
    [ApiExplorerSettings(IgnoreApi = false)]
    public class UnitsController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();
        /// <summary>
        /// Returns list of all Units. Each Unit represented as UnitDTO
        /// </summary>
        /// <returns>list of UnitDTO</returns>
        public IList<UnitDTO> GetUnits()
        {
            var result = new List<UnitDTO>();
            _db.Units.ToList().ForEach(unit => result.Add(new UnitDTO(unit)));
            return result;
        }

        /// <summary>
        /// Returns list of specific Organisation Units. Each Unit represented as UnitDTO
        /// </summary>
        /// <returns>list of UnitDTO</returns>
        [Route("api/Units/ByOrganisation")]
        public IList<UnitDTO> GetOrganisationUnits([FromODataUri] Guid key)
        {
            var result = new List<UnitDTO>();
            _db.Units.Where(x => x.Organisation == key).ToList().ForEach(unit => result.Add(new UnitDTO(unit)));
            return result;
        }

        /// <summary>
        /// Returns list of current User Units. Each Unit represented as UnitDTO
        /// </summary>
        /// <returns>list of UnitDTO</returns>
        [Route("api/Units/ByCurrentUser")]
        [Authorize]
        public IList<UnitDTO> GetCurrentUserUnits()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            var result = new List<UnitDTO>();
            user.UserAssignedForUsers_UnitAssignedUnits.Select(x => x.Unit).ToList().ForEach(unit => result.Add(new UnitDTO(unit)));
            user.UserCreatedByUsers_UnitCreatedUnits.Select(x => x.Unit).ToList().ForEach(unit => result.Add(new UnitDTO(unit) { IsUserAdmin = true } ));
            return result.OrderBy(x=>x.UnitName).ToList();
        }

        /// <summary>
        /// Get assigned Users list of specific Unit
        /// </summary>
        /// <param name="key">Oid of Unit</param>
        /// <returns><code>AssignUserDTO</code></returns>
        [Route("api/Units/GetAssignedUsers")]
        public IHttpActionResult GetUnitAssignedUsers([FromODataUri] Guid key)
        {
            var unit = _db.Units.FirstOrDefault(u => u.Oid == key);
            var users = unit.UserAssignedForUsers_UnitAssignedUnits.Where(y => y.AssignedForUsers.HasValue).ToList().Select(x => new AssignUserDTO(x.User));
            users = users.Union(unit.UserCreatedByUsers_UnitCreatedUnits.Where(y => y.CreatedByUsers.HasValue).ToList().Select(x => new AssignUserDTO(x.User) { IsUserAdmin = true })).OrderBy(x => x.Email).ToList();
            return Ok(users);
        }

        /// <summary>
        /// Get list of specific Organisation Units
        /// </summary>
        /// <param name="key">Oid of Organisation</param>
        /// <returns>Oid->Name pairs list</returns>
        [Route("api/Units/ByOrganisationLite")]
        public IHttpActionResult GetOrganisationUnitsLite([FromODataUri] Guid key)
        {
            return Ok(_db.Units.Where(x => x.Organisation == key).Select(x=> new { x.Oid, UnitName = x.Organization.Name }));
        }

        /// <summary>
        /// Get list of currentUser Units
        /// </summary>
        /// <returns>Oid->Name pairs list</returns>
        [Route("api/Units/ByCurrentUserLite")]
        public IHttpActionResult GetByCurrentUserLite()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            return Ok(user.UserAssignedForUsers_UnitAssignedUnits.Select(x=>x.Unit).Union(user.UserCreatedByUsers_UnitCreatedUnits.Select(x => x.Unit)).OrderBy(y => y.Organization.Name).Select(x => new { x.Oid, UnitName = x.Organization.Name }));
        }

        // GET: odata/Units(5)
        /// <summary>
        /// Get <code>User</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>User</code></param>
        /// <returns><code>User</code> represented as <code>UnitDTO</code></returns>

        public UnitDTO GetUnit([FromODataUri] Guid key)
        {
            return new UnitDTO(_db.Units.FirstOrDefault(unit => unit.Oid == key));
        }

        /// <summary>
        /// Method for Unit-to-User assignmenet
        /// </summary>
        /// <param name="token">Token contains Unit Oid and expiration date</param>
        /// <returns>Ok - message</returns>
        [HttpGet]
        public IHttpActionResult Assign(string token)
        {
            var auth = FormsAuthentication.Decrypt(token);
            if (auth.Expired) return Ok("Confirmation link expired");
            var user = _db.Users.FirstOrDefault(x => x.PermissionPolicyUser.UserName == auth.Name);
            if (user == null) return Ok($"User {auth.Name} not found");
            _db.UserAssignedForUsers_UnitAssignedUnits.Add(new UserAssignedForUsers_UnitAssignedUnits() { OID = Guid.NewGuid(), AssignedForUsers = user.Oid, AssignedUnits = Guid.Parse(auth.UserData) });
            _db.SaveChanges();
            return Ok("Unit assignement succesfully finished");
        }


        /// <summary>
        /// NOT IN USE
        /// </summary>
        /// <param name="unit"></param>
        /// <returns></returns>
        // POST: odata/Units
        public IHttpActionResult Post(Unit unit)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _db.Units.Add(unit);
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

            return Ok(unit);
        }

        // PATCH: odata/Units(5)
        /// <summary>
        /// NOT IN USE
        /// </summary>
        /// <param name="key"></param>
        /// <param name="patch"></param>
        /// <returns></returns>
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] Guid key, Delta<Unit> patch)
        {
            Validate(patch.GetInstance());

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var unit = _db.Units.Find(key);
            if (unit == null) return NotFound();

            patch.Patch(unit);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UnitExists(key))
                    return NotFound();
                throw;
            }

            return Ok(unit); // Updated(unit);
        }

        // DELETE: odata/Units(5)
        //[Route("api/Units({key})")]
        /// <summary>
        /// NOT IN USE
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public IHttpActionResult Delete(Guid key)
        {
            var unit = _db.Units.Find(key);
            if (unit == null) return NotFound();

            if (unit.SPADataSets.Count > 0) return BadRequest("You cannot delete this Unit because it has the SPADataSets");
            
            unit.UnitUnits_RetailerRetailers.ToList().ForEach(x => _db.UnitUnits_RetailerRetailers.Remove(x));
            unit.UnitUnits_StandardStandards.ToList().ForEach(x => _db.UnitUnits_StandardStandards.Remove(x));
            unit.UnitUnits_SupplierSuppliers.ToList().ForEach(x => _db.UnitUnits_SupplierSuppliers.Remove(x));
            unit.UnitSecondaryUnits_CommoditySecondaryCommodities.ToList().ForEach(x => _db.UnitSecondaryUnits_CommoditySecondaryCommodities.Remove(x));
            _db.Units.Remove(unit);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UnitExists(key))
                    return NotFound();
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// POST Method for Unit creation/update
        /// </summary>
        /// <param name="unit"><code>UnitDTO</code> instance</param>
        /// <returns>updated Unit</returns>
        [Route("api/Units/CreateOrUpdate")]
        [Authorize]
        public IHttpActionResult Post(UnitDTO unit)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            Unit dbUnit = null;
            if (string.IsNullOrEmpty(unit.Oid))
            {
                if (unit.OrganisationId != null)
                {
                    var org = _db.Organisations.Find(Guid.Parse(unit.OrganisationId));
                    if (org.UnitsCountLimit.GetValueOrDefault() > 0 && org.Units.Count >= org.UnitsCountLimit)
                    {
                        return BadRequest("You reached maximum of Units for your Organisation. Plz contact Administrator");
                    }
                }
                //creation
                dbUnit = _db.Units.Add(new Unit {Oid = Guid.NewGuid()});
                unit.Oid = dbUnit.Oid.ToString();
                dbUnit.Organization = _db.Organizations.Add(new Organization {Oid = dbUnit.Oid});
                dbUnit.Organization.Party = _db.Parties.Add(new Party {Oid = dbUnit.Oid});
                dbUnit.Organization.Party.Address = _db.Addresses.Add(new Address {Oid = dbUnit.Oid});
                var personParty = _db.Parties.Add(new Party {Oid = Guid.NewGuid()});
                personParty.PhoneNumbers.Add(_db.PhoneNumbers.Add(new PhoneNumber
                {
                    PhoneType = UserDTO.MOBILE_PHONE_TYPE,
                    Oid = Guid.NewGuid()
                }));
                personParty.PhoneNumbers.Add(_db.PhoneNumbers.Add(new PhoneNumber
                {
                    PhoneType = UserDTO.CELLULAR_PHONE_TYPE,
                    Oid = Guid.NewGuid()
                }));
                dbUnit.Person = _db.People.Add(new Person {Oid = personParty.Oid, Party = personParty});

                if (unit.OrganisationId != null)
                {
                    dbUnit.Organisation = Guid.Parse(unit.OrganisationId);
                }
                dbUnit.CurrentAssessmentType = unit.AssessmentType;

                //set as current Unit - if it's first
                var userName = ((ClaimsPrincipal) User).Claims.First().Value;
                var user = _db.Users.FirstOrDefault(x =>
                    x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
                if (user?.Organisation != null && user.Organisation1.Units.Count == 0) user.Unit = dbUnit;
                dbUnit.PrimaryFramework = unit.FrameworkId;
                _db.UserCreatedByUsers_UnitCreatedUnits.Add(new UserCreatedByUsers_UnitCreatedUnits() { OID = Guid.NewGuid(), CreatedByUsers = user.Oid, CreatedUnits = dbUnit.Oid });
                foreach (var supplierId in unit.Suppliers)
                {
                    dbUnit.UnitUnits_SupplierSuppliers.Add(_db.UnitUnits_SupplierSuppliers.Add(new UnitUnits_SupplierSuppliers() { Suppliers = supplierId, Units = dbUnit.Oid }));
                }
                foreach (var retailerId in unit.Retailers)
                {
                    dbUnit.UnitUnits_RetailerRetailers.Add(_db.UnitUnits_RetailerRetailers.Add(new UnitUnits_RetailerRetailers() { Retailers = retailerId, Units = dbUnit.Oid }));
                }
                if (unit.Standards != null)
                {
                    foreach (var standardOid in unit.Standards)
                    {
                        dbUnit.UnitUnits_StandardStandards.Add(_db.UnitUnits_StandardStandards.Add(new UnitUnits_StandardStandards() { Standards = standardOid, Units = user.Unit.Oid }));
                    }
                }
                if (unit.Commodities != null)
                {
                    foreach (var commodityOid in unit.Commodities)
                    {
                        dbUnit.UnitUnits_CommodityCommodities.Add(_db.UnitUnits_CommodityCommodities.Add(new UnitUnits_CommodityCommodities() { Commodities = commodityOid, Units = user.Unit.Oid }));
                    }
                }
                if (unit.SecondaryCommodities != null)
                {
                    foreach (var commodityOid in unit.SecondaryCommodities)
                    {
                        dbUnit.UnitSecondaryUnits_CommoditySecondaryCommodities.Add(_db.UnitSecondaryUnits_CommoditySecondaryCommodities.Add(new UnitSecondaryUnits_CommoditySecondaryCommodities() { SecondaryCommodities = commodityOid, SecondaryUnits = user.Unit.Oid }));
                    }
                }
                if (unit.AssignToUserOid != Guid.Empty)
                {
                    var assignToUser = _db.Users.Find(unit.AssignToUserOid);
                    assignToUser.Unit = dbUnit;
                    assignToUser.Organisation = null;
                }
            }
            else
            {
                //update
                dbUnit = _db.Units.Find(Guid.Parse(unit.Oid));
                UpdateSuppliersRetailers(unit, dbUnit);
            }
            if (dbUnit != null)
            {
                UpdateUnitFromDTO(unit, dbUnit);
            }
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

            return Ok(unit);
        }

        private void UpdateUnitFromDTO(UnitDTO unit, Unit dbUnit)
        {
            dbUnit.Organization.Name = unit.UnitName;
            dbUnit.UnitType = unit.UnitTypeId;
            dbUnit.UnitStructure = unit.UnitStructure;
            dbUnit.Organization.Party.Address.Country1 = _db.Countries.Find(Guid.Parse(unit.UnitCountryId));
            dbUnit.Person.FirstName = unit.ResponsibleName;
            dbUnit.Person.LastName = unit.ResponsibleSurname;
            dbUnit.Person.Email = unit.ResponsibleEmail;
            dbUnit.Person.Party.PhoneNumbers.First(x => x.PhoneType == UserDTO.MOBILE_PHONE_TYPE).Number =
                unit.ResponsibleMobile;
            dbUnit.Person.Party.PhoneNumbers.First(x => x.PhoneType == UserDTO.CELLULAR_PHONE_TYPE).Number =
                unit.ResponsiblePhone;
            dbUnit.LocationLattitude = unit.LocationLattitude;
            dbUnit.LocationLongtitude = unit.LocationLongtitude;
            dbUnit.CurrentAssessmentType = unit.AssessmentType;
            dbUnit.PrimaryFramework = unit.FrameworkId;
            if (unit.UnitCommodityId > 0) dbUnit.PrimaryCommodity = unit.UnitCommodityId;
        }

        private void UpdateSuppliersRetailers(UnitDTO unit, Unit dbUnit)
        {
            #region update unit Suppliers list
            var oidsForDeletion = dbUnit.UnitUnits_SupplierSuppliers.Where(x => !unit.Suppliers.Contains(x.Supplier.OID)).Select(x => x.OID).ToList();
            foreach (var deletedSupplierId in oidsForDeletion)
            {
                _db.UnitUnits_SupplierSuppliers.Remove(_db.UnitUnits_SupplierSuppliers.Find(deletedSupplierId));
            }
            foreach (var supplierId in unit.Suppliers)
            {
                if (!dbUnit.UnitUnits_SupplierSuppliers.Any(x => x.Supplier != null && x.Supplier.OID == supplierId))
                {
                    dbUnit.UnitUnits_SupplierSuppliers.Add(_db.UnitUnits_SupplierSuppliers.Add(new UnitUnits_SupplierSuppliers() { Suppliers = supplierId, Units = dbUnit.Oid }));
                }
            }
            #endregion
            #region update unit Retailers list
            oidsForDeletion = dbUnit.UnitUnits_RetailerRetailers.Where(x => !unit.Retailers.Contains(x.Retailer.OID)).Select(x => x.OID).ToList();
            foreach (var deletedRetailerId in oidsForDeletion)
            {
                _db.UnitUnits_RetailerRetailers.Remove(_db.UnitUnits_RetailerRetailers.Find(deletedRetailerId));
            }
            foreach (var retailerId in unit.Retailers)
            {
                if (!dbUnit.UnitUnits_RetailerRetailers.Any(x => x.Retailer != null && x.Retailer.OID == retailerId))
                {
                    dbUnit.UnitUnits_RetailerRetailers.Add(_db.UnitUnits_RetailerRetailers.Add(new UnitUnits_RetailerRetailers() { Retailers = retailerId, Units = dbUnit.Oid }));
                }
            }
            #endregion

            foreach (var unitStandard in dbUnit.UnitUnits_StandardStandards.ToList())
            {
                if (!unit.Standards.Contains(unitStandard.Standard.OID))
                {
                    _db.UnitUnits_StandardStandards.Remove(unitStandard);
                }
            }
            foreach (var standardOid in unit.Standards)
            {
                if (dbUnit.UnitUnits_StandardStandards.All(x => x.Standards != standardOid))
                {
                    _db.UnitUnits_StandardStandards.Add(new UnitUnits_StandardStandards() { Standards = standardOid, Units = dbUnit.Oid });
                }
            }
            foreach (var unitCommodity in dbUnit.UnitUnits_CommodityCommodities.ToList())
            {
                if (!unit.Commodities.Contains(unitCommodity.Commodity.OID))
                {
                    _db.UnitUnits_CommodityCommodities.Remove(unitCommodity);
                }
            }
            foreach (var commodityOid in unit.Commodities)
            {
                if (dbUnit.UnitUnits_CommodityCommodities.All(x => x.Commodities != commodityOid))
                {
                    _db.UnitUnits_CommodityCommodities.Add(new UnitUnits_CommodityCommodities() { Commodities = commodityOid, Units = dbUnit.Oid });
                }
            }
            foreach (var unitCommodity in dbUnit.UnitSecondaryUnits_CommoditySecondaryCommodities.ToList())
            {
                if (!unit.SecondaryCommodities.Contains(unitCommodity.Commodity.OID))
                {
                    _db.UnitSecondaryUnits_CommoditySecondaryCommodities.Remove(unitCommodity);
                }
            }
            foreach (var commodityOid in unit.SecondaryCommodities)
            {
                if (dbUnit.UnitSecondaryUnits_CommoditySecondaryCommodities.All(x => x.SecondaryCommodities != commodityOid))
                {
                    _db.UnitSecondaryUnits_CommoditySecondaryCommodities.Add(new UnitSecondaryUnits_CommoditySecondaryCommodities() { SecondaryCommodities = commodityOid, SecondaryUnits = dbUnit.Oid });
                }
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        private bool UnitExists(Guid key)
        {
            return _db.Units.Count(e => e.Oid == key) > 0;
        }
    }
}
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
using BlueNorth.WebApi.Helpers;

namespace BlueNorth.WebApi
{
    [ApiExplorerSettings(IgnoreApi = false)]
    public class CommoditiesController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/Commodities
        /// <summary>
        /// Returns list of all Commodities. <code>Commodity</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Commodities</returns>
        public IEnumerable<Commodity> GetCommodities()
        {
            return _db.Commodities.OrderBy(x => x.Title).ToList().Select(CloneCommodity).Where(cloned => cloned != null);
        }

        // GET: api/Commodities/GetCommoditiesByUnitType/1
        /// <summary>
        /// Returns list of all Commodities by unitTypeOid. <code>Commodity</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Commodities by unitTypeOid</returns>        
        [Route("api/Commodities/GetCommoditiesByUnitType({unitTypeOid})")]
        public IEnumerable<Commodity> GetCommoditiesByUnitType(int unitTypeOid)
        {
            return _db.Commodities.Where(x => x.UnitType == unitTypeOid).OrderBy(x => x.Title).ToList().Select(CloneCommodity).Where(cloned => cloned != null);
        }

        private Commodity CloneCommodity(Commodity commodity)
        {
            if (commodity.GCRecord != null || commodity.Version1?.Deleted == true) return null;
            return (Commodity) _db.Entry(commodity).CurrentValues.ToObject();
        }

        // GET: api/Commodities(5)
        /// <summary>
        /// Get <code>Commodity</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>Commodity</code></param>
        /// <returns><code>Commodity</code> represented as root element, withoud referenced entities</returns>
        [Route("api/Commodities({key})")]
        public IHttpActionResult GetCommodity(int key)
        {
            var commodity = _db.Commodities.SingleOrDefault(x => x.OID == key);
            var cloned = CloneCommodity(commodity);
            return cloned == null ? (IHttpActionResult) NotFound() : Ok(cloned);
        }

        // POST: api/Commodities/CreateOrUpdate
        /// <summary>
        /// Creates or updates existed Commodity. Id OID is empty or 0 - it's new entity.
        /// </summary>
        /// <param name="commodity">entity for creation/update</param>
        /// <returns>Commodity entity</returns>
        [Route("api/Commodities/CreateOrUpdate")]
        [Authorize]       
        public IHttpActionResult Post(Commodity commodity)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal) User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var dbCommodity = new Commodity();

            var isNewEntity = commodity.OID == 0;
            var isDefaultPropertyChanged = false;

            if (!isNewEntity)
            {
                dbCommodity = _db.Commodities.Find(commodity.OID);

                if (dbCommodity != null) isDefaultPropertyChanged = !dbCommodity.Reference.Equals(commodity.Reference);
            }

            if (isNewEntity || isDefaultPropertyChanged)
                try
                {
                    ValidateEntry(commodity.Reference);
                }
                catch (ArgumentException e)
                {
                    return BadRequest(e.Message);
                }

            var version = isNewEntity
                ? VersionHelper.CreateVersion(_db, user.Oid)
                : VersionHelper.EditVersion(_db, user.Oid, dbCommodity?.Version1);

            if (isNewEntity)
            {
                // copy values without reference to avoid StackOverflowException when Version will be added
                dbCommodity.Title = commodity.Title;
                dbCommodity.Reference = commodity.Reference;
                dbCommodity.Version1 = version;
                //

                _db.Commodities.Add(dbCommodity);
            }
            else
            {
                if (dbCommodity == null)
                    return BadRequest("Entity not found in DataBase");

                _db.Entry(dbCommodity).CurrentValues.SetValues(commodity);
                dbCommodity.Version1 = version;
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

            // this will show change on front end
            commodity.OID = dbCommodity.OID;
            return Ok(commodity);
        }

        private void ValidateEntry(string commodityReference)
        {
            if (string.IsNullOrEmpty(commodityReference))
                throw new ArgumentException(@"The Reference is empty", commodityReference);

            var isExists = _db.Commodities.Any(x =>
                x.Title.Equals(commodityReference, StringComparison.InvariantCultureIgnoreCase));
            if (isExists)
                throw new ArgumentException(@"Commodity with this reference already exists", commodityReference);
        }

        // DELETE: odata/Commodities(5)
        /// <summary>
        /// NOT IN USE
        /// Deletes entity by OID
        /// </summary>
        /// <param name="key">Commodity OID</param>
        /// <returns>Ok - if succeded</returns>
        [Route("api/Commodities({key})")]
        [Authorize]
        public IHttpActionResult Delete(int key)
        {
            var userName = ((ClaimsPrincipal) User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var commodity = _db.Commodities.Find(key);
            if (commodity == null) return NotFound();

            var dbVersion = _db.Versions.Find(commodity.Version);

            if (dbVersion != null)
                commodity.Version1 = VersionHelper.EditVersion(_db, user.Oid, dbVersion, true);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommodityExists(key))
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

        private bool CommodityExists(int key)
        {
            return _db.Commodities.Count(e => e.OID == key) > 0;
        }
    }
}
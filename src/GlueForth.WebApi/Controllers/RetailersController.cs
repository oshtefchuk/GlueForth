using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using GlueForth.WebApi.Helpers;

namespace GlueForth.WebApi
{
    [ApiExplorerSettings(IgnoreApi = false)]
    public class RetailersController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/Retailers
        /// <summary>
        /// Returns list of all Commodities. <code>Commodity</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Commodities</returns>
        public IEnumerable<Retailer> GetRetailers()
        {
            return _db.Retailers.Select(CloneRetailer).Where(cloned => cloned != null);
        }

        private Retailer CloneRetailer(Retailer retailer)
        {
            if (retailer.Version1?.Deleted == true) return null;
            return (Retailer) _db.Entry(retailer).CurrentValues.ToObject();
        }

        // GET: api/Retailers(5)
        /// <summary>
        /// Get <code>Commodity</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>Commodity</code></param>
        /// <returns><code>Commodity</code> represented as root element, withoud referenced entities</returns>
        [Route("api/Retailers({key})")]
        public IHttpActionResult GetRetailer(int key)
        {
            var retailer = _db.Retailers.SingleOrDefault(x => x.OID == key);
            var cloned = CloneRetailer(retailer);
            return cloned == null ? (IHttpActionResult) NotFound() : Ok(cloned);
        }

        // POST: api/Retailers
        /// <summary>
        /// POST Method for Retailer update/creation
        /// </summary>
        /// <param name="retailer"><code>Retailer</code> instance</param>
        /// <returns>updated Retailer</returns>
        [Route("api/Retailers/CreateOrUpdate")]
        [Authorize]
        public IHttpActionResult Post(Retailer retailer)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal) User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var dbRetailer = new Retailer();

            var isNewEntity = retailer.OID == 0;

            if (!isNewEntity) dbRetailer = _db.Retailers.Find(retailer.OID);

            var version = isNewEntity
                ? VersionHelper.CreateVersion(_db, user.Oid)
                : VersionHelper.EditVersion(_db, user.Oid, dbRetailer?.Version1);

            if (isNewEntity)
            {
                // copy values without reference to avoid StackOverflowException when Version will be added
                dbRetailer.Title = retailer.Title;
                dbRetailer.ShortTitle = retailer.ShortTitle;
                dbRetailer.Description = retailer.Description;
                dbRetailer.Version1 = version;
                //

                _db.Retailers.Add(dbRetailer);
            }
            else
            {
                if (dbRetailer == null)
                    return BadRequest("Entity not found in DataBase");

                _db.Entry(dbRetailer).CurrentValues.SetValues(retailer);
                dbRetailer.Version1 = version;
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
            retailer.OID = dbRetailer.OID;
            return Ok(retailer);
        }

        // DELETE: api/Retailers(5)
        /// <summary>
        /// NOT IN USE
        /// </summary>
        [Route("api/Retailers({key})")]
        [Authorize]
        public IHttpActionResult Delete(int key)
        {
            var userName = ((ClaimsPrincipal) User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var retailer = _db.Retailers.Find(key);
            if (retailer == null) return NotFound();

            var dbVersion = _db.Versions.Find(retailer.Version);
            if (dbVersion != null)
                retailer.Version1 = VersionHelper.EditVersion(_db, user.Oid, dbVersion, true);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RetailerExists(key)) return NotFound();
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        private bool RetailerExists(int key)
        {
            return _db.Retailers.Count(e => e.OID == key) > 0;
        }
    }
}
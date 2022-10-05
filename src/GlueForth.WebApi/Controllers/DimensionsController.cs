using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.OData;
using GlueForth.WebApi.DTOs;
using GlueForth.WebApi.Helpers;

namespace GlueForth.WebApi
{
    public class DimensionsController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: odata/Dimensions
        /// <summary>
        /// Returns list of all Dimensions. <code>Dimension</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Dimensions</returns>
        public IEnumerable<Dimension> GetDimensions()
        {
            return _db.Dimensions.Select(CloneDimension).Where(cloned => cloned != null);
        }

        private Dimension CloneDimension(Dimension dimension)
        {
            if (dimension.GCRecord != null) return null;
            return (Dimension) _db.Entry(dimension).CurrentValues.ToObject();
        }

        // GET: odata/Dimensions(5)
        /// <summary>
        /// Get <code>Dimension</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>Dimension</code></param>
        /// <returns><code>Dimension</code> represented as root element, withoud referenced entities</returns>
        [Route("api/Dimensions({key})")]
        public Dimension GetDimension(int key)
        {
            return CloneDimension(_db.Dimensions.SingleOrDefault(dimension => dimension.OID == key));
        }

        /// <summary>
        /// Get list of Dimensions for Full Assessment. Includes AnsweredPersentage value
        /// </summary>
        /// <returns>list of Dimensions as DimensionDTO's</returns>
        [Route("api/Dimensions/GetFullList")]
        [Authorize]
        public IHttpActionResult GetFullList()
        {
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            if (!unit.PrimaryFramework.HasValue) return BadRequest("Primary Framework shoould be set for Current Unit");
            using (var helper = new AssessmentHelper(_db))
            {
                return Ok(helper.GetDimensionDtoList(unit, false));
            }
        }

        /// <summary>
        /// Get list of Dimensions for Full Assessment. Includes AnsweredPersentage value
        /// </summary>
        /// <returns>list of Dimensions as DimensionDTO's</returns>
        [Route("api/Dimensions/GetLiteList")]
        [Authorize]
        public IHttpActionResult GetDimensionList()
        {
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            using (var helper = new AssessmentHelper(_db))
            {
                return Ok(helper.GetDimensionDtoList(unit, true));
            }
        }

        private Unit GetCurrentUnit()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return null;
            return user.Unit;
        }

        /// <summary>
        /// NOT IN USE
        /// </summary>
        // POST: odata/Dimensions
        public IHttpActionResult Post(Dimension dimension)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _db.Dimensions.Add(dimension);
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

            return Ok(dimension);
        }

        /// <summary>
        /// NOT IN USE
        /// </summary>
        // PATCH: odata/Dimensions(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Dimension> patch)
        {
            Validate(patch.GetInstance());

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var dimension = _db.Dimensions.Find(key);
            if (dimension == null) return NotFound();

            patch.Patch(dimension);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DimensionExists(key))
                    return NotFound();
                throw;
            }

            return Ok(dimension);
        }

        /// <summary>
        /// NOT IN USE
        /// </summary>
        // DELETE: odata/Dimensions(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            var dimension = _db.Dimensions.Find(key);
            if (dimension == null) return NotFound();

            _db.Dimensions.Remove(dimension);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DimensionExists(key))
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

        private bool DimensionExists(int key)
        {
            return _db.Dimensions.Count(e => e.OID == key) > 0;
        }
    }
}
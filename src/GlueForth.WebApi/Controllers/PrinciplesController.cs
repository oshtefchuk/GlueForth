using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.OData;
using GlueForth.WebApi.Helpers;

namespace GlueForth.WebApi
{
    public class PrinciplesController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: odata/Principles
        /// <summary>
        /// Returns list of all Principles. <code>Principle</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Principles</returns>
        public IEnumerable<Principle> GetPrinciples()
        {
            return _db.Principles.Select(ClonePrinciple).Where(cloned => cloned != null);
        }

        private Principle ClonePrinciple(Principle principle)
        {
            if (principle.GCRecord != null) return null;
            return (Principle) _db.Entry(principle).CurrentValues.ToObject();
        }

        // GET: odata/Principles(5)
        /// <summary>
        /// Get <code>Principle</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>Principle</code></param>
        /// <returns><code>Principle</code> represented as root element, withoud referenced entities</returns>
        [Route("api/Principles({key})")]
        public Principle GetPrinciple(int key)
        {
            return ClonePrinciple(_db.Principles.SingleOrDefault(principle => principle.OID == key));
        }

        /// <summary>
        /// Returns list of Principles related to current AssessmentType and Framework as <code>PrincipleDTO</code>'s. 
        /// Result contains data about current SPA answering state:
        /// CharacteristicsCount - count of not completed Characteristics
        /// </summary>
        /// <returns>list of PrincipleGroup as <code>PrincipleDTO</code>'s</returns>
        [Route("api/Principles/GetFullList")]
        [Authorize]
        public IHttpActionResult GetFullList()
        {
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();

            using (var helper = new AssessmentHelper(_db))
            {
                try
                {
                    return Ok(helper.GetPrincipleDtoList(unit));

                }
                catch (System.Exception ex)
                {
                    return BadRequest(ex.StackTrace);
                }
            }
        }
        /// <summary>
        ///  <para>Returns list of Principles related to current AssessmentType and Framework as DTO's. </para>
        /// <para>Result contains data about current SPA answering state:</para>
        /// <para>AnsweredPercentage - percent of answered Principle questions</para>
        /// <para>Used at Assessment - Status page</para>
        /// </summary>
        /// <returns>list of Principleº as <code>PrincipleDTO</code></returns>
        [Route("api/PrincipleGroups/GetStatusList")]
        [Authorize]
        public IHttpActionResult GetFullPrincipleGroupList()
        {
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            if (!unit.PrimaryFramework.HasValue) return BadRequest("Primary Framework shoould be set for Current Unit");
            using (var helper = new AssessmentHelper(_db))
            {
                return Ok(helper.GetPrincipleStatusDtoList(unit));
            }
        }

        /// <summary>
        /// Returns list of Principles related to current AssessmentType and Framework as <code>PrincipleDTO</code>'s. 
        /// Result contains data about current SPA answering state:
        /// CharacteristicsCount - count of not completed Characteristics
        /// </summary>
        /// <returns>list of PrincipleGroup as <code>PrincipleDTO</code>'s</returns>
        [Route("api/Principles/GetLiteList")]
        [Authorize]
        public IHttpActionResult GetLiteList()
        {
            return GetFullList();
        }
        private Unit GetCurrentUnit()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return null;
            return user.Unit;
        }

        // POST: odata/Principles
        /// <summary>
        /// NOT IN USE
        /// </summary>
        public IHttpActionResult Post(Principle principle)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _db.Principles.Add(principle);
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

            return Ok(principle);
        }

        /// <summary>
        /// NOT IN USE
        /// </summary>
        // PATCH: odata/Principles(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Principle> patch)
        {
            Validate(patch.GetInstance());

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var principle = _db.Principles.Find(key);
            if (principle == null) return NotFound();

            patch.Patch(principle);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrincipleExists(key))
                    return NotFound();
                throw;
            }

            return Ok(principle);
        }

        /// <summary>
        /// NOT IN USE
        /// </summary>

        // DELETE: odata/Principles(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            var principle = _db.Principles.Find(key);
            if (principle == null) return NotFound();

            _db.Principles.Remove(principle);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrincipleExists(key))
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

        private bool PrincipleExists(int key)
        {
            return _db.Principles.Count(e => e.OID == key) > 0;
        }
    }
}
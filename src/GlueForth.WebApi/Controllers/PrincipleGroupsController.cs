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
    public class PrincipleGroupsController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: odata/PrincipleGroups
        /// <summary>
        /// Returns list of all PrincipleGroups. PrincipleGroup represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all PrincipleGroups</returns>
        public IEnumerable<PrincipleGroup> GetPrincipleGroups()
        {
            return _db.PrincipleGroups.Select(ClonePrincipleGroup).Where(cloned => cloned != null);
        }

        private PrincipleGroup ClonePrincipleGroup(PrincipleGroup principleGroup)
        {
            if (principleGroup.GCRecord != null) return null;
            return (PrincipleGroup)_db.Entry(principleGroup).CurrentValues.ToObject();
        }

        // GET: odata/PrincipleGroups(5)
        /// <summary>
        /// Get PrincipleGroup by OID
        /// </summary>
        /// <param name="key">OID of Commodity</param>
        /// <returns>PrincipleGroup represented as root element, withoud referenced entities</returns>
        [Route("api/PrincipleGroups({key})")]
        public PrincipleGroup GetPrincipleGroup(int key)
        {
            return ClonePrincipleGroup(_db.PrincipleGroups.SingleOrDefault(principlegroup => principlegroup.OID == key));
        }

        /// <summary>
        /// Returns list of PrincipleGroups related to current AssessmentType and Framework as DTO's. 
        /// Result contains data about current SPA answering state:
        /// CharacteristicsCount - count of not completed Characteristics
        /// </summary>
        /// <returns>list of PrincipleGroup as DTO's</returns>
        [Route("api/PrincipleGroups/GetFullList")]
        public IHttpActionResult GetFullPrinciplesList()
        {
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            if (!unit.PrimaryFramework.HasValue) return BadRequest("Primary Framework shoould be set for Current Unit");
            using (var helper = new AssessmentHelper(_db))
            {
                return Ok(helper.GetPrincipleGroupDtoList(unit));
            }
        }

        /// <summary>
        /// Returns list of PrincipleGroups related to current AssessmentType and Framework as DTO's. Used for Principle group selector at MyActions->Prioritise page
        /// </summary>
        /// <returns>list of PrincipleGroup as DTO's</returns>
        [Route("api/PrincipleGroups/GetList")]
        [Authorize]
        public IHttpActionResult GetPrinciplesList()
        {
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            using (var helper = new AssessmentHelper(_db))
            {
                try
                {
                    return Ok(helper.GetPrincipleGroupList(unit));
                }
                catch (System.Exception ex)
                {
                    return BadRequest(ex.StackTrace);
                }
            }
        }

        /// <summary>
        /// Returns list of PrincipleGroups related to current AssessmentType and Framework as DTO's. 
        /// Result contains data about current SPA answering state:
        /// CharacteristicsCount - count of not completed Characteristics
        /// </summary>
        /// <remarks>It's duplicate of GetFullList. Historically, there was different logic, now difference comes inside depends on current Unit.CurrentFramework/Assessmenttype</remarks>
        /// <returns>list of PrincipleGroup as DTO's</returns>
        [Route("api/PrincipleGroups/GetLiteList")]
        [Authorize]
        public IHttpActionResult GetLitePrinciplesList()
        {
            return GetFullPrinciplesList();
        }

        /// <summary>
        /// Returns list of PrincipleGroups related to current Full Assessment and current Framework as DTO's. 
        /// Result contains data about current SPA answering state:
        /// UnAnsweredQuestionsCount - count of non-answered questions of PrincipleGroup
        /// AnsweredPercentage - % of answered questions of PrincipleGroup
        /// </summary>
        /// <returns>list of PrincipleGroup as DTO's</returns>
        [Route("api/PrincipleGroups/GetFullStatusList")]
        public IHttpActionResult GetFullPrincipleGroupList()
        {
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            if (!unit.PrimaryFramework.HasValue) return BadRequest("Primary Framework shoould be set for Current Unit");
            using (var helper = new AssessmentHelper(_db))
            {
                return Ok(helper.GetPrincipleGroupStatusDtoList(unit, 0));
            }
        }

        /// <summary>
        /// Returns list of PrincipleGroups related to current Lite Assessment and current Framework as DTO's. 
        /// Result contains data about current SPA answering state:
        /// UnAnsweredQuestionsCount - count of non-answered questions of PrincipleGroup
        /// AnsweredPercentage - % of answered questions of PrincipleGroup
        /// </summary>
        /// <returns>list of PrincipleGroup as DTO's</returns>
        [Route("api/PrincipleGroups/GetLiteStatusList")]
        [Authorize]
        public IHttpActionResult GetLiteStatusPrincipleGroupist()
        {
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            using (var helper = new AssessmentHelper(_db))
            {
                return Ok(helper.GetPrincipleGroupStatusDtoList(unit, 1));
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

        // POST: odata/PrincipleGroups
        /// <summary>
        /// Auto-generated POST method. NOT IN USE
        /// </summary>
        public IHttpActionResult Post(PrincipleGroup principlegroup)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _db.PrincipleGroups.Add(principlegroup);
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

            return Ok(principlegroup);
        }

        /// <summary>
        /// Auto-generated Patch method. NOT IN USE
        /// </summary>
        // PATCH: odata/PrincipleGroups(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<PrincipleGroup> patch)
        {
            Validate(patch.GetInstance());

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var principlegroup = _db.PrincipleGroups.Find(key);
            if (principlegroup == null) return NotFound();

            patch.Patch(principlegroup);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrincipleGroupExists(key))
                    return NotFound();
                throw;
            }

            return Ok(principlegroup);
        }

        // DELETE: odata/PrincipleGroups(5)
        /// <summary>
        /// Auto-generated Delete method. NOT IN USE
        /// </summary>
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            var principlegroup = _db.PrincipleGroups.Find(key);
            if (principlegroup == null) return NotFound();

            _db.PrincipleGroups.Remove(principlegroup);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrincipleGroupExists(key))
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

        private bool PrincipleGroupExists(int key)
        {
            return _db.PrincipleGroups.Count(e => e.OID == key) > 0;
        }
    }
}
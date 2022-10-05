using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using GlueForth.WebApi.DTOs;
using GlueForth.WebApi.Helpers;

namespace GlueForth.WebApi.Controllers
{
    public class SPADataSetsController : ApiController
    {
        private const string NotReviewedGrade = "D";
        private const string UnderReviewGrade = "C";
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/SPADataSets
        /// <summary>
        /// Returns list of all SPADataSets. <code>SPADataSets</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all SPADataSets</returns>
        public IEnumerable<SPADataSet> GetSPADataSets()
        {
            return _db.SPADataSets.Select(CloneSPADataSet).Where(cloned => cloned != null);
            ;
        }

        private SPADataSet CloneSPADataSet(SPADataSet spaDataSet)
        {
            if (spaDataSet.GCRecord != null) return null;
            return (SPADataSet) _db.Entry(spaDataSet).CurrentValues.ToObject();
        }

        // GET: api/SPADataSets/5
        /// <summary>
        /// Get <code>SPADataSets</code> by OID
        /// </summary>
        /// <param name="id">OID of <code>SPADataSets</code></param>
        /// <returns><code>SPADataSets</code> represented as root element, withoud referenced entities</returns>
        [ResponseType(typeof(SPADataSet))]
        public IHttpActionResult GetSPADataSet(int id)
        {
            var sPADataSet = _db.SPADataSets.Find(id);
            if (sPADataSet == null) return NotFound();

            return Ok(CloneSPADataSet(sPADataSet));
        }

        /// <summary>
        /// Add Characteristic to list of non-relevant Characteristics of current SpaDataSet
        /// </summary>
        /// <param name="characteristicOid">Oid of Characteristic</param>
        /// <returns>Ok - if succeed</returns>
        [Authorize]
        [HttpPost]
        [Route("api/SPADataSets/AddNonRelevantCharacteristic({characteristicOid})")]
        public IHttpActionResult AddNonRelevantCharacteristic(int characteristicOid)
        {
            var userName = ((ClaimsPrincipal) User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            SPADataSet currentSpaDataSet;
            try
            {
                currentSpaDataSet = _db.SPADataSets.SingleOrDefault(x =>
                    x.Unit == currentUnit.Oid && x.AssessmentType == currentUnit.CurrentAssessmentType && x.Framework.Value == currentUnit.PrimaryFramework.Value && x.GCRecord == null);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }

            if (currentSpaDataSet == null)
            {
                var defaultGrade = _db.Grades.Where(x => x.ShortTitle.Equals(NotReviewedGrade) && x.GCRecord == null)
                    .Select(y => y.OID).FirstOrDefault();

                currentSpaDataSet = new SPADataSet
                {
                    Unit = currentUnit.Oid,
                    AssessmentType = currentUnit.CurrentAssessmentType,
                    Framework = currentUnit.PrimaryFramework.Value,
                    Grade = defaultGrade,
                    Created = DateTime.Now
                };

                _db.SPADataSets.Add(currentSpaDataSet);
            }

            var isExists =
                currentSpaDataSet.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.Any(x =>
                    x.NonRelevantCharacteristics == characteristicOid);

            if (!isExists)
                currentSpaDataSet.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics
                    .Add(new SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics
                    {
                        NonRelevantCharacteristics = characteristicOid
                    });
            else
                return BadRequest("Non Relevant Characteristic already exists");

            _db.SaveChanges();
            return Ok();
        }

        /// <summary>
        /// Remove Characteristic from list of non-relevant Characteristics of current SpaDataSet
        /// </summary>
        /// <param name="characteristicOid">Oid of Characteristic</param>
        /// <returns>Ok - if succeed</returns>
        [Authorize]
        [HttpDelete]
        [Route("api/SPADataSets/RemoveNonRelevantCharacteristic({characteristicOid})")]
        public IHttpActionResult RemoveNonRelevantCharacteristic(int characteristicOid)
        {
            var userName = ((ClaimsPrincipal) User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;

            SPADataSet currentSpaDataSet;
            try
            {
                currentSpaDataSet = _db.SPADataSets.SingleOrDefault(x =>
                    x.Unit == currentUnit.Oid && x.AssessmentType == currentUnit.CurrentAssessmentType && x.Framework == currentUnit.PrimaryFramework && x.GCRecord == null);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }

            if (currentSpaDataSet != null)
            {
                var nonRelevantCharacteristic =
                    currentSpaDataSet.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.SingleOrDefault(
                        x => x.NonRelevantCharacteristics == characteristicOid);

                if (nonRelevantCharacteristic != null)
                    _db.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics
                        .Remove(nonRelevantCharacteristic);
                else
                    return BadRequest("Non Relevant Characteristic not exists for this SPADataSet");

                _db.SaveChanges();
            }

            return Ok();
        }

        /// <summary>
        /// Get SPADataSets list of specific AssessmentType
        /// </summary>
        /// <param name="assessmentType">0 - Full, 1 - Lite</param>
        /// <returns>List of SpaDTO's</returns>
        [Authorize]
        [Route("api/SPADataSets/GetByAssessmentType({assessmentType})")]
        public IHttpActionResult GetSpaDataSetByAssessmentType(int assessmentType)
        {
            var userName = ((ClaimsPrincipal) User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            SPADataSet spa;
            try
            {
                spa = _db.SPADataSets.SingleOrDefault(x =>
                    x.Unit == currentUnit.Oid && x.AssessmentType == assessmentType && x.Framework == currentUnit.PrimaryFramework && x.GCRecord == null);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }

            if (spa == null) return BadRequest("SPA Data Set for this unit is not exists");
            var liteGroupsFromConfig = ConfigurationManager.AppSettings["LiteQuestionGroups"].ToLower();
            var liteQuestionGroups = liteGroupsFromConfig.Split(';');
            var helper = new AssessmentHelper(_db);

            var characteristicList = helper.GetCharacteristicListByFramework(currentUnit.PrimaryFramework.Value);
            characteristicList = characteristicList.Where(x => spa.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.All(y => y.NonRelevantCharacteristics != x.OID)).ToList();
            var questions = characteristicList.SelectMany(x => x.QuestionQuestions_CharacteristicCharacteristics).Where(y => y.Question.GCRecord == null && y.Characteristic.GCRecord == null).ToList();
            var questionsCount = assessmentType == 1 ? 
                characteristicList.SelectMany(x => x.QuestionGroupQuestionGroups_CharacteristicCharacteristics).Where(x => x.Characteristic.GCRecord == null).Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                    .Where(x => liteQuestionGroups.Contains(x.Title.ToLower())).SelectMany(y => y.Questions).Count(x => x.GCRecord == null) :
                questions.Count(y => y.Question.GCRecord == null && y.Characteristic.GCRecord == null);

            if (questionsCount == 0) return BadRequest("Questions for this SPA Data Set not exists");
            var answers = _db.Answers.Where(x => x.GCRecord == null && x.SPADataSet.OID == spa.OID).ToList();
            var answersCount = assessmentType == 1 ? answers.Count() : answers.Count(x => questions.Any(y => y.Question.OID == x.Question && y.Characteristics == x.Characteristic));
            return Ok(new SpaDTO(spa, questionsCount, answersCount));
        }

        /// <summary>
        /// Checks is current Assessment completed
        /// </summary>
        /// <returns>True - if current Assessment completed</returns>
        [Authorize]
        [HttpGet]
        [Route("api/SPADataSets/IsCurrentSPACompleted")]
        public IHttpActionResult IsCurrentSPACompleted()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            var spa = _db.SPADataSets.FirstOrDefault(x =>
                    x.Unit == currentUnit.Oid && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Framework == currentUnit.PrimaryFramework && x.GCRecord == null);

            if (spa == null) return BadRequest("SPA Data Set for this unit is not exists");
            var liteGroupsFromConfig = ConfigurationManager.AppSettings["LiteQuestionGroups"].ToLower();
            var liteQuestionGroups = liteGroupsFromConfig.Split(';');
            var helper = new AssessmentHelper(_db);

            var characteristicList = helper.GetCharacteristicListByFramework(currentUnit.PrimaryFramework.Value);
            characteristicList = characteristicList.Where(x => spa.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.All(y => y.NonRelevantCharacteristics != x.OID)).ToList();
            var questions = characteristicList.SelectMany(x => x.QuestionQuestions_CharacteristicCharacteristics).Where(y => y.Question.GCRecord == null && y.Characteristic.GCRecord == null).ToList();
            var questionsCount = user.Unit.CurrentAssessmentType == 1 ?
                characteristicList.SelectMany(x => x.QuestionGroupQuestionGroups_CharacteristicCharacteristics).Where(x => x.Characteristic.GCRecord == null).Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                    .Where(x => liteQuestionGroups.Contains(x.Title.ToLower())).SelectMany(y => y.Questions).Count(x => x.GCRecord == null) :
                questions.Count(y => y.Question.GCRecord == null && y.Characteristic.GCRecord == null);

            if (questionsCount == 0) return BadRequest("Questions for this SPA Data Set not exists");
            var answers = _db.Answers.Where(x => x.GCRecord == null && x.SPADataSet.OID == spa.OID).ToList();
            var answersCount = user.Unit.CurrentAssessmentType == 1 ? answers.Count() : answers.Count(x => questions.Any(y => y.Question.OID == x.Question && y.Characteristics == x.Characteristic));

            return Ok(answersCount >= questionsCount);
        }

        /// <summary>
        /// Set UnderReview Grade for specified by current SPADataSet by Assessment Type
        /// </summary>
        /// <param name="assessmentType">0 - Full, 1 - Lite</param>
        /// <returns>Ok - if succeed</returns>
        [HttpPost]
        [Authorize]
        [Route("api/SPADataSets/UpdateGradeByAssessmentType({assessmentType})")]
        public IHttpActionResult UpdateSpaDataSetGradeToUnderReviewState(int assessmentType)
        {
            var userName = ((ClaimsPrincipal) User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;

            SPADataSet spaDataSet;
            try
            {
                spaDataSet = _db.SPADataSets.SingleOrDefault(x =>
                    x.Unit == currentUnit.Oid && x.AssessmentType == assessmentType && x.Framework == currentUnit.PrimaryFramework.Value && x.GCRecord == null);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }

            if (spaDataSet == null) return BadRequest("SpaDataSet not found");

            var cGrade = _db.Grades.Where(x => x.ShortTitle.Equals(UnderReviewGrade) && x.GCRecord == null)
                .Select(y => y.OID).FirstOrDefault();

            spaDataSet.Grade = cGrade;
            spaDataSet.Modified = DateTime.Now;

            _db.SaveChanges();
            return Ok();
        }

        // PUT: api/SPADataSets/5
        /// <summary>
        /// NOT IN USE
        /// </summary>
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSPADataSet(int id, SPADataSet sPADataSet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != sPADataSet.OID) return BadRequest();

            _db.Entry(sPADataSet).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SPADataSetExists(id))
                    return NotFound();
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/SPADataSets
        /// <summary>
        /// NOT IN USE
        /// </summary>
        [ResponseType(typeof(SPADataSet))]
        public IHttpActionResult PostSPADataSet(SPADataSet sPADataSet)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _db.SPADataSets.Add(sPADataSet);
            _db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new {id = sPADataSet.OID}, sPADataSet);
        }

        // DELETE: api/SPADataSets/5
        /// <summary>
        /// NOT IN USE
        /// </summary>
        [ResponseType(typeof(SPADataSet))]
        public IHttpActionResult DeleteSPADataSet(int id)
        {
            var sPADataSet = _db.SPADataSets.Find(id);
            if (sPADataSet == null) return NotFound();

            _db.SPADataSets.Remove(sPADataSet);
            _db.SaveChanges();

            return Ok(sPADataSet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        private bool SPADataSetExists(int id)
        {
            return _db.SPADataSets.Count(e => e.OID == id) > 0;
        }
    }
}
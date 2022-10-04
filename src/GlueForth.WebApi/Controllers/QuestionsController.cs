using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using BlueNorth.WebApi.DTOs;
using BlueNorth.WebApi.Helpers;

namespace BlueNorth.WebApi
{
    public class QuestionsController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/Questions
        /// <summary>
        /// Returns list of all Questions. <code>Question</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Questions</returns>
        public IEnumerable<Question> GetQuestions()
        {
            return _db.Questions.Select(CloneQuestion).Where(cloned => cloned != null);
        }

        private Question CloneQuestion(Question question)
        {
            if (question.Version1?.Deleted == true) return null;
            return (Question)_db.Entry(question).CurrentValues.ToObject();
        }

        private QuestionGroup CloneQuestionGroup(QuestionGroup questionGroup)
        {
            if (questionGroup.Version1?.Deleted == true) return null;
            return (QuestionGroup)_db.Entry(questionGroup).CurrentValues.ToObject();
        }

        // GET: api/Questions(5)
        /// <summary>
        /// Get <code>Question</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>Question</code></param>
        /// <returns><code>Question</code> represented as root element, withoud referenced entities</returns>
        [Route("api/Questions({key})")]
        public IHttpActionResult GetQuestion(int key)
        {
            var question = _db.Questions.SingleOrDefault(x => x.OID == key);
            var cloned = CloneQuestion(question);
            return cloned == null ? (IHttpActionResult)NotFound() : Ok(cloned);
        }

        // GET: api/Questions(5)
        /// <summary>
        /// Get QuestionsGroups from lowest nodes (where we not have child QuestionsGroups). represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>QuestionsGroups, represented as root element, withoud referenced entities</returns>
        [Route("api/QuestionGroups/GetLowest")]
        public IEnumerable<QuestionGroup> GetLowestQuestionGroups()
        {
            return _db.QuestionGroups.Where(x => x.Parent.HasValue && x.QuestionGroup2.Parent.HasValue).OrderBy(x => x.ShortTitle).Select(CloneQuestionGroup);
        }

        // GET: api/Questions/GetByGroup({scale})
        /// <summary>
        /// Get Questions of specific QuestionGroup
        /// </summary>
        /// <returns>Questions, represented as root element, withoud referenced entities</returns>
        [Route("api/Questions/GetByGroup({key})")]
        public IEnumerable<Question> GetQuestionsByGroup(string key)
        {
            var questionsList = _db.QuestionGroups
                .Where(x => x.ShortTitle.Equals(key, StringComparison.InvariantCultureIgnoreCase) && x.GCRecord == null)
                .SelectMany(y => y.Questions)
                .ToList();

            var clonedQuestionsList = questionsList.Select(CloneQuestion).Where(cloned => cloned != null);
            return clonedQuestionsList;
        }

        // GET: api/Questions/GetLiteListByStandardAndPrinciple({principleOid})
        /// <summary>
        /// List of Principle Questions, prepared for Lite Assessment
        /// </summary>
        /// <param name="principleOid">Oid of Principle</param>
        /// <returns>List of Question's represented as LiteQuestionDTO's</returns>
        [Authorize]
        [Route("api/Questions/GetLiteListByStandardAndPrinciple({principleOid})")]
        public IHttpActionResult GetLiteQuestionsListByStandardAndPrinciple(int principleOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");

            var isLiteAssessment = user.Unit.CurrentAssessmentType == 1;
            if (!isLiteAssessment) return BadRequest("Current Assessment Type should be Lite");

            var helper = new AssessmentHelper(_db);

            var liteGroupsFromConfig = ConfigurationManager.AppSettings["LiteQuestionGroups"].ToLower();
            var liteQuestionGroups = liteGroupsFromConfig.Split(';');

            var characteristicListByPrinciple = helper.GetCharacteristicListByFramework(currentUnit.PrimaryFramework.Value)
                .Where(e => e.Principle1.OID == principleOid).ToList();

            var liteQuestionDtoList = new List<LiteQuestionDTO>();

            foreach (var characteristic in characteristicListByPrinciple)
            {
                var question1 = characteristic.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                    .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                    .Where(x => liteQuestionGroups[0].Equals(x.Title.ToLower()))
                    .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);

                var question2 = characteristic.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                    .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                    .Where(x => liteQuestionGroups[1].Equals(x.Title.ToLower()))
                    .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);

                if (question1 != null && question2 != null)
                    liteQuestionDtoList.Add(new LiteQuestionDTO(characteristic, question1, question2, currentUnit) { Status = helper.GetCharacteristicState(characteristic, currentUnit) });
            }

            return Ok(liteQuestionDtoList);
        }

        // GET: api/Questions/GetLiteQuestionsGroupGuidances
        /// <summary>
        /// Returns List of QuestionsGroup Guidances for Lite assessment
        /// </summary>
        /// <returns>strings</returns>
        [Route("api/Questions/GetLiteQuestionsGroupGuidances")]
        public string[] GetLiteQuestionsGroupGuidances()
        {

            var liteGroupsFromConfig = ConfigurationManager.AppSettings["LiteQuestionGroups"].ToLower();
            var liteQuestionGroups = liteGroupsFromConfig.Split(';');
            return _db.QuestionGroups.Where(x => liteQuestionGroups.Any(y => y.Equals(x.Title.ToLower()))).Select(x => x.GuidanceText).ToArray();
        }

        /// <summary>
        /// List of PrincipleGroup Questions, prepared for Lite Assessment
        /// </summary>
        /// <param name="principleGroupOid">Oid of PrincipleGroup</param>
        /// <returns>List of Question's represented as LiteQuestionDTO's</returns>
        [Authorize]
        [Route("api/Questions/GetLiteListByStandardAndPrincipleGroup({principleGroupOid})")]
        public IHttpActionResult GetLiteQuestionsListByStandardAndPrincipleGroup(int principleGroupOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");

            var isLiteAssessment = user.Unit.CurrentAssessmentType == 1;
            if (!isLiteAssessment) return BadRequest("Current Assessment Type should be Lite");

            var helper = new AssessmentHelper(_db);

            var liteGroupsFromConfig = ConfigurationManager.AppSettings["LiteQuestionGroups"].ToLower();
            var liteQuestionGroups = liteGroupsFromConfig.Split(';');

            var characteristicListByPrincipleGroup = helper.GetCharacteristicListByFramework(currentUnit.PrimaryFramework.Value)
                .Where(e => e.PrincipleGroup1.OID == principleGroupOid).ToList();

            var liteQuestionDtoList = new List<LiteQuestionDTO>();

            try
            {
                foreach (var characteristic in characteristicListByPrincipleGroup)
                {
                    var question1 = characteristic.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                        .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                        .Where(x => liteQuestionGroups[0].Equals(x.Title.ToLower()))
                        .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);

                    var question2 = characteristic.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                    .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                    .Where(x => liteQuestionGroups[1].Equals(x.Title.ToLower()))
                    .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);

                    if (question1 != null && question2 != null)
                    {
                        AnswerNote answerNote1 = new AnswerNote();
                        AnswerNote answerNote2 = new AnswerNote();

                        if (question1.Answers.Any())
                        {
                            var answer1 = question1.Answers.FirstOrDefault(x =>
                                                       x.GCRecord == null &&
                                                       x.SPADataSet != null &&
                                                       x.SPADataSet.GCRecord == null &&
                                                       x.SPADataSet.Unit == currentUnit.Oid &&
                                                       x.SPADataSet.AssessmentType == currentUnit.CurrentAssessmentType &&
                                                       x.SPADataSet.Framework == currentUnit.PrimaryFramework &&
                                                       x.Characteristic.HasValue && x.Characteristic.Value == characteristic.OID
                                                       );

                            if (answer1 != null)
                            {
                                answerNote1 = _db.AnswerNotes.FirstOrDefault(x => x.Answer == answer1.OID);
                            }
                        }

                        if (question2.Answers.Any())
                        {
                            var answer2 = question2.Answers.FirstOrDefault(x =>
                                                       x.GCRecord == null &&
                                                       x.SPADataSet != null &&
                                                       x.SPADataSet.GCRecord == null &&
                                                       x.SPADataSet.Unit == currentUnit.Oid &&
                                                       x.SPADataSet.AssessmentType == currentUnit.CurrentAssessmentType &&
                                                       x.SPADataSet.Framework == currentUnit.PrimaryFramework &&
                                                       x.Characteristic.HasValue && x.Characteristic.Value == characteristic.OID
                                                       );

                            if (answer2 != null)
                            {
                                answerNote2 = _db.AnswerNotes.FirstOrDefault(x => x.Answer == answer2.OID);
                            }
                        }                        
                        liteQuestionDtoList.Add(new LiteQuestionDTO(characteristic, question1, answerNote1, question2, answerNote2, currentUnit) { Status = helper.GetCharacteristicState(characteristic, currentUnit) });
                    }
                }
            }
            catch (Exception ex)
            {

                throw;
            }

            return Ok(liteQuestionDtoList);
        }

        // GET: api/Questions/GetLiteListByStandardAndPrinciple({dimensionOid})
        /// <summary>
        /// List of Dimension Questions, prepared for Lite Assessment
        /// </summary>
        /// <param name="dimensionOid">Oid of Dimension</param>
        /// <returns>List of Question's represented as LiteQuestionDTO's</returns>

        [Authorize]
        [Route("api/Questions/GetLiteListByStandardAndDimension({dimensionOid})")]
        public IHttpActionResult GetLiteQuestionsListByStandardAndDimension(int dimensionOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");

            var isLiteAssessment = user.Unit.CurrentAssessmentType == 1;
            if (!isLiteAssessment) return BadRequest("Current Assessment Type should be Lite");

            var helper = new AssessmentHelper(_db);

            var liteGroupsFromConfig = ConfigurationManager.AppSettings["LiteQuestionGroups"].ToLower();
            var liteQuestionGroups = liteGroupsFromConfig.Split(';');

            var characteristicListByDimension = helper.GetCharacteristicListByFramework(currentUnit.PrimaryFramework.Value)
                .Where(e => e.Principle1.Dimension1.OID == dimensionOid).ToList();

            var liteQuestionDtoList = new List<LiteQuestionDTO>();

            foreach (var characteristic in characteristicListByDimension)
            {
                var question1 = characteristic.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                    .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                    .Where(x => liteQuestionGroups[0].Equals(x.Title.ToLower()))
                    .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);

                var question2 = characteristic.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                    .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                    .Where(x => liteQuestionGroups[1].Equals(x.Title.ToLower()))
                    .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);

                if (question1 != null && question2 != null)
                    liteQuestionDtoList.Add(new LiteQuestionDTO(characteristic, question1, question2, currentUnit));
            }

            return Ok(liteQuestionDtoList);
        }

        // GET: api/Questions/GetFirstNotCapturedCharacteristic
        /// <summary>
        /// Get Oid of first Characteristic where we have no Answers for Assessment
        /// </summary>
        /// <returns>Oid of Characteristic</returns>
        [Route("api/Questions/GetFirstNotCapturedCharacteristic")]
        public int? GetFirstNotCapturedCharacteristic()
        {
            var characteristic = _db.QuestionGroups
                .Where(y => y.Questions.Any(x => !x.Answers.Any()) && y.GCRecord == null)
                .SelectMany(z => z.QuestionGroupQuestionGroups_CharacteristicCharacteristics)
                .Select(x => x.Characteristic)
                .FirstOrDefault(c => c.GCRecord == null);

            return characteristic?.OID;
        }

        // GET: api/Questions/GetFirstNotCapturedCharacteristicByPrinciple
        /// <summary>
        /// Get Oid of first Characteristic where we have no Answers for current Assessment and specfific Principle
        /// </summary>
        /// <param name="principleOid">Oid of Principle</param>
        /// <returns>Oid of Characteristic</returns>
        [Route("api/Questions/GetFirstNotCapturedCharacteristicByPrinciple({principleOid})")]
        public IHttpActionResult GetFirstNotCapturedCharacteristicByPrinciple(int principleOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");

            var helper = new AssessmentHelper(_db);

            var charList = helper.GetCharacteristicListByFramework(currentUnit.PrimaryFramework.Value)
                .Where(x => x.Principle == principleOid && x.Principle1.GCRecord == null);

            var charOid = charList.Where(x => x.QuestionGroupQuestionGroups_CharacteristicCharacteristics.SelectMany(z => z.QuestionGroup.Questions).Any(t => !t.Answers.Any()))
                .Select(y => y.OID).FirstOrDefault();

            return Ok(charOid);
        }

        // GET: api/Questions/GetFirstNotCapturedCharacteristicByDimension
        /// <summary>
        /// Get Oid of first Characteristic where we have no Answers for current Assessment and specific Dimension
        /// </summary>
        /// <param name="dimensionOid">Oid of Dimension</param>
        /// <returns>Oid of Characteristic</returns>
        [Route("api/Questions/GetFirstNotCapturedCharacteristicByDimension({dimensionOid})")]
        public IHttpActionResult GetFirstNotCapturedCharacteristicByDimension(int dimensionOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit?.PrimaryFramework;
            if (currentFramework == null) return BadRequest("Current Framework is empty or incorrect");

            var helper = new AssessmentHelper(_db);

            var charList = helper.GetCharacteristicListByFramework(currentFramework.Value)
                .Where(x => x.Principle1.Dimension == dimensionOid && x.Principle1.Dimension1.GCRecord == null);

            var charOid = charList.Where(x => x.QuestionGroupQuestionGroups_CharacteristicCharacteristics.SelectMany(z => z.QuestionGroup.Questions).Any(t => !t.Answers.Any() && t.GCRecord == null))
                .Select(y => y.OID).FirstOrDefault();

            return Ok(charOid);
        }

        /// <summary>
        /// Get Oid of first Characteristic where we have no Answers for current Assessment and specific PrincipleGroup
        /// </summary>
        /// <param name="principleGroupId">Oid of PrincipleGroup</param>
        /// <returns>Oid of Characteristic</returns>
        [Route("api/Questions/GetFirstNotCapturedCharacteristicByPrincipleGroup({principleGroupId})")]
        public IHttpActionResult GetFirstNotCapturedCharacteristicByPrincipleGroup(int principleGroupId)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit?.PrimaryFramework;
            if (currentFramework == null) return BadRequest("Current Framework is empty or incorrect");

            var helper = new AssessmentHelper(_db);

            var charList = helper.GetCharacteristicListByFramework(currentFramework.Value)
                .Where(x => x.PrincipleGroup == principleGroupId);

            var charOid = charList.Where(x => x.QuestionGroupQuestionGroups_CharacteristicCharacteristics.SelectMany(z => z.QuestionGroup.Questions).Any(t => !t.Answers.Any() && t.GCRecord == null))
                .Select(y => y.OID).FirstOrDefault();

            return Ok(charOid);
        }

        // GET: api/Questions/GetByCharacteristicAndUnit({characteristicOid}})
        /// <summary>
        /// List of Characteristic Questions, prepared for Full Assessment
        /// </summary>
        /// <param name="characteristicOid">Oid of Characteristic</param>
        /// <returns>List of Question's represented as FullQuestionDTO's</returns>
        [Authorize]
        [Route("api/Questions/GetListByCharacteristicAndUnit({characteristicOid})")]
        public IHttpActionResult GetQuestionsByCharacteristic(int characteristicOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;

            var isFullAssessment = user.Unit.CurrentAssessmentType == 0;
            if (!isFullAssessment) return BadRequest("Current Assessment Type should be Full");

            var characteristic = _db.Characteristics.SingleOrDefault(x => x.OID == characteristicOid && x.GCRecord == null);

            if (characteristic == null) return BadRequest("Characteristic with this OID is not found");

            var isRelevant = !characteristic.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.Intersect(
                currentUnit.SPADataSets.Where(x => x.AssessmentType == currentUnit.CurrentAssessmentType)
                        .SelectMany(x => x.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics)).Any();

            var questionGroups = characteristic.QuestionQuestions_CharacteristicCharacteristics.Where(x => x.Question.GCRecord == null)
                .Select(x => x.Question).OrderBy(z => z.QuestionGroup.ShortTitle).GroupBy(y => y.QuestionGroup);

            var questionDtoList = new List<QuestionDTO>();
            foreach (var group in questionGroups)
            {
                var secondLevelGroup = (group.Key.Parent != null && group.Key.QuestionGroup2.Parent.HasValue) ? group.Key.QuestionGroup2 : group.Key;
                foreach (var question in group)
                    if (question.Answers.Any())
                    {
                        var answer = question.Answers.FirstOrDefault(x =>
                            x.GCRecord == null &&
                            x.SPADataSet != null &&
                            x.SPADataSet.GCRecord == null &&
                            x.SPADataSet.Unit == currentUnit.Oid &&
                            x.SPADataSet.AssessmentType == currentUnit.CurrentAssessmentType &&
                            x.SPADataSet.Framework == currentUnit.PrimaryFramework &&
                            x.Characteristic.HasValue && x.Characteristic.Value == characteristicOid
                            );

                        if (answer != null)
                        {
                            var answerNote = _db.AnswerNotes.FirstOrDefault(x => x.Answer == answer.OID);
                            questionDtoList.Add(new QuestionDTO(secondLevelGroup, question, answer, answerNote));
                        }
                        else
                            questionDtoList.Add(new QuestionDTO(secondLevelGroup, question, answer));
                    }
                    else
                    {
                        questionDtoList.Add(new QuestionDTO(secondLevelGroup, question, null));
                    }
            }


            return Ok(new FullQuestionDTO(questionDtoList, isRelevant));
        }

        // POST: api/Questions
        /// <summary>
        /// NOT IN USE
        /// </summary>
        [Authorize]
        public IHttpActionResult Post(Question question)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var dbQuestion = new Question();

            var isNewEntity = question.OID == 0;
            var isDefaultPropertyChanged = false;

            if (!isNewEntity)
            {
                dbQuestion = _db.Questions.Find(question.OID);

                if (dbQuestion != null) isDefaultPropertyChanged = !dbQuestion.Title.Equals(question.Title);
            }

            if (isNewEntity || isDefaultPropertyChanged)
                try
                {
                    ValidateEntry(question.Title);
                }
                catch (ArgumentException e)
                {
                    return BadRequest(e.Message);
                }

            var version = isNewEntity
                ? VersionHelper.CreateVersion(_db, user.Oid)
                : VersionHelper.EditVersion(_db, user.Oid, dbQuestion?.Version1);

            if (isNewEntity)
            {
                // copy values without reference to avoid StackOverflowException when Version will be added
                dbQuestion.Title = question.Title;
                dbQuestion.Reference = question.Reference;
                dbQuestion.Version1 = version;
                //

                _db.Questions.Add(dbQuestion);
            }
            else
            {
                if (dbQuestion == null)
                    return BadRequest("Entity not found in DataBase");

                _db.Entry(dbQuestion).CurrentValues.SetValues(question);
                dbQuestion.Version1 = version;
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
            question.OID = dbQuestion.OID;
            return Ok(question);
        }

        private void ValidateEntry(string questionTitle)
        {
            if (string.IsNullOrEmpty(questionTitle)) throw new ArgumentException(@"The title is empty", questionTitle);

            var isExists = _db.Questions.Any(x =>
                x.Title.Equals(questionTitle, StringComparison.InvariantCultureIgnoreCase));
            if (isExists)
                throw new ArgumentException(@"Question with this title already exists", questionTitle);
        }

        /// <summary>
        /// NOT IN USE
        /// </summary>
        // DELETE: api/Questions(5)
        [Route("api/Questions({key})")]
        [Authorize]
        public IHttpActionResult Delete(int key)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var question = _db.Questions.Find(key);
            if (question == null) return NotFound();

            var dbVersion = _db.Versions.Find(question.Version);
            if (dbVersion != null)
                question.Version1 = VersionHelper.EditVersion(_db, user.Oid, dbVersion, true);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(key)) return NotFound();
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        private bool QuestionExists(int key)
        {
            return _db.Questions.Count(e => e.OID == key) > 0;
        }
    }
}
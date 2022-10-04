using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using BlueNorth.WebApi.DTOs;

namespace BlueNorth.WebApi
{
    public class AnswersController : ApiController
    {
        private const string NotReviewedGrade = "D";
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/Answers
        /// <summary>
        /// Returns list of all Answers. <code>Answer</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Answers</returns>
        public IEnumerable<Answer> GetAnswers()
        {
            var result = new List<Answer>();
            _db.Answers.ToList().ForEach(x => result.Add(CloneAnswer(x)));
            return result;
        }

        private Answer CloneAnswer(Answer answer)
        {
            return (Answer)_db.Entry(answer).CurrentValues.ToObject();
        }

        // GET: api/Answers(5)
        /// <summary>
        /// Get <code>Answer</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>Answer</code></param>
        /// <returns><code>Answer</code> represented as root element, withoud referenced entities</returns>
        [Route("api/Answers({key})")]
        public Answer GetAnswer(int key)
        {
            return CloneAnswer(_db.Answers.SingleOrDefault(answer => answer.OID == key));
        }

        // POST: api/Answers/CreateOrUpdate
        /// <summary>
        /// POST Method for Answer creation/update
        /// </summary>
        /// <param name="unit"><code>AnswerDTO</code> instance</param>
        /// <returns>updated Answer</returns>
        [Route("api/Answers/CreateOrUpdate")]
        public IHttpActionResult Post(AnswerDTO answer)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var currentUnit = _db.Units.Find(answer.Unit);
            var currentAssessmentType = answer.AssessmentType;

            var dbSpaDataSet = _db.SPADataSets.SingleOrDefault(x =>
                x.Unit == currentUnit.Oid && x.AssessmentType == currentAssessmentType && x.Framework == currentUnit.PrimaryFramework && x.GCRecord == null);
            if (dbSpaDataSet == null)
            {
                var defaultGrade = _db.Grades.Where(x => x.ShortTitle.Equals(NotReviewedGrade) && x.GCRecord == null)
                    .Select(y => y.OID).FirstOrDefault();
                dbSpaDataSet = new SPADataSet
                {
                    Unit = currentUnit.Oid,
                    Framework = currentUnit.PrimaryFramework.Value,
                    AssessmentType = currentAssessmentType,
                    Grade = defaultGrade,
                    Created = DateTime.Now,
                };

                dbSpaDataSet = _db.SPADataSets.Add(dbSpaDataSet);
            }

            var updatedAnswersList = new List<AnswerDTO>();


            var dbAnswer = answer.OID == 0 ? _db.Answers.FirstOrDefault(x => x.Characteristic == answer.Characteristic && x.SPADataSet.Unit == answer.Unit && x.SPADataSet.AssessmentType == answer.AssessmentType && x.Question == answer.Question) : _db.Answers.Find(answer.OID);

            if (dbAnswer == null)
            {
                dbAnswer = new Answer
                {
                    Question = answer.Question,
                    Choice = answer.Choice,
                    User = answer.User,
                    Characteristic = answer.Characteristic,
                    SPADataSet = dbSpaDataSet,
                    Created = DateTime.Now
                };

                _db.Answers.Add(dbAnswer);

            }
            else
            {
                dbAnswer.Modified = DateTime.Now;
                dbAnswer.Choice = answer.Choice;
                dbAnswer.Question = answer.Question;
                dbAnswer.User = answer.User;
                dbAnswer.Characteristic = answer.Characteristic;
                _db.Entry(dbAnswer).State = EntityState.Modified;
            }

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(dbAnswer.OID))
                    return NotFound();
                throw;
            }
            return Ok(dbAnswer.OID);
        }

        // DELETE: api/Answers(5)
        /// <summary>
        /// NOT IN USE
        /// </summary>
        [Route("api/Answers({key})")]
        public IHttpActionResult Delete(int key)
        {
            var answer = _db.Answers.Find(key);
            if (answer == null) return NotFound();
            //cascade deleting
            foreach (var note in answer.AnswerNotes)
            {
                foreach (var attach in note.AnswerNoteAttachments)
                {
                    _db.AnswerNoteAttachments.Remove(attach);
                }
                _db.AnswerNotes.Remove(note);
            }
            _db.Answers.Remove(answer);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(key)) return NotFound();

                throw;
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        private bool AnswerExists(int key)
        {
            return _db.Answers.Count(e => e.OID == key) > 0;
        }
    }
}
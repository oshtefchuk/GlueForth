using BlueNorth.WebApi.DTOs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Web.Http;
using System.Web.OData;

namespace BlueNorth.WebApi
{
    public class AnswerNotesController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/AnswerNotes/GetList
        /// <summary>
        /// Get AnswerNotes list for current User->Framework->Assessment
        /// </summary>
        /// <returns>AnswerNotes, represented as AnswerNoteFullDTO's</returns>
        [Authorize]
        [Route("api/AnswerNotes/GetList")]
        public IHttpActionResult GetList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).OID;
            var results = new List<AnswerNoteFullDTO>();
            _db.AnswerNotes.Where(x => x.Answer1.DataSet == dataSetOid).ToList().ForEach(x=> results.Add(new AnswerNoteFullDTO(x)));
            return Ok(results);
        }

        // GET: api/AnswerNotes/GetList
        /// <summary>
        /// Get filtered AnswerNotes list for current User->Framework->Assessment
        /// </summary>
        /// <param name="answerNoteFilter">filters paramethers as AnswerNoteFilterDTO</param>
        /// <returns>AnswerNotes, represented as AnswerNoteFullDTO's</returns>
        [Authorize]
        [Route("api/AnswerNotes/GetFilteredList")]
        [HttpPost]
        public IHttpActionResult GetFilteredList(AnswerNoteFilterDTO answerNoteFilter)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).OID;
            var results = new List<AnswerNoteFullDTO>();
            var query = _db.AnswerNotes.Where(x => x.Answer1.DataSet == dataSetOid);
            if (answerNoteFilter.DimensionOid > 0)
            {
                query = query.Where(x => x.Answer1.Characteristic1.Principle1.Dimension == answerNoteFilter.DimensionOid);
            }
            if (answerNoteFilter.PrincipleGroupOid > 0)
            {
                query = query.Where(x => x.Answer1.Characteristic1.PrincipleGroup == answerNoteFilter.PrincipleGroupOid);
            }
            if (answerNoteFilter.PrincipleOid > 0)
            {
                query = query.Where(x => x.Answer1.Characteristic1.Principle == answerNoteFilter.PrincipleOid);
            }
            if (answerNoteFilter.CharacteristicOid > 0)
            {
                query = query.Where(x => x.Answer1.Characteristic == answerNoteFilter.CharacteristicOid);
            }
            query.ToList().ForEach(x => results.Add(new AnswerNoteFullDTO(x)));
            return Ok(results);
        }

        [Authorize]
        [Route("api/AnswerNotes/GetFilterCharacteristicsList")]
        public IHttpActionResult GetFilterCharacteristicsList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).OID;
            var results = _db.AnswerNotes.Where(x => x.Answer1.DataSet == dataSetOid).Select(y => y.Answer1.Characteristic1).Distinct().Select(x => new { x.OID, x.ShortTitle }).ToList();
            return Ok(results);
        }

        [Authorize]
        [Route("api/AnswerNotes/GetFilterPrinciplesList")]
        public IHttpActionResult GetFilterPrinciplesList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).OID;
            var results = _db.AnswerNotes.Where(x => x.Answer1.DataSet == dataSetOid).Select(y=>y.Answer1.Characteristic1.Principle1).Distinct().Select(x => new { x.OID, x.Reference }).ToList();
            return Ok(results);
        }

        [Authorize]
        [Route("api/AnswerNotes/GetFilterPrincipleGroupsList")]
        public IHttpActionResult GetFilterPrincipleGroupsList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).OID;
            var results = _db.AnswerNotes.Where(x => x.Answer1.DataSet == dataSetOid).Select(y => y.Answer1.Characteristic1.PrincipleGroup1).Distinct().Select(x => new { x.OID, x.ShortTitle }).ToList();
            return Ok(results);
        }

        [Authorize]
        [Route("api/AnswerNotes/GetFilterDimensionsList")]
        public IHttpActionResult GetFilterDimensionsList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).OID;
            var results = _db.AnswerNotes.Where(x => x.Answer1.DataSet == dataSetOid).Select(y => y.Answer1.Characteristic1.Principle1.Dimension1).Distinct().Select(x => new { x.OID, x.ShortTitle }).ToList();
            return Ok(results);
        }

        // GET: api/AnswerNotes/GetByQuestionAndCharacteristic
        /// <summary>
        /// Get <code>AnswerNote</code> by OID
        /// </summary>
        /// <param name="questionOid">OID of <code>Question</code></param>
        /// <param name="characteristicOid">OID of <code>Characteristic</code></param>
        /// <returns><code>AnswerNote</code> represented as AnswerNoteDTO</returns>
        [Authorize]
        [Route("api/AnswerNotes/GetByQuestionAndCharacteristic")]
        public IHttpActionResult GetByQuestionId([FromODataUri] int questionOid, [FromODataUri] int characteristicOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).OID;
            var answer = _db.Answers.FirstOrDefault(x =>
                x.Question == questionOid && x.DataSet == dataSetOid && x.Characteristic == characteristicOid);
            if (answer == null)
            {
                answer = new Answer()
                {
                    Characteristic = characteristicOid,
                    Question = questionOid,
                    DataSet = dataSetOid,
                    Modified = DateTime.Now,
                    Created = DateTime.Now,
                    User = user.Oid
                };
                answer = _db.Answers.Add(answer);
                var note = _db.AnswerNotes.Add(new AnswerNote() { Answer1 = answer });
                _db.SaveChanges();
                var res = new AnswerNoteDTO(note);
                return Ok(res);
            }

            var answerNote = _db.AnswerNotes.FirstOrDefault(x => x.Answer == answer.OID);
            if (answerNote == null)
            {
                answerNote = _db.AnswerNotes.Add(new AnswerNote() { Answer1 = answer });
                _db.SaveChanges();
            }
            var result = new AnswerNoteDTO(answerNote);
            return Ok(result);
        }

        // POST: api/AnswerNotes/Update
        /// <summary>
        /// POST Method for AnswerNote creation/update
        /// </summary>
        /// <param name="answerNote"><code>AnswerNoteDTO</code> instance</param>
        /// <returns>updated AnswerNote</returns>
        [Route("api/AnswerNotes/Update")]
        public IHttpActionResult Post(AnswerNoteDTO answerNote)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);


            var dbAnswerNote = _db.AnswerNotes.Find(answerNote.OID);
            if (dbAnswerNote == null) return NotFound();
            dbAnswerNote.Note = answerNote.Note;
            _db.Entry(dbAnswerNote).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_db.AnswerNotes.Count(e => e.OID == dbAnswerNote.OID) == 0) return NotFound();
                throw;
            }
            return Ok(dbAnswerNote.OID);
        }

        // POST: api/AnswerNotes/CreateOrUpdate
        /// <summary>
        /// POST Method for AnswerNote creation/update
        /// </summary>
        /// <param name="answerNoteAttachmentDto"><code>AnswerNoteDTO</code> instance</param>
        /// <returns>updated AnswerNote</returns>
        [Route("api/AnswerNoteAttachments/Create")]
        public IHttpActionResult Post(AnswerNoteAttachmentDTO answerNoteAttachmentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);


            var dbAnswerNoteAttachment = answerNoteAttachmentDto.OID == 0 ? _db.AnswerNoteAttachments.Add(new AnswerNoteAttachment() { AnswerNote = answerNoteAttachmentDto.AnswerNoteOID }) : _db.AnswerNoteAttachments.Find(answerNoteAttachmentDto.OID);

            dbAnswerNoteAttachment.FileData = new FileData()
            {
                Oid = Guid.NewGuid(),
                Content = answerNoteAttachmentDto.File,
                FileName = answerNoteAttachmentDto.FileName,
                size = answerNoteAttachmentDto.FileSize
            };
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_db.AnswerNotes.Count(e => e.OID == dbAnswerNoteAttachment.OID) == 0) return NotFound();
                throw;
            }

            return Ok(dbAnswerNoteAttachment.OID);
        }
        // DELETE: api/AnswerNotes(5)
        /// <summary>
        /// </summary>
        [Route("api/AnswerNotes({key})")]
        public IHttpActionResult Delete(int key)
        {
            var answerNote = _db.AnswerNotes.Find(key);
            if (answerNote == null) return NotFound();

            _db.AnswerNotes.Remove(answerNote);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_db.AnswerNotes.Count(e => e.OID == key) == 0) return NotFound();
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/AnswerNoteAttachments(5)
        /// <summary>
        /// </summary>
        [Route("api/AnswerNoteAttachments({key})")]
        public IHttpActionResult DeleteAnswerNoteAttachment(int key)
        {
            var answerNoteAttachment = _db.AnswerNoteAttachments.Find(key);
            if (answerNoteAttachment == null) return NotFound();

            _db.AnswerNoteAttachments.Remove(answerNoteAttachment);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_db.AnswerNoteAttachments.Count(e => e.OID == key) == 0) return NotFound();
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        /// <summary>
        /// Method for downloading of specific <code>AnswerNoteAttachment</code> attachment
        /// </summary>
        /// <param name="oid">Oid of <code>AnswerNoteAttachment</code></param>
        /// <returns>file stream</returns>
        [HttpGet]
        [Route("api/AnswerNotes/DownloadAttachment({oid})")]
        public HttpResponseMessage DownloadAttachment(int oid)
        {
            var stream = new MemoryStream();
            // processing the stream.

            var item = _db.AnswerNoteAttachments.Find(oid);
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(item.FileData.Content)
            };
            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = item.FileData.FileName
                };
            result.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }
    }
}
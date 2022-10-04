using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using BlueNorth.WebApi.DTOs;

namespace BlueNorth.WebApi.Controllers
{
    public class PrimaryDataFieldNotesController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/PrimaryDataFieldNotes
        /// <summary>
        /// Returns list of all PrimaryDataFieldNotes. <code>PrimaryDataFieldNote</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all PrimaryDataFieldNotes</returns>
        public IQueryable<PrimaryDataFieldNote> GetPrimaryDataFieldNotes()
        {
            return _db.PrimaryDataFieldNotes;
        }

        // GET: api/PrimaryDataFieldNotes/5
        /// <summary>
        /// Get <code>PrimaryDataFieldNote</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>PrimaryDataFieldNote</code></param>
        /// <returns><code>PrimaryDataFieldNote</code> represented as root element, withoud referenced entities</returns>
        [ResponseType(typeof(PrimaryDataFieldNote))]
        [Route("api/PrimaryDataFieldNotes({id})")]
        public IHttpActionResult GetPrimaryDataFieldNote(int id)
        {
            var PrimaryDataFieldNote = _db.PrimaryDataFieldNotes.Find(id);
            if (PrimaryDataFieldNote == null) return NotFound();

            return Ok(PrimaryDataFieldNote);
        }

        /// <summary>
        /// Returns list of filtered PrimaryDataFieldNotes. <code>PrimaryDataFieldNote</code> represented as PrimaryDataFieldNoteDTO
        /// </summary>
        /// <param name="filter">IndicatorIndicatorDataSetsDTO instance</param>
        /// <returns>list of all PrimaryDataFieldNotes repsesented as PrimaryDataFieldNoteDTO's</returns>
        [HttpPost]
        [Route("api/PrimaryDataFieldNotes/GetListByDataFieldAndDataSet")]
        public IHttpActionResult GetPrimaryDataFieldNotesListByIndicator(IndicatorIndicatorDataSetsDTO filter)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var dtoNotesList = new List<PrimaryDataFieldNoteDTO>();
            foreach (var dataSetoid in filter.IndicatorDataSetOidList)
            {
                var PrimaryDataFieldNotes = _db.PrimaryDataFieldNotes
                    .Where(x => x.PrimaryDataField == filter.IndicatorOid && x.DataSet == dataSetoid).ToList();
                var dbDataSet = _db.IndicatorDataSets.Find(dataSetoid);

                dtoNotesList.Add(new PrimaryDataFieldNoteDTO(filter.IndicatorOid, dbDataSet, PrimaryDataFieldNotes));
            }

            return Ok(dtoNotesList.OrderBy(x => x.PeriodFrom));
        }

        // POST: api/PrimaryDataFieldNotes
        /// <summary>
        /// POST Method for PrimaryDataFieldNote creation/update
        /// </summary>
        /// <param name="productionArea"><code>PrimaryDataFieldNote</code> instance</param>
        /// <returns>Oid of created/updated PrimaryDataFieldNote</returns>
        [Authorize]
        [Route("api/PrimaryDataFieldNotes/CreateOrUpdate")]
        public IHttpActionResult PostPrimaryDataFieldNote(PrimaryDataFieldNote PrimaryDataFieldNote)
        {
            var userName = ((ClaimsPrincipal) User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var dbPrimaryDataFieldNote = _db.PrimaryDataFieldNotes.Find(PrimaryDataFieldNote.OID);
            if (dbPrimaryDataFieldNote == null)
            {
                PrimaryDataFieldNote.Created = DateTime.Now;
                PrimaryDataFieldNote.User = user.Oid;
                dbPrimaryDataFieldNote = _db.PrimaryDataFieldNotes.Add(PrimaryDataFieldNote);
            }
            else
            {
                dbPrimaryDataFieldNote.Modified = DateTime.Now;
                dbPrimaryDataFieldNote.User = user.Oid;
                dbPrimaryDataFieldNote.Note = PrimaryDataFieldNote.Note;
            }

            _db.SaveChanges();

            return Ok(dbPrimaryDataFieldNote.OID);
        }

        /// <summary>
        /// NOT IN USE
        /// </summary>
        // PUT: api/PrimaryDataFieldNotes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPrimaryDataFieldNote(int id, PrimaryDataFieldNote PrimaryDataFieldNote)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != PrimaryDataFieldNote.OID) return BadRequest();

            _db.Entry(PrimaryDataFieldNote).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrimaryDataFieldNoteExists(id))
                    return NotFound();
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/PrimaryDataFieldNotes/5
        /// <summary>
        /// NOT IN USE
        /// </summary>
        [ResponseType(typeof(PrimaryDataFieldNote))]
        [HttpDelete]
        public IHttpActionResult DeletePrimaryDataFieldNote(int id)
        {
            var PrimaryDataFieldNote = _db.PrimaryDataFieldNotes.Find(id);
            if (PrimaryDataFieldNote == null) return NotFound();

            _db.PrimaryDataFieldNotes.Remove(PrimaryDataFieldNote);
            _db.SaveChanges();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        private bool PrimaryDataFieldNoteExists(int id)
        {
            return _db.PrimaryDataFieldNotes.Count(e => e.OID == id) > 0;
        }
    }
}
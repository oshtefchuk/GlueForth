using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.OData;

namespace BlueNorth.WebApi
{
    [ApiExplorerSettings(IgnoreApi = false)]
    public class CountriesController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: odata/Countries
        /// <summary>
        /// Returns list of all Countries. Country represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Countries</returns>
        public IEnumerable<Country> GetCountries()
		{
			var countries = _db.Countries.ToList().Select(CloneCountry).Where(cloned => cloned != null).OrderBy(x => x.Name);

		    return countries;
	    }

	    private Country CloneCountry(Country country)
	    {
		    if (country.GCRecord != null) return null;
		    return (Country)_db.Entry(country).CurrentValues.ToObject();
	    }

        // GET: odata/Countries(5)
        /// <summary>
        /// Get Country by OID
        /// </summary>
        /// <param name="key">OID of Country</param>
        /// <returns>Country represented as root element, withoud referenced entities</returns>
        [Route("api/Countries({key})")]
        public IHttpActionResult GetCountry(Guid key)
        {
			var country = _db.Countries.SingleOrDefault(x => x.Oid == key);
	        var cloned = CloneCountry(country);
	        return cloned == null ? (IHttpActionResult)NotFound() : Ok(cloned);
		}

        // POST: odata/Countries
        /// <summary>
        /// Auto-generated Post method. NOT IN USE
        /// </summary>
        public IHttpActionResult Post(Country country)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _db.Countries.Add(country);
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

            return Ok(country);
        }

        // PATCH: odata/Countries(5)
        /// <summary>
        /// Auto-generated Patch method. NOT IN USE
        /// </summary>
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] Guid key, Delta<Country> patch)
        {
            Validate(patch.GetInstance());

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var country = _db.Countries.Find(key);
            if (country == null) return NotFound();

            patch.Patch(country);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CountryExists(key))
                    return NotFound();
                throw;
            }

            return Ok(country);
        }

        // DELETE: odata/Countries(5)
        /// <summary>
        /// Auto-generated Delete method. NOT IN USE
        /// </summary>
        public IHttpActionResult Delete([FromODataUri] Guid key)
        {
            var country = _db.Countries.Find(key);
            if (country == null) return NotFound();

            _db.Countries.Remove(country);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CountryExists(key))
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

        private bool CountryExists(Guid key)
        {
            return _db.Countries.Count(e => e.Oid == key) > 0;
        }
    }
}
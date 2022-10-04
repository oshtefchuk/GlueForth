using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using BlueNorth.WebApi.Helpers;

namespace BlueNorth.WebApi
{
	[ApiExplorerSettings(IgnoreApi = false)]
	public class SuppliersController : ApiController
	{
		private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/Suppliers
        /// <summary>
        /// Returns list of all Suppliers. Supplier represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Suppliers</returns>
        public IEnumerable<Supplier> GetSuppliers()
		{
			var suppliersList = _db.Suppliers.ToList().Select(CloneSupplier).Where(cloned => cloned != null);

			return suppliersList;
		}

		private Supplier CloneSupplier(Supplier supplier)
		{
			if (supplier.Version1?.Deleted == true || supplier.GCRecord != null) return null;
			return (Supplier)_db.Entry(supplier).CurrentValues.ToObject();
		}

        // GET: api/Suppliers(5)
        /// <summary>
        /// Get Supplier by OID
        /// </summary>
        /// <param name="key">OID of Supplier</param>
        /// <returns>Supplier represented as root element, withoud referenced entities</returns>		
        [Route("api/Suppliers({key})")]
		public IHttpActionResult GetSupplier(int key)
		{
			var supplier = _db.Suppliers.SingleOrDefault(x => x.OID == key);
			var cloned = CloneSupplier(supplier);
			return cloned == null ? (IHttpActionResult)NotFound() : Ok(cloned);
		}

        // POST: api/Suppliers
        /// <summary>
        /// Auto-generated Post method. NOT IN USE
        /// </summary>
        [Route("api/Suppliers/CreateOrUpdate")]
		[Authorize]
		public IHttpActionResult Post(Supplier supplier)
		{
			if (!ModelState.IsValid) return BadRequest(ModelState);

			var userName = ((ClaimsPrincipal)User).Claims.First().Value;
			var user = _db.Users.FirstOrDefault(x =>
				x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

			if (user == null) return Unauthorized();

			var dbSupplier = new Supplier();

			var isNewEntity = supplier.OID == 0;
			var isDefaultPropertyChanged = false;

			if (!isNewEntity)
			{
				dbSupplier = _db.Suppliers.Find(supplier.OID);

				if (dbSupplier != null) isDefaultPropertyChanged = !dbSupplier.Title.Equals(supplier.Title);
			}

			if (isNewEntity || isDefaultPropertyChanged)
				try
				{
					ValidateEntry(supplier.Title);
				}
				catch (ArgumentException e)
				{
					return BadRequest(e.Message);
				}

			var defaultRetailer = _db.Retailers.FirstOrDefault();
			if (defaultRetailer == null) return BadRequest("Default retailer is not exists. Please create");

			var version = isNewEntity
				? VersionHelper.CreateVersion(_db, user.Oid)
				: VersionHelper.EditVersion(_db, user.Oid, dbSupplier?.Version1);

			if (isNewEntity)
			{
				// copy values without reference to avoid StackOverflowException when Version will be added
				dbSupplier.Title = supplier.Title;
				dbSupplier.ShortTitle = supplier.ShortTitle;
				dbSupplier.Description = supplier.Description;
				dbSupplier.Version1 = version;
				//

				_db.Suppliers.Add(dbSupplier);
				_db.SupplierRetailers_RetailerSuppliers.Add(new SupplierRetailers_RetailerSuppliers
				{
					OID = supplier.OID,
					Supplier = dbSupplier,
					Retailer = defaultRetailer
				});
			}
			else
			{
				if (dbSupplier == null)
					return BadRequest("Entity not found in DataBase");

				_db.Entry(dbSupplier).CurrentValues.SetValues(supplier);
				dbSupplier.Version1 = version;
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
			supplier.OID = dbSupplier.OID;
			return Ok(supplier);
		}

        // DELETE: api/Suppliers(5)
        /// <summary>
        /// Auto-generated Delete method. NOT IN USE
        /// </summary>
        [Route("api/Suppliers({key})")]
		[Authorize]
		public IHttpActionResult Delete(int key)
		{
			var userName = ((ClaimsPrincipal)User).Claims.First().Value;
			var user = _db.Users.FirstOrDefault(x =>
				x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

			if (user == null) return Unauthorized();

			var supplier = _db.Suppliers.Find(key);
			if (supplier == null) return NotFound();

			var dbVersion = _db.Versions.Find(supplier.Version);
			if (dbVersion != null)
				supplier.Version1 = VersionHelper.EditVersion(_db, user.Oid, dbVersion, true);
			try
			{
				_db.SaveChanges();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!SupplierExists(key))
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

		private void ValidateEntry(string supplierTitle)
		{
			if (string.IsNullOrEmpty(supplierTitle)) throw new ArgumentException(@"The title is empty", supplierTitle);

			var isExists = _db.Suppliers.Any(x =>
				x.Title.Equals(supplierTitle, StringComparison.InvariantCultureIgnoreCase));
			if (isExists)
				throw new ArgumentException(@"Supplier with this title already exists", supplierTitle);
		}

		private bool SupplierExists(int key)
		{
			return _db.Suppliers.Count(e => e.OID == key) > 0;
		}
	}
}
using System;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.OData;


namespace GlueForth.WebApi
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.OData.Builder;
    using System.Web.OData.Extensions;
    using BlueNorth.WebApi;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Unit>("Unit");
    builder.EntitySet<Version>("Version");
    config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [ApiExplorerSettings(IgnoreApi = false)]
    public class UnitTypesController : ODataController
    {
        private BlueNorthEntities db = new BlueNorthEntities();

        // GET: odata/UnitTypes
        /// <summary>
        /// Returns list of all UnitTypes. <code>UnitType</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all UnitTypes</returns>
        [EnableQuery]
        public IQueryable<UnitType> GetUnitTypes()
        {
            return db.UnitTypes.Where(x=>x.GCRecord == null);
        }

        // GET: odata/UnitTypes(5)
        /// <summary>
        /// Get <code>UnitType</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>UnitType</code></param>
        /// <returns><code>UnitType</code> represented as root element, withoud referenced entities</returns>
        [EnableQuery]
        public SingleResult<UnitType> GetUnitType([FromODataUri] Int32 key)
        {
            return SingleResult.Create(db.UnitTypes.Where(unittype => unittype.OID == key));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace GlueForth.WebApi
{
    public class FrameworkController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: odata/Frameworks
        /// <summary>
        /// Returns list of all Frameworks. <code>Framework</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Frameworks</returns>
        public IEnumerable<Framework> GetFrameworks()
        {
            return _db.Frameworks.Select(CloneFramework).Where(cloned => cloned != null);
        }

        private Framework CloneFramework(Framework Framework)
        {
            if (Framework.GCRecord != null) return null;
            return (Framework) _db.Entry(Framework).CurrentValues.ToObject();
        }

        // GET: odata/Frameworks(5)
        /// <summary>
        /// Get <code>Framework</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>Framework</code></param>
        /// <returns><code>Framework</code> represented as root element, withoud referenced entities</returns>
        [Route("api/Frameworks({key})")]
        public Framework GetFramework(int key)
        {
            return CloneFramework(_db.Frameworks.SingleOrDefault(Framework => Framework.OID == key));
        }

        /// <summary>
        /// Returns list of Commodity-related Frameworks. <code>Framework</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <param name="commodityOid">Oid of Commodity</param>
        /// <returns>list of Frameworks</returns>
        [Route("api/Frameworks/GetByCommodity({commodityOid})")]
        public IEnumerable<Framework> GetByCommodity(int commodityOid)
        {
            return _db.Frameworks.Where(x=>x.FrameworkFrameworks_CommodityCommodities.Any(y=>y.Commodities == commodityOid)).Select(CloneFramework).Where(cloned => cloned != null);
        }
    }
}
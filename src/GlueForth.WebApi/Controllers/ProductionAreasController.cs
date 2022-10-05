using GlueForth.WebApi.DTOs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;

namespace GlueForth.WebApi.Controllers
{
    public class ProductionAreasController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/ProductionAreas
        /// <summary>
        /// Returns list of all ProductionAreas. <code>ProductionArea</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all ProductionAreas</returns>
        public IEnumerable<ProductionArea> GetProductionAreas()
        {
            return _db.ProductionAreas.Select(CloneProductionArea);
        }

        // GET: api/ProductionAreas/5
        /// <summary>
        /// Get <code>ProductionArea</code> by OID
        /// </summary>
        /// <param name="id">OID of <code>ProductionArea</code></param>
        /// <returns><code>ProductionArea</code> represented as root element, withoud referenced entities</returns>
        [ResponseType(typeof(ProductionArea))]
        [Route("api/ProductionAreas({id})")]
        public IHttpActionResult GetProductionArea(int id)
        {
            var productionArea = _db.ProductionAreas.Find(id);
            if (productionArea == null) return NotFound();

            return Ok(CloneProductionArea(productionArea));
        }

        private ProductionArea CloneProductionArea(ProductionArea productionArea)
        {
            return (ProductionArea)_db.Entry(productionArea).CurrentValues.ToObject();
        }

        // POST: api/ProductionAreas
        /// <summary>
        /// POST Method for ProductionArea creation/update
        /// </summary>
        /// <param name="productionArea"><code>ProductionAreaDTO</code> instance</param>
        /// <returns>updated ProductionArea</returns>
        [ResponseType(typeof(ProductionArea))]
        [Route("api/ProductionAreas/CreateOrUpdate")]
        public IHttpActionResult PostProductionArea(ProductionAreaDTO productionArea)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var isNewEntity = productionArea.OID == 0;

            var dbProductionArea = new ProductionArea();

            if (isNewEntity)
            {
                var primaryDataValue = _db.PrimaryDataValues.FirstOrDefault(x => x.DataSet == productionArea.DataSetOid && x.PrimaryDataField == productionArea.PrimaryDataFieldOid && x.GCRecord == null);
                if (primaryDataValue == null)
                {
                    var ds = _db.IndicatorDataSets.Find(productionArea.DataSetOid);
                    var primaryData = _db.PrimaryDataFields.Find(productionArea.PrimaryDataFieldOid);
                    primaryDataValue = _db.PrimaryDataValues.Add(new PrimaryDataValue() { IndicatorDataSet = ds, DataSet = productionArea.DataSetOid, PrimaryDataField = productionArea.PrimaryDataFieldOid, PrimaryDataField1 = primaryData });
                }
                dbProductionArea.PrimaryDataValue1 = primaryDataValue;
                dbProductionArea.Created = DateTime.Now;
                _db.ProductionAreas.Add(dbProductionArea);
                //1246
                //var datasets = _db.IndicatorDataSets.Where(x => x.Framework == primaryDataValue.IndicatorDataSet.Framework && x.Unit == primaryDataValue.IndicatorDataSet.Unit && x.OID != primaryDataValue.DataSet).ToList(); //find other periods datasets
                //foreach (var ds in datasets)
                //{
                //    var pdv = primaryDataValue.PrimaryDataField1.PrimaryDataValues.FirstOrDefault(x => x.DataSet == ds.OID);
                //    if (pdv == null)
                //    {
                //        pdv = _db.PrimaryDataValues.Add(new PrimaryDataValue() { DataSet = ds.OID, PrimaryDataField = productionArea.PrimaryDataFieldOid });
                //    }
                //    var newArea = new ProductionArea() { Name = productionArea.Name, PrimaryDataValue1 = pdv, DrawingData = productionArea.DrawingData, Size = productionArea.Size, Created = DateTime.Now };
                //    _db.ProductionAreas.Add(newArea);
                //}
            }
            else
            {
                dbProductionArea = _db.ProductionAreas.Find(productionArea.OID);
                if (dbProductionArea == null)
                    return BadRequest("Entity not found in DataBase");

                dbProductionArea.Modified = DateTime.Now;
                _db.Entry(dbProductionArea).State = EntityState.Modified;
            }
            dbProductionArea.Name = productionArea.Name;
            dbProductionArea.DrawingData = productionArea.DrawingData;
            dbProductionArea.Size = productionArea.Size;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductionAreaExists(dbProductionArea.OID))
                    return NotFound();
                throw;
            }
            return Ok(CloneProductionArea(dbProductionArea));
        }


        // DELETE: api/ProductionAreas/5
        /// <summary>
        /// DELETE method for ProductionArea
        /// </summary>
        /// <param name="id">Oid of ProductionArea</param>
        /// <returns></returns>
        [ResponseType(typeof(ProductionArea))]
        [Route("api/ProductionAreas({id})")]
        public IHttpActionResult DeleteProductionArea(int id)
        {
            var productionArea = _db.ProductionAreas.Find(id);
            if (productionArea == null) return NotFound();

            _db.ProductionAreas.Remove(productionArea);
            _db.SaveChanges();

            return Ok(productionArea);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        private bool ProductionAreaExists(int id)
        {
            return _db.ProductionAreas.Count(e => e.OID == id) > 0;
        }
    }
}
using GlueForth.WebApi.DTOs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.OData;

namespace GlueForth.WebApi.Controllers
{
    /// <summary>
    /// Methods for Indicators capturine and Map Area tool pages
    /// </summary>
    public class PrimaryDataValuesController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/PrimaryDataValues
        /// <summary>
        /// Returns list of all PrimaryDataValues. PrimaryDataValue represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all PrimaryDataValues</returns>
        public IEnumerable<PrimaryDataValue> GetPrimaryDataValues()
        {
            return _db.PrimaryDataValues.Select(ClonePrimaryDataValue);
        }

        // GET: api/PrimaryDataValues/5
        /// <summary>
        /// Get PrimaryDataValue by OID
        /// </summary>
        /// <param name="key">OID of PrimaryDataValue</param>
        /// <returns>PrimaryDataValue represented as root element, withoud referenced entities</returns>
        [ResponseType(typeof(PrimaryDataValue))]
        [Route("api/PrimaryDataValues({id})")]
        public IHttpActionResult GetPrimaryDataValue(int id)
        {
            var primaryDataValue = _db.PrimaryDataValues.Find(id);
            if (primaryDataValue == null) return NotFound();

            return Ok(ClonePrimaryDataValue(primaryDataValue));
        }

        private PrimaryDataValue ClonePrimaryDataValue(PrimaryDataValue primaryDataValue)
        {
            return (PrimaryDataValue)_db.Entry(primaryDataValue).CurrentValues.ToObject();
        }

        //[Route("api/PrimaryDataValues/ByPrincipleGroupAndDataset({principleGroupOid}, {dataSetOid})")]
        //[Authorize]
        //public IHttpActionResult GetByPrincipleGroupAndDataset(int principleGroupOid,
        //    int dataSetOid)
        //{
        //    var userName = ((ClaimsPrincipal)User).Claims.First().Value;
        //    var user = _db.Users.FirstOrDefault(x =>
        //        x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

        //    if (user == null) return Unauthorized();

        //    var currentUnit = user.Unit;
        //    if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");
        //    var indicators = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.Select(x => x.Indicator).Where(y => y.Characteristic1.PrincipleGroup == principleGroupOid);
        //    var datafileds = indicators.SelectMany(x => x.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators).Select(x => x.PrimaryDataField).Distinct();
        //    return Ok(datafileds);
        //}

        /// <summary>
        /// <code>CommodityPDValue</code> - it's <code>Commodity</code>-dependent <code>PrimariDataValue</code>. So, for one <code>PrimaryDataField</code> we able to have many <code>CommodityPDValue</code>'s - for each <code>Unit Commodity</code>.
        /// This POST Method for creation of new or update of exsited CommodityPDValue.
        /// If CommodityPDValue for specified Commodity + PrimaryDataField + IndicatorDataSet exists - it will be updated, otherwise - created
        /// Also, here we have creation of PrimaryDataValue - if it's not exists for current PrimaryDataField + IndicatorDataSet
        /// </summary>
        /// <param name="commodityPDValue"><code>CommodityPVValueDTO</code> instance</param>
        /// <returns>OID of created/updated entity</returns>        
        [ResponseType(typeof(CommodityPDValue))]
        [Route("api/CommodityPDValue/CreateOrUpdate")]
        public IHttpActionResult PostCommodityPDValue(CommodityPVValueDTO commodityPDValue)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var dbCommodityDataValue = _db.CommodityPDValues.FirstOrDefault(x => x.Commodity == commodityPDValue.CommodityOid 
            && x.PrimaryDataValue1.PrimaryDataField == commodityPDValue.PrimaryDataFieldOid 
            && x.PrimaryDataValue1.DataSet == commodityPDValue.DataSetOid);

            if (dbCommodityDataValue == null)
            {
                var pDValue = _db.PrimaryDataValues.FirstOrDefault(x => x.PrimaryDataField == commodityPDValue.PrimaryDataFieldOid 
                && x.DataSet == commodityPDValue.DataSetOid);
                if (pDValue == null)
                {
                    var dbPrimaryDataValue = new PrimaryDataValue();
                    dbPrimaryDataValue.PrimaryDataField = commodityPDValue.PrimaryDataFieldOid;
                    dbPrimaryDataValue.DataSet = commodityPDValue.DataSetOid;
                    dbPrimaryDataValue.Value = commodityPDValue.Value.ToString();
                    dbPrimaryDataValue.Created = DateTime.Now;
                    pDValue = _db.PrimaryDataValues.Add(dbPrimaryDataValue);
                }
                dbCommodityDataValue = new CommodityPDValue();
                dbCommodityDataValue.PrimaryDataValue1 = pDValue;
                dbCommodityDataValue.Commodity = commodityPDValue.CommodityOid;
                dbCommodityDataValue.Value = commodityPDValue.Value;
                dbCommodityDataValue.Created = DateTime.Now;
                _db.CommodityPDValues.Add(dbCommodityDataValue);
            }
            else
            {
                dbCommodityDataValue.Modified = DateTime.Now;
                dbCommodityDataValue.Value = commodityPDValue.Value;
                _db.Entry(dbCommodityDataValue).State = EntityState.Modified;
            }

            try
            {
                _db.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return Ok(dbCommodityDataValue.OID);
        }

        /// <summary>
        /// <code>CommodityPDMValue</code> - it's <code>Commodity</code>-dependent <code>PrimaryDataMonthValue</code>. So, for one <code>PrimaryDataField</code> we able to have many <code>CommodityPDMValue</code>'s - for each <code>Unit Commodity</code> and each Month.
        /// This POST Method for creation of new or update of exsited CommodityPDMValue.
        /// If CommodityPDMValue for specified Commodity + PrimaryDataValue + MonthNumber exists - it will be updated, otherwise - created
        /// Also, here we have creation of PrimaryDataMonthValue - if it's not exists for current PrimaryDataValue + MonthNumber
        /// </summary>
        /// <param name="commodityPDMValue"><code>CommodityPDMValueDTO</code> instance</param>
        /// <returns>OID of created/updated entity</returns>        
        [ResponseType(typeof(CommodityPDMValue))]
        [Route("api/CommodityPDMValue/CreateOrUpdate")]
        public IHttpActionResult PostCommodityPDMValue(CommodityPDMValueDTO commodityPDMValue)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var dbCommodityDataValue = _db.CommodityPDMValues.FirstOrDefault(x => x.Commodity == commodityPDMValue.CommodityOid
            && x.PrimaryDataMonthValue1.MonthNumber == commodityPDMValue.MonthNumber
            && x.PrimaryDataMonthValue1.PrimaryDataValue == commodityPDMValue.PrimaryDataValueOid);

            if (dbCommodityDataValue == null)
            {
                var pDValue = _db.PrimaryDataMonthValues.FirstOrDefault(x => x.PrimaryDataValue == commodityPDMValue.PrimaryDataValueOid
                && x.MonthNumber == commodityPDMValue.MonthNumber);
                if (pDValue == null)
                {
                    var dbPrimaryDataValue = new PrimaryDataMonthValue();
                    dbPrimaryDataValue.PrimaryDataValue = commodityPDMValue.PrimaryDataValueOid;
                    dbPrimaryDataValue.MonthNumber = commodityPDMValue.MonthNumber;
                    dbPrimaryDataValue.Value = commodityPDMValue.Value.ToString();
                    dbPrimaryDataValue.Created = DateTime.Now;
                    pDValue = _db.PrimaryDataMonthValues.Add(dbPrimaryDataValue);
                }
                dbCommodityDataValue = new CommodityPDMValue();
                dbCommodityDataValue.PrimaryDataMonthValue1 = pDValue;
                dbCommodityDataValue.Commodity = commodityPDMValue.CommodityOid;
                dbCommodityDataValue.Value = commodityPDMValue.Value;
                dbCommodityDataValue.Created = DateTime.Now;
                _db.CommodityPDMValues.Add(dbCommodityDataValue);
            }
            else
            {
                dbCommodityDataValue.Modified = DateTime.Now;
                dbCommodityDataValue.Value = commodityPDMValue.Value;
                _db.Entry(dbCommodityDataValue).State = EntityState.Modified;
            }

            try
            {
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok(dbCommodityDataValue.OID);
        }

        /// <summary>
        /// GET Method for getting list of monthly values. 
        /// </summary>
        /// <param name="primaryDataValueOids">Array of </param>
        /// <returns>list of updated <code>PrimaryDataValue</code></returns>
        [HttpPost]
        [Route("api/PrimaryDataMonthValues/GetByPrimaryDataValueOid")]
        public IHttpActionResult GetByPrimaryDataValueOid(List<int> primaryDataValueOids)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var dbPrimaryDataValue = _db.PrimaryDataValues.Find(primaryDataValueOids.First());
            var res = new PrimaryDataMonthValuesDTO(dbPrimaryDataValue.PrimaryDataField1, primaryDataValueOids.ToArray());
            return Ok(res);
        }

        // Primary data value for specific commodity & month
        [HttpPost]
        [Route("api/PrimaryDataMonthValues/GetByCommodityPrimaryDataValueOid")]
        public IHttpActionResult GetByCommodityPrimaryDataValueOid([FromODataUri] int primaryDataValueOid, [FromODataUri] int commodityOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var dbPrimaryDataValue = _db.PrimaryDataValues.Find(primaryDataValueOid);
            var dbComodityDataValue = _db.Commodities.Find(commodityOid);
            var res = new CommodityPrimaryDataMonthValuesDTO(dbPrimaryDataValue.PrimaryDataField1, primaryDataValueOid, dbComodityDataValue, commodityOid);
            return Ok(res);
        }

        // POST: api/PrimaryDataValues
        /// <summary>
        /// POST Method for batch creation/update of <code>PrimaryDataValue</code> list. For each list elenement - if OID == 0 - creation, otherwise - update
        /// </summary>
        /// <param name="primaryDataValues">list of <code>PrimaryDataValue</code> for creation/update</param>
        /// <returns>list of updated <code>PrimaryDataValue</code></returns>
        [ResponseType(typeof(PrimaryDataValue))]
        [Route("api/PrimaryDataMonthValues/CreateOrUpdate")]
        public IHttpActionResult PostPrimaryDataMonthValue(PrimaryDataMonthValue primaryDataValue)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var isNewEntity = primaryDataValue.OID == 0;

            var dbPrimaryDataValue = _db.PrimaryDataMonthValues.FirstOrDefault(x=>x.GCRecord  == null 
            && x.PrimaryDataValue == primaryDataValue.PrimaryDataValue && x.MonthNumber == primaryDataValue.MonthNumber);

            if (dbPrimaryDataValue == null)
            {
                dbPrimaryDataValue = new PrimaryDataMonthValue();
                dbPrimaryDataValue.PrimaryDataValue = primaryDataValue.PrimaryDataValue;
                dbPrimaryDataValue.MonthNumber = primaryDataValue.MonthNumber;
                dbPrimaryDataValue.Value = primaryDataValue.Value;
                dbPrimaryDataValue.Created = DateTime.Now;
                _db.PrimaryDataMonthValues.Add(dbPrimaryDataValue);
            }
            else
            {
                dbPrimaryDataValue.Modified = DateTime.Now;
                dbPrimaryDataValue.Value = primaryDataValue.Value;
                _db.Entry(dbPrimaryDataValue).State = EntityState.Modified;
            }
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrimaryDataValueExists(dbPrimaryDataValue.OID))
                    return NotFound();
                throw;
            }

            return Ok(primaryDataValue);
        }

        //[ResponseType(typeof(CommodityPDMValue))]
        //[Route("api/CommodityPDMValues/CreateOrUpdate")]
        //public IHttpActionResult PostCommodityPDMValue(CommodityPVValueDTO commodityPDValue)
        //{
        //    if (!ModelState.IsValid) return BadRequest(ModelState);

        //    var dbCommodityPrimaryDataValue = _db.CommodityPDMValues.FirstOrDefault(x => x.GCRecord == null
        //    && x.Commodity == commodityPDValue.CommodityOid);

        //    if (dbCommodityPrimaryDataValue == null)
        //    {
        //        dbCommodityPrimaryDataValue = new CommodityPDMValue();
        //        dbCommodityPrimaryDataValue.Created = DateTime.Now;
        //        _db.CommodityPDMValues.Add(dbCommodityPrimaryDataValue);
        //    }
        //    else
        //    {
        //        dbCommodityPrimaryDataValue.Modified = DateTime.Now;
        //        _db.Entry(dbCommodityPrimaryDataValue).State = EntityState.Modified;
        //    }
        //    try
        //    {
        //        _db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!CommodityPrimaryDataValueExists(dbCommodityPrimaryDataValue.OID))
        //            return NotFound();
        //        throw;
        //    }
        //    return Ok(dbCommodityPrimaryDataValue);
        //}

        // POST: api/PrimaryDataValues
        /// <summary>
        /// POST Method for batch creation/update of <code>PrimaryDataValue</code> list. For each list elenement - if OID == 0 - creation, otherwise - update
        /// </summary>
        /// <param name="primaryDataValues">list of <code>PrimaryDataValue</code> for creation/update</param>
        /// <returns>list of updated <code>PrimaryDataValue</code></returns>
        [ResponseType(typeof(PrimaryDataValue))]
        [Route("api/PrimaryDataValues/CreateOrUpdate")]
        public IHttpActionResult PostPrimaryDataValue(List<PrimaryDataValue> primaryDataValues)
        {
            if (!ModelState.IsValid || primaryDataValues.Count == 0) return BadRequest(ModelState);

            foreach (var val in primaryDataValues)
            {
                var isNewEntity = val.OID == 0;

                var dbPrimaryDataValue = new PrimaryDataValue();

                if (isNewEntity)
                {
                    dbPrimaryDataValue.PrimaryDataField = val.PrimaryDataField;
                    dbPrimaryDataValue.DataSet = val.DataSet;
                    dbPrimaryDataValue.Value = val.Value;
                    dbPrimaryDataValue.Created = DateTime.Now;

                    _db.PrimaryDataValues.Add(dbPrimaryDataValue);
                }
                else
                {
                    dbPrimaryDataValue = _db.PrimaryDataValues.Find(val.OID);
                    if (dbPrimaryDataValue == null)
                        return BadRequest("Entity not found in DataBase");

                    dbPrimaryDataValue.Modified = DateTime.Now;

                    foreach (var fromProp in typeof(PrimaryDataValue).GetProperties())
                    {
                        var toProp = typeof(PrimaryDataValue).GetProperty(fromProp.Name);
                        var toValue = toProp.GetValue(val, null);
                        if (toValue != null)
                        {
                            fromProp.SetValue(dbPrimaryDataValue, toValue, null);
                        }
                    }
                    _db.Entry(dbPrimaryDataValue).State = EntityState.Modified;
                }

                try
                {
                    _db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PrimaryDataValueExists(dbPrimaryDataValue.OID))
                        return NotFound();
                    throw;
                }
            }

            return Ok(primaryDataValues);
        }

        // POST: api/PrimaryDataValues
        /// <summary>
        /// POST Method for creation/update of <code>PrimaryDataFieldUserEditMode</code>. if <code>PrimaryDataFieldUserEditMode</code> of specified PrimaryDataField and current User exists - updates, otherwise - creates
        /// </summary>
        /// <param name="primaryDataFieldUserEditMode"><code>PrimaryDataFieldUserEditMode</code></param>
        /// <returns>200 status - if succeeded</returns>
        [HttpPost]
        [Route("api/PrimaryDataFieldUserEditMode/CreateOrUpdate")]
        [Authorize]
        public IHttpActionResult PostPrimaryDataFieldUserEditMode(PrimaryDataFieldUserEditMode primaryDataFieldUserEditMode)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            var dbPrimaryDataValue = _db.PrimaryDataFieldUserEditModes.FirstOrDefault(x => x.PrimaryDataField == primaryDataFieldUserEditMode.PrimaryDataField && x.User == user.Oid && x.Commodity == primaryDataFieldUserEditMode.Commodity);
            if (dbPrimaryDataValue == null)
            {//new
                primaryDataFieldUserEditMode.User = user.Oid;
                dbPrimaryDataValue = _db.PrimaryDataFieldUserEditModes.Add(primaryDataFieldUserEditMode);
            }
            else
                _db.Entry(dbPrimaryDataValue).State = EntityState.Modified;
            dbPrimaryDataValue.AreaSizeMode = primaryDataFieldUserEditMode.AreaSizeMode;
            dbPrimaryDataValue.PeriodDataMode = primaryDataFieldUserEditMode.PeriodDataMode;
            _db.SaveChanges();
            return Ok();
        }

        // POST: api/PrimaryDataValues
        /// <summary>
        /// POST Method for update of <code>PrimaryDataValue</code> list
        /// </summary>
        /// <param name="primaryDataValues"><code>PrimaryDataValue</code> list for update</param>
        /// <returns>updated <code>PrimaryDataValue</code> list</returns>
        [ResponseType(typeof(PrimaryDataValue))]
        [Route("api/PrimaryDataValues/UpdateValue")]
        public IHttpActionResult UpdateValue(List<PrimaryDataValue> primaryDataValues)
        {
            if (!ModelState.IsValid || primaryDataValues.Count == 0) return BadRequest(ModelState);

            foreach (var val in primaryDataValues)
            {
                var dbPrimaryDataValue = _db.PrimaryDataValues.Find(val.OID);
                if (dbPrimaryDataValue == null)
                    return BadRequest("Entity not found in DataBase");
                dbPrimaryDataValue.Value = val.Value;
                dbPrimaryDataValue.Modified = DateTime.Now;

                _db.Entry(dbPrimaryDataValue).State = EntityState.Modified;

                try
                {
                    _db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PrimaryDataValueExists(dbPrimaryDataValue.OID))
                        return NotFound();
                    throw;
                }
            }

            return Ok(primaryDataValues);
        }

        // DELETE: api/PrimaryDataValues/5
        /// <summary>
        /// Deletes entity by OID
        /// </summary>
        /// <param name="key">PrimaryDataValue OID</param>
        /// <returns>Ok - if succeded</returns>
        [ResponseType(typeof(PrimaryDataValue))]
        [Route("api/PrimaryDataValues({id})")]
        public IHttpActionResult DeletePrimaryDataValue(int id)
        {
            var primaryDataValue = _db.PrimaryDataValues.Find(id);
            if (primaryDataValue == null) return NotFound();

            _db.PrimaryDataValues.Remove(primaryDataValue);
            _db.SaveChanges();

            return Ok(primaryDataValue);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        private bool PrimaryDataValueExists(int id)
        {
            return _db.PrimaryDataValues.Count(e => e.OID == id) > 0;
        }
    }
}
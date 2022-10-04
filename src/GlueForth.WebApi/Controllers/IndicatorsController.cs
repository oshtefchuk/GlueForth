using BlueNorth.WebApi.DTOs;
using BlueNorth.WebApi.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.OData;

namespace BlueNorth.WebApi
{
    public class IndicatorsController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: odata/Indicators
        /// <summary>
        /// Returns list of all Indicators. <code>Indicator</code> represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Indicators</returns>
        public IEnumerable<Indicator> GetIndicators()
        {
            return _db.Indicators.Select(CloneIndicator).Where(cloned => cloned != null);
        }

        private Indicator CloneIndicator(Indicator indicator)
        {
            if (indicator.Version1?.Deleted == true) return null;
            return (Indicator)_db.Entry(indicator).CurrentValues.ToObject();
        }

        private PrimaryDataField ClonePrimaryDataField(PrimaryDataField primaryDataField)
        {
            if (primaryDataField.Version1?.Deleted == true) return null;
            return (PrimaryDataField)_db.Entry(primaryDataField).CurrentValues.ToObject();
        }

        // GET: odata/Indicators(5)
        /// <summary>
        /// Get <code>Indicator</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>Indicator</code></param>
        /// <returns><code>Indicator</code> represented as root element, withoud referenced entities</returns>
        [Route("api/Indicators({key})")]
        public Indicator GetIndicator(int key)
        {
            return CloneIndicator(_db.Indicators.SingleOrDefault(indicator => indicator.OID == key));
        }

        /// <summary>
        /// Returns list of PrincipleGroups where we have Indicator's/PrimaryDataField's for current Framework
        /// </summary>
        /// <returns>list of PrincipleGroups represented as PrincipleGroupDTO</returns>
        [Route("api/Indicators/GetPrincipleGroups")]
        [Authorize]
        public IHttpActionResult GetPrincipleGroups()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");
            var principleGroupDTOs = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.Where(x => x.Indicator.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators.Any()).Select(x => x.Indicator.Characteristic1.PrincipleGroup1).Distinct().Select(y => new PrincipleGroupDTO(y));

            return Ok(principleGroupDTOs);
        }

        /// <summary>
        /// Returns list of DataFieldCategorie's where we have Indicator's/PrimaryDataField's for current Framework
        /// </summary>
        /// <returns>list of DataFieldCategories represented as {OId, ShortTitle, Title} structures</returns>
        [Route("api/Indicators/GetCategories")]
        public IHttpActionResult GetCategories()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");
            var categories = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.SelectMany(x => x.Indicator.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators).Where(z => z.PrimaryDataField.Category.HasValue).Select(y => y.PrimaryDataField.DataFieldCategory).Distinct().OrderBy(x => x.Order);

            return Ok(categories.Select(x => new { x.OID, x.ShortTitle, x.Title }));
        }

        /// <summary>
        /// Returns list of DataFieldCategorie's where we have PrimaryDataField.AreaSizeMode=MapTool for current Framework
        /// </summary>
        /// <returns>list of DataFieldCategories represented as {OId, ShortTitle, Title} structures</returns>
        [Route("api/Indicators/GetMapDataFieldsCategories")]
        public IHttpActionResult GetMapDataFieldsCategories()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");
            var categories = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.SelectMany(x => x.Indicator.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators).Where(z => z.PrimaryDataField.PrimaryDataType1.IsMapArea == true &&
                                                                                                    z.PrimaryDataField.PrimaryDataType1.AreaSizeMode != 1 && z.PrimaryDataField.Category.HasValue).Select(y => y.PrimaryDataField.DataFieldCategory).Distinct().OrderBy(x => x.Order);

            return Ok(categories.Select(x => new { x.OID, x.ShortTitle, x.Title }));
        }

        /// <summary>
        /// Returns list of PrimaryDataField's where we have PrimaryDataField.AreaSizeMode=MapTool for current Framework
        /// </summary>
        /// <param name="dataSetOid">Oid of IndicatoDataSet</param>
        /// <returns>list of PrimaryDataField represented as MapPrimaryDataFieldDTO, contains current values for specified IndicatoDataSet</returns>
        [Route("api/Indicators/GetMapPrimaryDataFields({dataSetOid})")]
        [Authorize]
        public IHttpActionResult GetMapPrimaryDataFields(int dataSetOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");
            var indicators = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.Select(x => x.Indicator).Where(x => x.GCRecord == null);
            //1246
            var datafields = indicators.SelectMany(x => x.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators).Where(x => x.PrimaryDataField.GCRecord == null && x.PrimaryDataField.PrimaryDataType.HasValue
                                                                                                && x.PrimaryDataField.PrimaryDataType1.IsMapArea == true && x.PrimaryDataField.PrimaryDataType1.AreaSizeMode != 1).Select(y => y.PrimaryDataField).OrderBy(x => x.Order).Distinct();
            var resultList = new List<MapPrimaryDataFieldDTO>();
            foreach (var datafield in datafields)
            {
                var datafieldValue = datafield.PrimaryDataValues.FirstOrDefault(x => x.DataSet == dataSetOid);
                var fieldDto = datafieldValue == null ? new MapPrimaryDataFieldDTO(datafield) : new MapPrimaryDataFieldDTO(datafieldValue);
                resultList.Add(fieldDto);
            }
            return Ok(resultList);
        }

        /// <summary>
        /// Returns list of PrimaryDataField's where we have PrimaryDataField.AreaSizeMode=MapTool for current Framework and specified DataFieldCategory
        /// </summary>
        /// <param name="dataSetOid">Oid of IndicatoDataSet</param>
        /// <param name="categoryOid">Oid of DataFieldCategory</param>
        /// <returns>list of PrimaryDataField represented as MapPrimaryDataFieldDTO, contains current values for specified IndicatoDataSet</returns>
        [Route("api/Indicators/GetCategoryMapPrimaryDataFields")]
        [Authorize]
        public IHttpActionResult GetCategoryMapPrimaryDataFields([FromODataUri] int dataSetOid, [FromODataUri] int categoryOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");
            var indicators = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.Select(x => x.Indicator).Where(x => x.GCRecord == null);
            var datafields = indicators.SelectMany(x => x.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators).Where(x => x.PrimaryDataField.Category == categoryOid && x.PrimaryDataField.GCRecord == null && x.PrimaryDataField.PrimaryDataType.HasValue && x.PrimaryDataField.PrimaryDataType1.IsMapArea == true
                                                                                                                        && (x.PrimaryDataField.PrimaryDataFieldUserEditModes.All(y => y.User != user.Oid) || x.PrimaryDataField.PrimaryDataFieldUserEditModes.Any(y => y.User == user.Oid && y.AreaSizeMode == 0))).Select(y => y.PrimaryDataField).OrderBy(x => x.Order).Distinct();
            var resultList = new List<MapPrimaryDataFieldDTO>();
            foreach (var datafield in datafields)
            {
                var datafieldValue = datafield.PrimaryDataValues.FirstOrDefault(x => x.DataSet == dataSetOid && x.GCRecord == null);
                var fieldDto = datafieldValue == null ? new MapPrimaryDataFieldDTO(datafield) : new MapPrimaryDataFieldDTO(datafieldValue);
                resultList.Add(fieldDto);
            }
            return Ok(resultList);
        }

        /// <summary>
        /// Method for copying of MapArea-related data from one period (IndicatorDataSet) to other
        /// </summary>
        /// <param name="dataSetFromOid">Oid of source IndicatorDataSet</param>
        /// <param name="dataSetToOid">Oid of target IndicatorDataSet</param>
        /// <returns>list of copied values as MapPrimaryDataFieldDTO's</returns>
        [Route("api/Indicators/CopyMapDataValues")]
        [Authorize]
        [HttpPost]
        public IHttpActionResult CopyMapDataValues([FromODataUri] int dataSetFromOid, [FromODataUri] int dataSetToOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");
            var indicators = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.Select(x => x.Indicator).Where(x => x.GCRecord == null);
            var datafields = indicators.SelectMany(x => x.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators).Where(x => x.PrimaryDataField.GCRecord == null && x.PrimaryDataField.PrimaryDataType.HasValue && x.PrimaryDataField.PrimaryDataType1.IsMapArea == true
                                                                                                                        && x.PrimaryDataField.PrimaryDataType1.AreaSizeMode != 1).Select(y => y.PrimaryDataField).Distinct();
            var resultList = new List<MapPrimaryDataFieldDTO>();
            foreach (var datafield in datafields)
            {
                var valueFrom = datafield.PrimaryDataValues.FirstOrDefault(x => x.DataSet == dataSetFromOid && x.GCRecord == null);
                if (valueFrom == null) continue;
                var valueTo = datafield.PrimaryDataValues.FirstOrDefault(x => x.DataSet == dataSetToOid && x.GCRecord == null);
                if (valueTo != null)
                {
                    _db.ProductionAreas.RemoveRange(valueTo.ProductionAreas);
                }
                else
                {
                    valueTo = _db.PrimaryDataValues.Add(new PrimaryDataValue() { DataSet = dataSetToOid, PrimaryDataField1 = datafield, Created = DateTime.Now });
                }

                foreach (var area in valueFrom.ProductionAreas)
                {
                    _db.ProductionAreas.Add(new ProductionArea() { Name = area.Name, Created = DateTime.Now, DrawingData = area.DrawingData, Size = area.Size, PrimaryDataValue1 = valueTo });
                }
                var fieldDto = new MapPrimaryDataFieldDTO(valueTo);
                resultList.Add(fieldDto);
            }
            _db.SaveChanges();
            return Ok(resultList);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="helper"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/Indicators/ByPrincipleGroupAndDatasetList")]
        [Authorize]
        public IHttpActionResult GetIndicatorListByPrincipleGroupAndDatasetList(PrincipleGroupIndicatorDatasetsDTO helper)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");
            var indicators = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.Select(x => x.Indicator).Where(y => y.Characteristic1.PrincipleGroup == helper.PrincipleGroupOid);
            var datafields = indicators.SelectMany(x => x.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators).OrderBy(x => x.Indicator.Order).Select(y => y.PrimaryDataField).Distinct();

            var list = new List<PrimaryDataFieldDTO>();
            var commodities = new List<Commodity>() { user.Unit.Commodity };
            user.Unit.UnitUnits_CommodityCommodities.Where(x => x.Commodities != user.Unit.PrimaryCommodity).Select(x => x.Commodity).Distinct().ToList().ForEach(y => commodities.Add(y));

            foreach (var dataField in datafields)
            {
                var notesCount = 0;
                foreach (var dataSetOid in helper.DataSetsOidList)
                    notesCount +=
                        _db.PrimaryDataFieldNotes.Count(x => x.PrimaryDataField == dataField.OID && x.DataSet == dataSetOid);
                var userChoice = dataField.PrimaryDataFieldUserEditModes.FirstOrDefault(x => x.User == user.Oid);
                list.Add(new PrimaryDataFieldDTO(dataField, helper.DataSetsOidList, notesCount, userChoice, commodities));
            }

            return Ok(list);
        }

        /// <summary>
        /// Prepare data for Indicator->Capture page, entering mode 
        /// </summary>
        /// <param name="filter">CategoryIndicatorDatasetsDTO instance</param>
        /// <returns>PrimaryDataFieldDTO list</returns>
        [HttpPost]
        [Route("api/Indicators/ByCategoryAndDatasetList")]
        [Authorize]
        public IHttpActionResult ByCategoryAndDatasetList(CategoryIndicatorDatasetsDTO filter)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");
            var indicators = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.Select(x => x.Indicator);
            var datafields = indicators.SelectMany(x => x.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators).Where(x => x.PrimaryDataField.Category == filter.CategoryOid).Select(y => y.PrimaryDataField).Distinct().OrderBy(x => x.Order);

            var list = new List<PrimaryDataFieldDTO>();
            var commodities = new List<Commodity>() { user.Unit.Commodity };
            user.Unit.UnitUnits_CommodityCommodities.Where(x => x.Commodities != user.Unit.PrimaryCommodity).Select(x => x.Commodity).Distinct().ToList().ForEach(y => commodities.Add(y));
            foreach (var dataField in datafields)
            {
                var notesCount = 0;
                foreach (var dataSetOid in filter.DataSetsOidList)
                    notesCount +=
                        _db.PrimaryDataFieldNotes.Count(x => x.PrimaryDataField == dataField.OID && x.DataSet == dataSetOid);
                var userChoice = dataField.PrimaryDataFieldUserEditModes.FirstOrDefault(x => x.User == user.Oid && x.GCRecord == null);
                if (userChoice?.PeriodDataMode == 1)
                {
                    PreparePrimaryDataValues(dataField, filter.DataSetsOidList);
                }
                var dto = new PrimaryDataFieldDTO(dataField, filter.DataSetsOidList, notesCount, userChoice, commodities);
                
                list.Add(dto);
                if (dataField.IsCommodityDependendent == true)
                {
                    foreach (var commodity in commodities)
                    {
                        userChoice = dataField.PrimaryDataFieldUserEditModes.FirstOrDefault(x => x.User == user.Oid && x.Commodity == commodity.OID && x.GCRecord == null);
                        if (userChoice?.PeriodDataMode == 1) {
                            list.Add(new PrimaryDataFieldDTO(dataField, commodity, notesCount, filter.DataSetsOidList));
                        }
                        else
                            list.Add(new PrimaryDataFieldDTO(dataField, commodity, filter.DataSetsOidList, notesCount));
                    }
                }
            }
            return Ok(list);
        }

        /// <summary>
        /// Method for autocreation of PrimaryDataValues where it not exists
        /// </summary>
        /// <param name="dataField"></param>
        /// <param name="dataSetsOidList"></param>
        private void PreparePrimaryDataValues(PrimaryDataField dataField, List<int> dataSetsOidList)
        {
            var modified = false;
            foreach (var id in dataSetsOidList)
            {
                if (dataField.PrimaryDataValues.All(x => x.GCRecord == null && x.DataSet != id))
                {
                    dataField.PrimaryDataValues.Add(_db.PrimaryDataValues.Add(new PrimaryDataValue() { DataSet = id, PrimaryDataField = dataField.OID, Created = DateTime.Now }));
                    modified = true;
                }
            }
            if (modified)
            {
                _db.SaveChanges();
            }
        }

        // POST: odata/Indicators
        /// <summary>
        /// NOT IN USE
        /// </summary>
        [Route("api/Indicators/CreateOrUpdate")]
        public IHttpActionResult Post(Indicator indicator)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _db.Indicators.Add(indicator);
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

            return Ok(indicator);
        }

        // DELETE: odata/Indicators(5)
        /// <summary>
        /// NOT IN USE
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        [Route("api/Indicators({key})")]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            var indicator = _db.Indicators.Find(key);
            if (indicator == null) return NotFound();

            _db.Indicators.Remove(indicator);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndicatorExists(key))
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

        private bool IndicatorExists(int key)
        {
            return _db.Indicators.Count(e => e.OID == key) > 0;
        }
    }
}
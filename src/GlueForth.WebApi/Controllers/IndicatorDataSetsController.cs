using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;

namespace BlueNorth.WebApi.Controllers
{
    public class IndicatorDataSetsController : ApiController
    {
        private const string NotReviewedGrade = "D";
        private const string UnderReviewGrade = "C";
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/IndicatorDataSets
        /// <summary>
        /// Returns list of all IndicatorDataSet. <code>IndicatorDataSet</code> represented as IndicatorDataSetDTO
        /// </summary>
        /// <returns>list of all IndicatorDataSetDTO</returns>
        public IEnumerable<IndicatorDataSetDTO> GetIndicatorDataSets()
        {
            return _db.IndicatorDataSets.Select(CloneIndicatorDataSet);
        }

        // GET: api/IndicatorDataSets/5
        /// <summary>
        /// Get <code>IndicatorDataSet</code> by OID
        /// </summary>
        /// <param name="key">OID of <code>IndicatorDataSet</code></param>
        /// <returns><code>IndicatorDataSet</code> represented as root element, withoud referenced entities</returns>
        [ResponseType(typeof(IndicatorDataSet))]
        [Route("api/IndicatorDataSets({id})")]
        public IHttpActionResult GetIndicatorDataSet(int id)
        {
            var indicatorDataSet = _db.IndicatorDataSets.Find(id);
            if (indicatorDataSet == null) return NotFound();

            return Ok(CloneIndicatorDataSet(indicatorDataSet));
        }


        private IndicatorDataSetDTO CloneIndicatorDataSet(IndicatorDataSet indicatorDataSet)
        {
            //var clonedDataSet = (IndicatorDataSet)_db.Entry(indicatorDataSet).CurrentValues.ToObject();
            var clonedDto = new IndicatorDataSetDTO(indicatorDataSet);
            return clonedDto;
        }

        /// <summary>
        /// Get list of current User IndicatorDataSet's
        /// </summary>
        /// <returns>list of current User IndicatorDataSet's represented as IndicatorDataSetDTO's</returns>
        [Authorize]
        [Route("api/IndicatorDataSets/GetCurrentUserList")]
        public IHttpActionResult GetIndicatorDataSetsList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentUnit = user.Unit;
            if (currentUnit.PrimaryFramework == null) return BadRequest("Current Framework is empty or incorrect");
            var dataSetList = _db.IndicatorDataSets
                .Where(indicator => indicator.Unit == currentUnit.Oid
                    && indicator.Grade1 != null
                    && indicator.Grade1.ShortTitle.Equals(NotReviewedGrade)
                    && indicator.GCRecord == null && indicator.Framework == currentUnit.PrimaryFramework).OrderBy(x => x.PeriodFromYear).ToList();

            var dataSetDtoList = new List<IndicatorDataSetDTO>();
            foreach (var dataSet in dataSetList) dataSetDtoList.Add(CloneIndicatorDataSet(dataSet));

            var frameworkDatafields = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.Where(x => x.Indicator.GCRecord == null).SelectMany(x => x.Indicator.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators.Select(y => y.PrimaryDataField)).Distinct();
            var commodities = new List<Commodity>() { user.Unit.Commodity };
            user.Unit.UnitUnits_CommodityCommodities.Where(x => x.Commodities != user.Unit.PrimaryCommodity).Select(x => x.Commodity).Distinct().ToList().ForEach(y => commodities.Add(y));
            var commodityDepsFieds = frameworkDatafields.Where(x => x.IsCommodityDependendent == true);
            var totalAmount = frameworkDatafields.Count() + frameworkDatafields.Count(x => x.IsCommodityDependendent == true) * commodities.Count;
            foreach (var dataSet in dataSetList)
            {
                var answeredAmount = frameworkDatafields.Count(x => dataSet.PrimaryDataValues.Any(y => y.PrimaryDataField == x.OID));
                foreach (var field in commodityDepsFieds)
                {
                    var pdValue = field.PrimaryDataValues.FirstOrDefault(x => x.DataSet == dataSet.OID);
                    if (pdValue == null) continue;
                    foreach (var commodity in commodities)
                    {
                        answeredAmount += pdValue.CommodityPDValues.Any(x => x.Commodity == commodity.OID) ? 1 : 0;
                    }
                }
                var answeredPersent = answeredAmount == 0 ? 0 : (answeredAmount / (decimal)totalAmount) * 100;
                dataSetDtoList.First(x => x.OID == dataSet.OID).Progress = (int)answeredPersent;
            }


            return Ok(dataSetDtoList);
        }

        /// <summary>
        /// Get Maximal PeriodToYear from current User IndicatorDataSets
        /// </summary>
        /// <param name="unitOid"></param>
        /// <returns>PeriodToYear value</returns>
        [Route("api/IndicatorDataSets/GetMaxPeriodByUnit({unitOid})")]
        public short? GetMaxPeriod(Guid unitOid)
        {
            return _db.IndicatorDataSets.Where(indicator => indicator.Unit == unitOid && indicator.GCRecord == null).Max(d => d.PeriodToYear);
        }

        /// <summary>
        /// Checks is specfic IndicatoDataSet already contains Map-specific data
        /// </summary>
        /// <param name="oid">Oid of IndicatorDataSet</param>
        /// <returns>True - if map-related data exists, otherwise - false</returns>
        [Route("api/IndicatorDataSets/IsDataSetHaveMapData({oid})")]
        [HttpGet]
        public bool IsDataSetHaveMapData(int oid)
        {
            return _db.IndicatorDataSets.First(ds => ds.OID == oid).PrimaryDataValues.Any(x=>x.ProductionAreas.Any());
        }

        /// <summary>
        /// Get percentage of specific IndicatorDataSet (period) data entering
        /// </summary>
        /// Get percentage of specific IndicatorDataSet (period) data entering
        /// <param name="indicatorDataSetOid">Oid of </param>
        /// <returns>% of entered data</returns>
        [Route("api/IndicatorDataSets/GetProgress({indicatorDataSetOid})")]
        public IHttpActionResult GetIndicatorDataSetProgress(int indicatorDataSetOid)
        {
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();

            return Ok(GetIndicatorDataSetProgress(unit, indicatorDataSetOid));
        }

        private int GetIndicatorDataSetProgress(Unit unit, int indicatorDataSetOid)
        {
            var dataSet = _db.IndicatorDataSets.Find(indicatorDataSetOid);
            var frameworkDatafields = unit.Framework.IndicatorIndicators_FrameworkFrameworks.Where(x => x.Indicator.GCRecord == null).SelectMany(x => x.Indicator.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators.Select(y => y.PrimaryDataField)).Distinct();
            var commodities = new List<Commodity>() { unit.Commodity };
            unit.UnitUnits_CommodityCommodities.Where(x => x.Commodities != unit.PrimaryCommodity).Select(x => x.Commodity).Distinct().ToList().ForEach(y => commodities.Add(y));
            var commodityDepsFieds = frameworkDatafields.Where(x => x.IsCommodityDependendent == true);
            var totalAmount = frameworkDatafields.Count() + frameworkDatafields.Count(x => x.IsCommodityDependendent == true) * commodities.Count;
            var answeredAmount = frameworkDatafields.Count(x => dataSet.PrimaryDataValues.Any(y => y.PrimaryDataField == x.OID));
            foreach (var field in commodityDepsFieds)
            {
                var pdValue = field.PrimaryDataValues.FirstOrDefault(x => x.DataSet == dataSet.OID);
                if (pdValue == null) continue;
                foreach (var commodity in commodities)
                {
                    answeredAmount += pdValue.CommodityPDValues.Any(x => x.Commodity == commodity.OID) ? 1 : 0;
                }
            }
            var answeredPersent = answeredAmount == 0 ? 0 : (answeredAmount / (decimal)totalAmount) * 100;
            return (int)answeredPersent;
        }


        private Unit GetCurrentUnit()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return null;
            return user.Unit;
        }

        /// <summary>
        /// Set UnderReview Grade for specified by OID's IndicatorDataSet's
        /// </summary>
        /// <param name="dataSetOidList">OID's of IndicatorDataSet's</param>
        /// <returns>Ok - if succeed</returns>
        [HttpPost]
        [Route("api/IndicatorDataSets/UpdateGradeToUnderReviewState")]
        public IHttpActionResult UpdateIndicatorDataSetGradeToUnderReviewState(List<int> dataSetOidList)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (dataSetOidList.Count > 0)
            {
                foreach (var dataSetOid in dataSetOidList)
                {
                    var dataSet = _db.IndicatorDataSets.Find(dataSetOid);
                    if (dataSet != null && dataSet.GCRecord == null)
                    {
                        var cGrade = _db.Grades.Where(x => x.ShortTitle.Equals(UnderReviewGrade) && x.GCRecord == null)
                            .Select(y => y.OID).FirstOrDefault();

                        dataSet.Grade = cGrade;
                        dataSet.Modified = DateTime.Now;

                        _db.SaveChanges();
                    }
                    else
                    {
                        return BadRequest("Period was not found at DataBase");
                    }

                }

                return Ok();
            }

            return BadRequest("Please, select at least one Period");
        }

        // POST: api/IndicatorDataSets
        /// <summary>
        /// POST Method for IndicatorDataSet creation/update
        /// </summary>
        /// <param name="indicatorDataSetDto"><code>IndicatorDataSetDTO</code> instance</param>
        /// <returns>updated IndicatorDataSetDTO</returns>
        [ResponseType(typeof(IndicatorDataSet))]
        [Route("api/IndicatorDataSets/CreateOrUpdate")]
        [Authorize]
        public IHttpActionResult PostIndicatorDataSet(IndicatorDataSetDTO indicatorDataSetDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var isNewEntity = indicatorDataSetDto.OID == 0;

            var unit = GetCurrentUnit();
            var indicatorDataSet = new IndicatorDataSet
            {
                Framework = unit.PrimaryFramework.Value,
                Unit = indicatorDataSetDto.Unit,
                PeriodFromYear = indicatorDataSetDto.PeriodFromYear,
                PeriodToYear = indicatorDataSetDto.PeriodToYear,
                PeriodFromMonth = indicatorDataSetDto.PeriodFromMonth,
                PeriodToMonth = indicatorDataSetDto.PeriodToMonth,
                Comment = indicatorDataSetDto.Comment,
                Grade = indicatorDataSetDto.Grade
            };

            if (isNewEntity)
            {
                if (indicatorDataSet.Grade == null || indicatorDataSet.Grade == 0)
                {
                    var defaultGrade = _db.Grades
                        .FirstOrDefault(x => x.ShortTitle.Equals(NotReviewedGrade) && x.GCRecord == null);
                    indicatorDataSet.Grade1 = defaultGrade;
                }

                indicatorDataSet.Created = DateTime.Now;

                _db.IndicatorDataSets.Add(indicatorDataSet);
            }
            else
            {
                var dbIndicatorDataSet = _db.IndicatorDataSets.Find(indicatorDataSetDto.OID);
                if (dbIndicatorDataSet == null)
                    return BadRequest("Entity not found in DataBase");

                indicatorDataSet.OID = indicatorDataSetDto.OID;
                indicatorDataSet.Created = dbIndicatorDataSet.Created;
                indicatorDataSet.Modified = DateTime.Now;
                indicatorDataSet.Grade = dbIndicatorDataSet.Grade;

                _db.Entry(dbIndicatorDataSet).CurrentValues.SetValues(indicatorDataSet);
                _db.Entry(dbIndicatorDataSet).State = EntityState.Modified;
            }

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndicatorDataSetExists(indicatorDataSet.OID))
                    return NotFound();
                throw;
            }

            var createdDataSet = new IndicatorDataSetDTO(indicatorDataSet);
            createdDataSet.Progress =
                GetIndicatorDataSetProgress(GetCurrentUnit(), createdDataSet.OID);
            return Ok(createdDataSet);
        }

        // DELETE: api/IndicatorDataSets/5
        /// <summary>
        /// DELETE method for IndicatorDataSets
        /// </summary>
        /// <param name="id">id of IndicatorDataSet</param>
        /// <returns></returns>
        [Route("api/IndicatorDataSets({id})")]
        [ResponseType(typeof(IndicatorDataSet))]
        public IHttpActionResult DeleteIndicatorDataSet(int id)
        {
            var indicatorDataSet = _db.IndicatorDataSets.Find(id);
            if (indicatorDataSet == null) return NotFound();
            if (indicatorDataSet.PrimaryDataValues.Any()) return BadRequest("There exists entered Primary data for this period. Not possible to remove it");
            foreach (var note in indicatorDataSet.PrimaryDataFieldNotes)
            {
                _db.PrimaryDataFieldNotes.Remove(note);
            }
            _db.IndicatorDataSets.Remove(indicatorDataSet);
            _db.SaveChanges();

            return Ok(indicatorDataSet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }

        private bool IndicatorDataSetExists(int id)
        {
            return _db.IndicatorDataSets.Count(e => e.OID == id) > 0;
        }
    }
}
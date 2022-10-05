using GlueForth.WebApi.DTOs;
using GlueForth.WebApi.Helpers;
using NCalc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web.Http;

namespace GlueForth.WebApi
{
    public class ReportsController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();
        //copy from original model
        public enum AnswerVariants
        {
            Unknown,
            No,
            Partially,
            Yes
        }

        private const string NotReviewedGrade = "D";

        /// <summary>
        /// Method returns prepared data for <code>Dimenson</code> Spider charts - Assessment Reporting page
        /// </summary>
        /// <returns><code>ReportValueDTO</code> list</returns>
        [Route("api/Reports/GetDimensionSpiderData")]
        [Authorize]
        public IHttpActionResult GetDimensionSpiderData()
        {
            var results = new List<ReportValueDTO>();
            var currentUnit = GetCurrentUnit();
            if (currentUnit == null) return Unauthorized();
            using (var helper = new AssessmentHelper(_db))
            {
                var frameworkCharacteristics = helper.GetCharacteristicListByFramework(currentUnit.PrimaryFramework.Value);
                var groupedByDimension = frameworkCharacteristics.OrderBy(z => z.Principle1.Dimension).GroupBy(x => x.Principle1.Dimension1);
                foreach (var group in groupedByDimension)
                {
                    double groupScore = 0;
                    foreach (var characteristic in group)
                    {
                        groupScore += helper.GetCharacteristicScore(characteristic, currentUnit) ?? 0;
                    }
                    results.Add(new ReportValueDTO() { Name = group.Key.ShortTitle, Value = groupScore == 0 ? 0 : groupScore / group.Count(), Color = group.Key.Color.ToString() });
                }
            }
            return Ok(results);
        }

        /// <summary>
        /// Method returns prepared <code>Principle</code>s list for Spider charts - Assessment Reporting page
        /// </summary>
        /// <returns>cloned <code>Principle</code>'s list</returns>
        [Route("api/Reports/GetSpiderDataPrinciples")]
        [Authorize]
        public IHttpActionResult GetSpiderDataPrinciples()
        {
            var results = new List<ReportValueDTO>();
            var currentUnit = GetCurrentUnit();
            if (currentUnit == null) return Unauthorized();
            var principles = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == currentUnit.PrimaryFramework.Value && x.Characteristic.GCRecord == null && x.Characteristic.Principle1.GCRecord != null)
                                                                                        .Select(x => x.Characteristic.Principle1).Distinct().OrderBy(z => z.Order).Select(ClonePrinciple);
            return Ok(principles);
        }

        private Principle ClonePrinciple(Principle principle)
        {
            return (Principle)_db.Entry(principle).CurrentValues.ToObject();
        }

        /// <summary>
        /// Method returns prepared data for <code>Principle</code> Spider charts - Assessment Reporting page
        /// </summary>
        /// <returns><code>ReportValueDTO</code> list</returns>
        [Route("api/Reports/GetPrincipleSpiderData")]
        [Authorize]
        public IHttpActionResult GetPrincipleSpiderData()
        {
            var results = new List<ReportValueDTO>();
            var currentUnit = GetCurrentUnit();
            if (currentUnit == null) return Unauthorized();
            using (var helper = new AssessmentHelper(_db))
            {
                var frameworkCharacteristics = helper.GetCharacteristicListByFramework(currentUnit.PrimaryFramework.Value);
                var groupedByPrinciple = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == currentUnit.PrimaryFramework.Value && x.Characteristic.GCRecord == null
                                                                                                     && x.Characteristic.Principle1.GCRecord == null).Select(x => x.Characteristic).GroupBy(x => x.Principle1);
                foreach (var group in groupedByPrinciple.OrderBy(x => x.Key.Order))
                {
                    double groupScore = 0;
                    foreach (var characteristic in group)
                    {
                        groupScore += helper.GetCharacteristicScore(characteristic, currentUnit) ?? 0;
                    }
                    results.Add(new ReportValueDTO() { Name = group.Key.ShortTitle, Value = groupScore == 0 ? 0 : groupScore / group.Count(), Color = group.Key.Color.ToString() });
                }
            }
            return Ok(results);
        }

        /// <summary>
        /// Method returns prepared <code>Dimenson</code>s list for Spider charts legends - Assessment Reporting page
        /// </summary>
        /// <returns></returns>
        [Route("api/Reports/GetSpiderDataDimensions")]
        [Authorize]
        public IHttpActionResult GetSpiderDataDimensions()
        {
            var currentUnit = GetCurrentUnit();
            if (currentUnit == null) return Unauthorized();
            var dimensions = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == currentUnit.PrimaryFramework.Value && x.Characteristic.GCRecord == null && x.Characteristic.Principle1.Dimension1.GCRecord == null)
                                                                                            .Select(z => z.Characteristic.Principle1.Dimension1).Distinct().Select(CloneDimension);
            return Ok(dimensions);
        }

        private Dimension CloneDimension(Dimension dimension)
        {
            return (Dimension)_db.Entry(dimension).CurrentValues.ToObject();
        }

        /// <summary>
        /// Method returns prepared data for <code>Characteristic</code> Spider chart for specific <code>Dimension</code> - Assessment Reporting page
        /// </summary>
        /// <param name="dimensionId">Dimension OID</param>
        /// <returns><code>ReportValueDTO</code> list</returns>
        [Route("api/Reports/GetCharacteristicSpiderByDimension({dimensionId})")]
        [Authorize]
        public IHttpActionResult GetCharacteristicSpiderByDimension(int dimensionId)
        {

            var currentUnit = GetCurrentUnit();
            if (currentUnit == null) return Unauthorized();
            var results = new List<ReportValueDTO>();
            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == currentUnit.PrimaryFramework.Value && x.Characteristic.GCRecord == null && x.Characteristic.Principle1.Dimension.Value == dimensionId).Select(x => x.Characteristic);
            using (var helper = new AssessmentHelper(_db))
            {
                foreach (var characteristic in frameworkCharacteristics)
                {
                    var characteristicScore = helper.GetCharacteristicScore(characteristic, currentUnit) ?? 0;
                    results.Add(new ReportValueDTO() { Name = characteristic.ShortTitle, Value = characteristicScore });
                }
            }
            return Ok(results);
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
        /// Method returns prepared data for <code>Characteristic</code> Spider for specific Management Area (<code>PrincipleGroup</code>) charts - Assessment Reporting page
        /// </summary>
        /// <returns><code>ReportValueDTO</code> list</returns>
        [Route("api/Reports/GetCharacteristicSpiderByPrincipleGroup({principleGroupId})")]
        [Authorize]
        public IHttpActionResult GetCharacteristicSpiderByPrincipleGroup(int principleGroupId)
        {

            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            var results = new List<ReportValueDTO>();
            using (var helper = new AssessmentHelper(_db))
            {
                var frameworkCharacteristics = helper.GetCharacteristicListByFramework(unit.PrimaryFramework.Value);
                frameworkCharacteristics = frameworkCharacteristics.Where(x => x.PrincipleGroup.HasValue && x.PrincipleGroup.Value == principleGroupId).ToList();
                foreach (var characteristic in frameworkCharacteristics)
                {
                    var characteristicScore = helper.GetCharacteristicScore(characteristic, unit) ?? 0; ;
                    results.Add(new ReportValueDTO() { Name = characteristic.ShortTitle, Value = characteristicScore });
                }
            }
            return Ok(results);
        }

        /// <summary>
        /// Method returns prepared data for <code>Characteristic</code> Bar chart - Assessment Reporting page
        /// </summary>
        /// <returns><code>ReportGroupValueDTO</code> list</returns>
        [Route("api/Reports/GetCharacteristicsBarChartData")]
        [Authorize]
        public IHttpActionResult GetCharacteristicsBarChartData()
        {

            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            var results = new List<ReportGroupValueDTO>();
            IEnumerable<Characteristic> frameworkCharacteristics = null;
            using (var helper = new AssessmentHelper(_db))
            {
                frameworkCharacteristics = helper.GetCharacteristicListByFramework(unit.PrimaryFramework.Value).OrderBy(x => x.Principle);
                foreach (var characteristic in frameworkCharacteristics)
                {
                    var characteristicScore = helper.GetCharacteristicScore(characteristic, unit) ?? 0;
                    results.Add(new ReportGroupValueDTO() { Name = characteristic.ShortTitle, Group = characteristic.Principle1.Dimension1.ShortTitle, Value = characteristicScore, Guidance = characteristic.Summary });
                }
            }
            return Ok(results);
        }

        /// <summary>
        /// Method returns prepared data for <code>Characteristic</code> Bar chart grouped by <code>Dimension</code>  - Assessment Reporting page
        /// </summary>
        /// <returns><code>ReportGroupValueDTO</code> list</returns>
        [Route("api/Reports/GetCharacteristicsBarChartGroupedByDimension")]
        [Authorize]
        public IHttpActionResult GetCharacteristicsBarChartGroupedByDimension()
        {

            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            var results = new List<ReportGroupValueDTO>();
            IEnumerable<Characteristic> frameworkCharacteristics = null;
            using (var helper = new AssessmentHelper(_db))
            {
                frameworkCharacteristics = helper.GetCharacteristicListByFramework(unit.PrimaryFramework.Value);
                var dimensionGrouped = frameworkCharacteristics.GroupBy(x => x.Principle1.Dimension1);
                foreach (var group in dimensionGrouped)
                {
                    var dimensionResults = new List<ReportGroupValueDTO>();
                    foreach (var characteristic in group)
                    {
                        var characteristicScore = helper.GetCharacteristicScore(characteristic, unit) ?? 0;
                        dimensionResults.Add(new ReportGroupValueDTO() { Name = characteristic.ShortTitle, Group = group.Key.ShortTitle, Value = characteristicScore });
                    }
                    results.AddRange(dimensionResults.OrderByDescending(x => x.Value));
                }
            }
            return Ok(results);
        }

        /// <summary>
        /// Method returns prepared data for <code>Characteristic</code> Bar chart grouped by <code>Dimension</code> ordered descending by Caracteristic Score  - Assessment Reporting page
        /// </summary>
        /// <returns><code>ReportGroupValueDTO</code> list</returns>
        [Route("api/Reports/GetCharacteristicsBarChartGroupedByDimensionToLow")]
        [Authorize]
        public IHttpActionResult GetCharacteristicsBarChartGroupedByDimensionToLow()
        {

            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            var results = new List<ReportGroupValueDTO>();
            IEnumerable<Characteristic> frameworkCharacteristics = null;
            using (var helper = new AssessmentHelper(_db))
            {
                frameworkCharacteristics = helper.GetCharacteristicListByFramework(unit.PrimaryFramework.Value);
                var dimensionGrouped = frameworkCharacteristics.GroupBy(x => x.Principle1.Dimension1);
                foreach (var group in dimensionGrouped.OrderByDescending(x => x.Key.OID))
                {
                    var dimensionResults = new List<ReportGroupValueDTO>();
                    foreach (var characteristic in group)
                    {
                        var characteristicScore = helper.GetCharacteristicScore(characteristic, unit) ?? 0;
                        dimensionResults.Add(new ReportGroupValueDTO() { Name = characteristic.ShortTitle, Group = group.Key.ShortTitle, Value = characteristicScore });
                    }
                    results.AddRange(dimensionResults.OrderBy(x => x.Value));
                }
            }
            return Ok(results);
        }

        /// <summary>
        /// Method returns prepared data for Indicator Reporting page table
        /// </summary>
        /// <param name="filter"><code>IndicatorReportFilter</code> instance. { int DimensionOid, int PrincipleGroupOid, int PrincipleOid }. Each filter paramether used if it's != 0</param>
        /// <returns><code>ReportIndicatorDTO</code> list</returns>
        [Route("api/Reports/GetIndicatorsData")]
        [HttpPost]
        [Authorize]
        public IHttpActionResult GetIndicatorsData(IndicatorReportFilter filter)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
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

            var indicators = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.Where(x => x.Indicator.GCRecord == null).Select(x => x.Indicator).ToList();
            if (filter.DimensionOid > 0)
            {
                indicators = indicators.Where(x => x.Characteristic.HasValue && x.Characteristic1.Principle.HasValue && x.Characteristic1.Principle1.Dimension1.OID == filter.DimensionOid).ToList();
            }
            if (filter.PrincipleGroupOid > 0)
            {
                indicators = indicators.Where(x => x.Characteristic.HasValue && x.Characteristic1.PrincipleGroup.HasValue && x.Characteristic1.PrincipleGroup1.OID == filter.PrincipleGroupOid).ToList();
            }
            if (filter.PrincipleOid > 0)
            {
                indicators = indicators.Where(x => x.Characteristic.HasValue && x.Characteristic1.Principle1.OID == filter.PrincipleOid).ToList();
            }


            var list = new List<ReportIndicatorDTO>();
            foreach (var indicator in indicators)
            {
                ReportIndicatorDTO reportValue = null;
                var trend = GetTrendValuesDictionary(indicator, dataSetList);
                int score = GetScore(trend.Select(x => x.Value).ToArray());
                if (trend.All(x => !double.IsNaN(x.Value)))
                {
                    score = score * indicator.Conversion.GetValueOrDefault();
                }
                if (indicator.TresholdValue.HasValue)
                {
                    var result = trend.LastOrDefault();
                    if (result != null && (result.Value < (double)indicator.TresholdValue.Value))
                    {
                        score = -50;
                    }
                }
                reportValue = new ReportIndicatorDTO()
                {
                    Characteristic = indicator.Characteristic1?.ShortTitle,
                    CharacteristicRef = indicator.Characteristic1?.Reference,
                    CharacteristicOid = indicator.Characteristic.HasValue ? indicator.Characteristic1.OID : -1,
                    PrincipleGroup = indicator.Characteristic1?.PrincipleGroup1?.ShortTitle,
                    MeasuredBy = indicator.Title,
                    Formula = indicator.Formula ?? string.Empty,
                    Relevance = indicator.Relevance,
                    TrendDictionary = trend,
                    Score = score,
                    IndicatorOid = indicator.OID,
                    DimensionOid = indicator.Characteristic.HasValue ? indicator.Characteristic1.Principle1.Dimension.GetValueOrDefault() : -1
                };
                list.Add(reportValue);
            }
            return Ok(list.OrderBy(x => x.DimensionOid).ThenBy(y => y.CharacteristicRef));
        }

        /// <summary>
        /// Method returns prepared data for DATA COLLECTION PROGRESS Chart at Dashboard page
        /// </summary>
        /// <param name="categoryOid">Oid of PrimaryDataField Category. If it's set - data will be prepared for specified Category</param>
        /// <returns>list of "period"-"answered percent" pairs</returns>
        [Route("api/Reports/GetIndicatorDataSetsProgress")]
        [Authorize]
        public IHttpActionResult GetIndicatorDataSetsProgress(int categoryOid = -1)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
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

            var frameworkDatafields = currentUnit.Framework.IndicatorIndicators_FrameworkFrameworks.Where(x => x.Indicator.GCRecord == null).SelectMany(x => x.Indicator.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators.Select(y => y.PrimaryDataField)).Distinct();
            if (categoryOid > 0)
            {
                frameworkDatafields = frameworkDatafields.Where(x => x.Category == categoryOid);
            }
            var list = new Dictionary<string, int>();
            var commodities = new List<Commodity>() { user.Unit.Commodity };
            user.Unit.UnitUnits_CommodityCommodities.Where(x => x.Commodities != user.Unit.PrimaryCommodity).Select(x => x.Commodity).Distinct().ToList().ForEach(y => commodities.Add(y));
            var commodityDepsFieds = frameworkDatafields.Where(x => x.IsCommodityDependendent == true);
            var totalAmount = frameworkDatafields.Count() + frameworkDatafields.Count(x => x.IsCommodityDependendent == true) * commodities.Count;
            foreach (var dataSet in dataSetList)
            {
                var answeredAmount = frameworkDatafields.Count(x => dataSet.PrimaryDataValues.Any(y => y.PrimaryDataField == x.OID && !string.IsNullOrEmpty(y.Value)));
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
                var yearName = dataSet.PeriodFromYear.ToString();
                int i = 1;
                while (list.ContainsKey(yearName))
                {
                    yearName = dataSet.PeriodFromYear.ToString() + "-" + i.ToString();
                    i++;
                }
                list.Add(yearName, (int)answeredPersent);
            }
            return Ok(list);
        }

        #region calculation methods
        public static int GetScore(double[] trend)
        {
            if (trend.Any(x => double.IsNaN(x))) return -25; //bugherd #1033 && 1089

            var average = trend.Length < 2 ? 0 : trend.Take(trend.Length - 1).Average();
            if (average == 0) return 0;
            var score = (int)(Math.Round(((trend.Last() - average) / average) * 100, 0));
            return score;
        }

        public static double[] GetTrend(Indicator indicator, List<IndicatorDataSet> dataSetList)
        {
            var trend = new List<double>();
            foreach (var period in dataSetList)
            {
                try
                {

                    Expression e = new Expression(indicator.Formula);
                    e.EvaluateParameter += delegate (string name, ParameterArgs args)
                    {
                        args.Result = GetValue(name, indicator, period);
                    };
                    var result = (double)e.Evaluate();
                    trend.Add((double.IsInfinity(result)) ? double.NaN : Math.Round(result, 2));

                }
                catch (Exception)
                {
                    var trend1 = new List<double>();
                    dataSetList.ForEach(x => trend1.Add(double.NaN));
                    return trend1.ToArray();
                }
            }
            return trend.ToArray();
        }

        private ReportIndicatoYearValue[] GetTrendValuesDictionary(Indicator indicator, List<IndicatorDataSet> dataSetList)
        {
            var trend = new List<ReportIndicatoYearValue>();
            foreach (var period in dataSetList)
            {
                try
                {

                    Expression e = new Expression(indicator.Formula);
                    e.EvaluateParameter += delegate (string name, ParameterArgs args)
                    {
                        args.Result = GetValue(name, indicator, period);
                    };
                    var result = (double)e.Evaluate();
                    trend.Add(new ReportIndicatoYearValue() { Year = period.PeriodFromYear.GetValueOrDefault(), Value = (double.IsInfinity(result)) ? double.NaN : Math.Round(result, 2) });

                }
                catch (Exception)
                {
                    var trend1 = new List<ReportIndicatoYearValue>();
                    dataSetList.ForEach(x => trend1.Add(new ReportIndicatoYearValue() { Year = x.PeriodFromYear.GetValueOrDefault(), Value = double.NaN }));
                    return trend1.ToArray();
                }
            }
            return trend.ToArray();
        }

        public static double GetValue(string name, Indicator indicator, IndicatorDataSet period)
        {
            var pmf = indicator.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators.FirstOrDefault(x => x.PrimaryDataField.Reference.ToLower() == name.ToLower());
            if (pmf == null)
            {
                var conversionFactors = indicator.IndicatorIndicators_ConversionFactorConversionFactors.FirstOrDefault(x => x.ConversionFactor.Reference.ToLower() == name.ToLower());
                if (conversionFactors == null) return 1;
                return conversionFactors.ConversionFactor.Value.GetValueOrDefault();
            }

            //var pmv = pmf.PrimaryDataField.PrimaryDataValues.LastOrDefault(x => x.DataSet == period.OID);  //bugherd #1413
            var pmv = pmf.PrimaryDataField.PrimaryDataValues.OrderBy(x=>x.Modified).ThenByDescending(x=>x.Created).LastOrDefault(x => x.DataSet == period.OID); //bugherd #1401

            //if (pmv == null) //bugherd #1413
            //{
            //    pmv = pmf.PrimaryDataField.PrimaryDataValues.LastOrDefault(x => x.IndicatorDataSet.Framework == period.Framework && x.IndicatorDataSet.Unit == period.Unit && x.IndicatorDataSet.PeriodFromYear <= period.PeriodFromYear);
            //}

            if (pmv == null) //bugherd #1033
                return double.NaN;
            double value;
            if (pmv.PrimaryDataField1.PrimaryDataType1.IsMapArea == true)
            {
                if (pmv.ProductionAreas.Any())
                {
                    var size = pmv.ProductionAreas.Sum(x => x.Size);
                    if (pmv.PrimaryDataField1.UnitOfMeasure?.ShortTitle.ToLower() == "ha")
                    {
                        size = size / 10000;
                    }
                    return size.GetValueOrDefault();
                }
                else if (pmv.PrimaryDataField1.UnitOfMeasure?.ShortTitle.ToLower() == "ha")
                {
                    return double.Parse(pmv.Value) / 10000;
                }
            }
            var ownersOids = period.Unit1.UserCreatedByUsers_UnitCreatedUnits.Select(x => x.CreatedByUsers).ToArray();
            var useredit = pmv.PrimaryDataField1.PrimaryDataFieldUserEditModes.FirstOrDefault(x => ownersOids.Contains(x.User));
            if (useredit?.PeriodDataMode == 1)
            {
                value = 0;
                foreach (var pdmv in pmv.PrimaryDataMonthValues.Where(x=>x.GCRecord == null))
                {                    
                    if (double.TryParse(pdmv.Value, out double val))
                    {
                        value += val;
                    }
                }
                return value;
            }
            if (!double.TryParse(pmv.Value, out value)) return double.NaN; //bugherd #1033
            return value;
        }
        #endregion

        /// <summary>
        /// NOT IN USE currently
        /// </summary>
        /// <param name="indicatorOid"></param>
        /// <returns></returns>
        [Route("api/Reports/GetIndicatorData({indicatorOid})")]
        [Authorize]
        public IHttpActionResult GetIndicatorsData(int indicatorOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();

            var indicator = _db.Indicators.Find(indicatorOid);
            if (indicator == null) return BadRequest("");
            var dataSetList = _db.IndicatorDataSets
              .Where(ind => ind.Unit == unit.Oid
                  && ind.Grade1 != null
                  && ind.Grade1.ShortTitle.Equals(NotReviewedGrade)
                  && ind.GCRecord == null && ind.Framework == unit.PrimaryFramework).OrderBy(x => x.PeriodFromYear).ToList();
            var trend = GetTrend(indicator, dataSetList);
            var reportValue = new ReportIndicatorCharacteristicDTO(indicator, unit, trend);
            return Ok(reportValue);
        }

        /// <summary>
        /// Method returns prepared data for TREND Chart at Dashboard page
        /// </summary>
        /// <returns><code>ReportPlanTrendDTO</code></returns>
        [Route("api/Reports/GetImprovementPlanTrend")]
        [Authorize]
        public IHttpActionResult GetImprovementPlanTrend()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            var now = DateTime.Now;
            var results = new List<ReportPlanTrendDTO>();
            var dataSet = _db.SPADataSets.First(x => x.Framework == unit.PrimaryFramework && x.AssessmentType == unit.CurrentAssessmentType && x.Unit.Value == unit.Oid);
            for (int i = 0; i < 6; i++)
            {
                var periodStart = now.AddDays(-now.Day + 1).AddMonths(-5 + i);
                var openCount = dataSet.ImprovementPlanItems.Count(x => x.IsCompleted != true && x.Created <= periodStart && x.IsDisabled != true && x.GCRecord == null);
                var completedCount = dataSet.ImprovementPlanItems.Count(x => x.IsCompleted == true && x.Completed <= periodStart && x.IsDisabled != true && x.GCRecord == null);
                var overdue = dataSet.ImprovementPlanItems.Count(x => x.IsCompleted != true && x.DueDate <= periodStart && x.IsDisabled != true && x.GCRecord == null);
                results.Add(new ReportPlanTrendDTO() { PeriodName = periodStart.ToString("MMMM yyyy"), Completed = completedCount, Open = openCount, Overdue = overdue });
            }
            return Ok(results);
        }

        /// <summary>
        /// Method returns calculated value of OPEN (tasks count) indicator at Dashboard page
        /// </summary>
        /// <returns>Open tasks count</returns>
        [Route("api/Reports/GetImprovementPlanOpenProgress")]
        [Authorize]
        public IHttpActionResult GetImprovementPlanOpenProgress()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            var results = new List<ReportPlanTrendDTO>();
            var dataSet = _db.SPADataSets.First(x => x.Framework == unit.PrimaryFramework && x.AssessmentType == unit.CurrentAssessmentType && x.Unit.Value == unit.Oid);
            var now = DateTime.Now;
            var periodStart = now.AddMonths(-6);
            var openCount = dataSet.ImprovementPlanItems.Count(x => x.IsCompleted != true && x.Created <= periodStart);
            var nowCount = dataSet.ImprovementPlanItems.Count(x => x.IsCompleted != true && x.Created <= now);

            return Ok(openCount == 0 ? 0 : ((nowCount - openCount) / openCount) * 100);
        }

        /// <summary>
        /// Method returns calculated value of OVERDUE (tasks count) indicator at Dashboard page
        /// </summary>
        /// <returns>Overdue tasks count</returns>
        [Route("api/Reports/GetImprovementPlanOverdueProgress")]
        [Authorize]
        public IHttpActionResult GetImprovementPlanOverdueProgress()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            var results = new List<ReportPlanTrendDTO>();
            var dataSet = _db.SPADataSets.First(x => x.Framework == unit.PrimaryFramework && x.AssessmentType == unit.CurrentAssessmentType && x.Unit.Value == unit.Oid);
            var now = DateTime.Now;
            var periodStart = now.AddMonths(-6);
            var openCount = dataSet.ImprovementPlanItems.Count(x => x.IsCompleted != true && x.DueDate > periodStart);
            var nowCount = dataSet.ImprovementPlanItems.Count(x => x.IsCompleted != true && x.DueDate <= now);

            return Ok(openCount == 0 ? 0 : ((nowCount - openCount) / openCount) * 100);
        }

        /// <summary>
        /// Method returns prepared data for pop-up Indicator window at Indicator Reporting data - chart, table etc.
        /// </summary>
        /// <param name="indicatorOid">OID of <code>Indicator</code></param>
        /// <returns><code>ReportIndicatorCharacteristicDTO</code> instance</returns>
        [Route("api/Reports/GetCharacteristicIndicatorData({indicatorOid})")]
        [Authorize]
        public IHttpActionResult GetCharacteristicIndicatorData(int indicatorOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();

            var indicator = _db.Indicators.Find(indicatorOid);
            var dataSetList = _db.IndicatorDataSets
                .Where(ind => ind.Unit == unit.Oid
                    && ind.Grade1 != null
                    && ind.Grade1.ShortTitle.Equals(NotReviewedGrade)
                    && ind.GCRecord == null && ind.Framework == unit.PrimaryFramework).OrderBy(x => x.PeriodFromYear).ToList();
            var trend = GetTrend(indicator, dataSetList);
            var reportValue = new ReportIndicatorCharacteristicDTO(indicator, unit, trend);
            return Ok(reportValue);
        }

        /// <summary>
        /// Method returns prepared data for pop-up Indicator window at Indicator Reporting data - chart, table etc.
        /// </summary>
        /// <param name="characteristicOid">OID of <code>Characteristic</code></param>
        /// <returns><code>ReportIndicatorCharacteristicDTO</code> instance</returns>
        [Route("api/Reports/GetCharIndicatorData({characteristicOid})")]
        [Authorize]
        public IHttpActionResult GetCharIndicatorData(int characteristicOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();
            var characteristic = _db.Characteristics.Find(characteristicOid);
            var indicator = _db.IndicatorIndicators_FrameworkFrameworks.FirstOrDefault(x => x.Frameworks == unit.PrimaryFramework && x.Indicator.Characteristic1.Reference.Equals(characteristic.Reference))?.Indicator;
            var dataSetList = _db.IndicatorDataSets
                .Where(ind => ind.Unit == unit.Oid
                    && ind.Grade1 != null
                    && ind.Grade1.ShortTitle.Equals(NotReviewedGrade)
                    && ind.GCRecord == null && ind.Framework == unit.PrimaryFramework).OrderBy(x => x.PeriodFromYear).ToList();
            var trend = GetTrend(indicator, dataSetList);
            var reportValue = new ReportIndicatorCharacteristicDTO(indicator, unit, trend);
            return Ok(reportValue);
        }

        private double ParseValue(string value)
        {
            return string.IsNullOrEmpty(value) ? double.NaN : double.Parse(value.Replace(" ", string.Empty));
        }

        /// <summary>
        /// Method returns prepared data for MyActions->Reporting data table
        /// </summary>
        /// <returns><code>PriorReportItemDTO</code> list</returns>
        [Route("api/Reports/GetImprovementsData")]
        [Authorize]
        public IHttpActionResult GetImprovementsData()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var unit = GetCurrentUnit();
            if (unit == null) return Unauthorized();

            var list = new List<PriorReportItemDTO>();
            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == unit.PrimaryFramework.Value && x.Characteristic.GCRecord == null).Select(x => x.Characteristic).ToList();
            var dataSet = _db.SPADataSets.FirstOrDefault(x => x.Framework.Value == unit.PrimaryFramework.Value && x.AssessmentType == x.Unit1.CurrentAssessmentType && x.Unit.Value == unit.Oid);
            if (dataSet == null) return Ok(list); //1313
            var groups = _db.QuestionGroups.Where(x => x.Parent.HasValue && x.QuestionGroup2.Parent.HasValue).OrderBy(x => x.ShortTitle).Select(x => x.OID);
            try
            {

                var priorCharacteristics = dataSet.PriorCharacteristics.Select(x => x.Characteristic1).ToList().OrderBy(x => x.Principle1.Dimension).ThenBy(x => x.Reference);
                foreach (var characteristic in priorCharacteristics)
                {

                    var reportValue = new PriorReportItemDTO()
                    {
                        CharacteristicRef = characteristic.Reference,
                        CharacteristicTitle = characteristic.ShortTitle
                    };
                    var statuses = new List<int>();
                    var statusespercentages = new List<double>();
                    foreach (var questionGroupOid in groups)
                    {
                        if (!characteristic.QuestionQuestions_CharacteristicCharacteristics.Any(x => x.Question.Group == questionGroupOid))
                        {
                            statuses.Add(0);
                        }
                        else
                        {
                            var questions = characteristic.QuestionQuestions_CharacteristicCharacteristics.Where(x => x.Question.Group == questionGroupOid);
                            int progress = 0;
                            foreach (var question in questions)
                            {
                                var imprItems = dataSet.ImprovementPlanItems.Where(x => x.Characteristic == characteristic.OID && x.Question == question.Question.OID).ToList();
                                if (imprItems.Any(x => x.IsDisabled == true) || (imprItems.Any() && imprItems.All(x => x.IsCompleted == true)))
                                {
                                    progress++;
                                }
                            }
                            var improvementItems = dataSet.ImprovementPlanItems.Where(x => !x.GCRecord.HasValue && x.Characteristic == characteristic.OID && x.Question.HasValue && x.Question1.Group == questionGroupOid);
                            var planned = improvementItems.Count();
                            var open = improvementItems.Count(x => x.IsCompleted == false && x.DueDate <= DateTime.Today);
                            var improved = improvementItems.Count(x => x.IsCompleted == true);
                            var state = improvementItems.Any(x => x.IsDisabled == true) ? 1 : (planned == 0 ? 2 : (planned == improved ? 4 : 3));
                            if (state == 3) state = improvementItems.Count(x => x.IsCompleted == false) * -1;
                            statuses.Add(state);
                            statusespercentages.Add(progress / questions.Count() * 100);
                        }
                    };
                    reportValue.QuestionGroupStatuses = statuses.ToArray();
                    reportValue.Status = (int)statusespercentages.Average();
                    list.Add(reportValue);

                }
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }


        public class IndicatorReportFilter
        {
            public int DimensionOid { get; set; }
            public int PrincipleGroupOid { get; set; }
            public int PrincipleOid { get; set; }
        }

    }
}
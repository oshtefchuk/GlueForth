using GlueForth.WebApi.Helpers;
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

namespace GlueForth.WebApi
{
    public class CharacteristicsController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();
        private const string NotReviewedGrade = "D";
        // GET: odata/Characteristics
        /// <summary>
        /// Returns list of all Characteristics. Characteristic represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Characteristics</returns>
        public IEnumerable<Characteristic> GetCharacteristics()
        {
            return _db.Characteristics.Select(CloneCharacteristic);
        }

        // GET: odata/Characteristics(5)
        /// <summary>
        /// Get Characteristic by OID
        /// </summary>
        /// <param name="key">OID of Characteristic</param>
        /// <returns>Characteristic represented as root element, withoud referenced entities</returns>
        [Route("api/Characteristics({key})")]
        public Characteristic GetCharacteristic(int key)
        {
            return CloneCharacteristic(
                _db.Characteristics.SingleOrDefault(characteristic => characteristic.OID == key));
        }

        private Characteristic CloneCharacteristic(Characteristic characteristic)
        {
            if (characteristic != null)
            {
                var result = (Characteristic)_db.Entry(characteristic).CurrentValues.ToObject();
                if (characteristic.OrganisationType1 != null)
                    result.OrganisationType1 =
                        (OrganisationType)_db.Entry(characteristic.OrganisationType1).CurrentValues.ToObject();
                return result;
            }

            return null;
        }

        /// <summary>
        /// Get Characteristic by OID
        /// </summary>
        /// <param name="key">OID of Characteristic</param>
        /// <returns>Characteristic represented as <code>CharacteristicShortDTO</code>, including calculated current Status</returns>
        [Route("api/Characteristics/Get({key})")]
        [Authorize]
        public IHttpActionResult GetShortCharacteristic(int key)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();
            var characteristic = _db.Characteristics.Find(key);
            var status = new AssessmentHelper(_db).GetCharacteristicState(characteristic, user.Unit);
            return Ok(new CharacteristicShortDTO(characteristic) { Status = status });
        }

        /// <summary>
        /// Returns list of current Framework Characteristics. Characteristic represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of current Framework Characteristics</returns>
        [Authorize]
        [Route("api/Characteristics/GetByCurrentFramework")]
        public IHttpActionResult GetCharacteristicListByStandard()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var helper = new AssessmentHelper(_db);

            var charList = helper.GetCharacteristicListByFramework(currentFramework.Value).Select(CloneCharacteristic)
                .ToList();

            return Ok(charList);
        }

        /// <summary>
        /// Returns list of Characteristics related with current6 Framewrok and specific Principle. Characteristic represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of Characteristics related with current6 Framewrok and specific Principle</returns>
        [Authorize]
        [Route("api/Characteristics/GetByCurrentFrameworkAndPrinciple({principleOid})")]
        public IHttpActionResult GetCharacteristicListByStandardAndPrinciple(int principleOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var helper = new AssessmentHelper(_db);

            var charList = helper.GetCharacteristicListByFramework(currentFramework.Value)
               .Where(x => x.Principle == principleOid && x.Principle1.GCRecord == null).Select(CloneCharacteristic);

            return Ok(charList);
        }

        private CharacteristicDTO PrepareCharacteristicDTO(Characteristic characteristic, int spaDataSetOid)
        {
            var datasetAnswers = characteristic.Answers.Where(y => y.GCRecord == null && y.SPADataSet.OID == spaDataSetOid);
            var questions = characteristic.QuestionQuestions_CharacteristicCharacteristics.Where(x => !datasetAnswers.Any(y => y.GCRecord == null && y.Question.Value == x.Questions.Value));
            return new CharacteristicDTO()
            {
                OID = characteristic.OID,
                Title = characteristic.Title,
                Answers = spaDataSetOid < 0 ? new int[0] : questions.Select(x => x.Questions.Value).ToArray()
            };
        }

        /// <summary>
        /// Returns list of Characteristics related with current6 Framewrok and specific Principle. Each Characteristic represented as <code>CharacteristicDTO</code>
        /// </summary>
        /// <param name="principleOid">Oid of Principle</param>
        /// <returns>list of Characteristics related with current6 Framewrok and specific Principle</returns>
        [Authorize]
        [Route("api/Characteristics/GetByCurFrameworkAndPrinciple({principleOid})")]
        public IHttpActionResult GetByCurrentFrameworkAndPrinciple(int principleOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == currentFramework && x.Characteristic.GCRecord == null && x.Characteristic.Principle == principleOid).Select(x => x.Characteristic);

            var dataSetOid = _db.SPADataSets.Where(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).Select(x => x.OID).FirstOrDefault();
            var unansweredCharacteristics = frameworkCharacteristics
                .SelectMany(x => x.QuestionQuestions_CharacteristicCharacteristics).Where(x => x.Question.Answers.All(z => z.DataSet != dataSetOid)).Select(x => x.Characteristics.Value).ToList();

            var charlist = new List<CharacteristicDTO>();
            foreach (var characteristic in frameworkCharacteristics)
            {
                var unansweredQuestionsOids = characteristic.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.Count(x => x.SPADataSets == dataSetOid) > 0 ? new int[0] : unansweredCharacteristics.Where(y => y == characteristic.OID).ToArray();
                charlist.Add(new CharacteristicDTO() { OID = characteristic.OID, Title = characteristic.Title, Answers = unansweredQuestionsOids });
            }
            return Ok(charlist);
        }

        /// <summary>
        /// Returns list of Characteristics related with current6 Framewrok and specific Dimension. Characteristic represented as root element, withoud referenced entities
        /// </summary>
        /// <param name="dimensionOid">Oid of Dimension</param>
        /// <returns>list of Characteristics related with current6 Framewrok and specific Dimension</returns>
        [Authorize]
        [Route("api/Characteristics/GetByCurrentFrameworkAndDimension({dimensionOid})")]
        public IHttpActionResult GetCharacteristicListByStandardAndDimension(int dimensionOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var helper = new AssessmentHelper(_db);

            var charList = helper.GetCharacteristicListByFramework(currentFramework.Value)
              .Where(x => x.Principle1.Dimension == dimensionOid && x.Principle1.Dimension1.GCRecord == null)
                .Select(CloneCharacteristic);

            return Ok(charList);
        }

        /// <summary>
        /// Returns list of Characteristics related with current6 Framewrok and specific PrincipleGroup. Characteristic represented as root element, withoud referenced entities
        /// </summary>
        /// <param name="principleGroupOid">Oid of PrincipleGroup</param>
        /// <returns>list of Characteristics related with current6 Framewrok and specific PrincipleGroup</returns>
        [Authorize]
        [Route("api/Characteristics/GetByCurrentFrameworkAndPrincipleGroup({principleGroupOid})")]
        public IHttpActionResult GetCharacteristicsByCurrentFrameworkAndPrincipleGroup(int principleGroupOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var helper = new AssessmentHelper(_db);

            var charList = helper.GetCharacteristicListByFramework(currentFramework.Value)
              .Where(x => x.PrincipleGroup == principleGroupOid && x.GCRecord == null)
                .Select(CloneCharacteristic);

            return Ok(charList);
        }

        /// <summary>
        /// Returns list of Characteristics related with current6 Framewrok and specific PrincipleGroup. Each Characteristic represented as CharacteristicDTO
        /// </summary>
        /// <param name="principleGroupOid">Oid of PrincipleGroup</param>
        /// <returns>list of <code>CharacteristicDTO</code></returns>
        [Authorize]
        [Route("api/Characteristics/GetByCurFrameworkAndPrincipleGroup({principleGroupOid})")]
        public IHttpActionResult GetCharacteristicsByCurFrameworkAndPrincipleGroup(int principleGroupOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == currentFramework && x.Characteristic.GCRecord == null && x.Characteristic.PrincipleGroup == principleGroupOid).Select(x => x.Characteristic);

            var dataSetOid = _db.SPADataSets.Where(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).Select(x => x.OID).FirstOrDefault();
            var unansweredCharacteristics = frameworkCharacteristics
                .SelectMany(x => x.QuestionQuestions_CharacteristicCharacteristics).Where(x => x.Question.Answers.All(z => z.DataSet != dataSetOid)).Select(x => x.Characteristics.Value).ToList();

            var charlist = new List<CharacteristicDTO>();
            foreach (var characteristic in frameworkCharacteristics)
            {
                var unansweredQuestionsOids = characteristic.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.Count(x => x.SPADataSets == dataSetOid) > 0 ? new int[0] : unansweredCharacteristics.Where(y => y == characteristic.OID).ToArray();
                charlist.Add(new CharacteristicDTO() { OID = characteristic.OID, Title = characteristic.Title, Answers = unansweredQuestionsOids });
            }
            return Ok(charlist);
        }


        #region Pri
        /// <summary>
        /// List of prior characteristics by specific PrincipleGroup
        /// </summary>
        /// <param name="principleGroupOid">Oid of PrincipleGroup</param>
        /// <returns><code>PrioritisationCharacteristicDTO</code> list</returns>
        [Authorize]
        [Route("api/Characteristics/GetPriorByPrincipleGroup({principleGroupOid})")]
        public IHttpActionResult GetPriorCharacteristicsByCurFrameworkAndPrincipleGroup(int principleGroupOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var frameworkCharacteristics = principleGroupOid <= 0 ? _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == currentFramework && x.Characteristic.GCRecord == null).Select(x => x.Characteristic) :
                _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == currentFramework && x.Characteristic.GCRecord == null && x.Characteristic.PrincipleGroup == principleGroupOid).Select(x => x.Characteristic);

            List<PrioritisationCharacteristicDTO> charlist = PreparePriorList(user.Unit, frameworkCharacteristics.ToList());
            return Ok(charlist);
        }

        /// <summary>
        /// List of prior characteristics by specific Principle and PrincipleGroup
        /// </summary>
        /// <param name="filter"><code>PriorListFilter</code> instance</param>
        /// <returns><code>PrioritisationCharacteristicDTO</code> list</returns>
        [Authorize]
        [HttpPost]
        [Route("api/Characteristics/GetPriorByPrincipleAndGroup")]
        public IHttpActionResult GetPriorCharacteristicsByCurFrameworkPrincipleAndGroup(PriorListFilter filter)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == currentFramework && x.Characteristic.GCRecord == null).Select(x => x.Characteristic).ToList();
            if (filter.principleGroupOid > 0)
            {
                frameworkCharacteristics = frameworkCharacteristics.Where(x => x.PrincipleGroup == filter.principleGroupOid).ToList();
            }
            if (filter.principleOid > 0)
            {
                frameworkCharacteristics = frameworkCharacteristics.Where(x => x.Principle == filter.principleOid).ToList();
            }
            List<PrioritisationCharacteristicDTO> charlist = PreparePriorList(user.Unit, frameworkCharacteristics);
            return Ok(charlist);
        }

        private List<PrioritisationCharacteristicDTO> PreparePriorList(Unit unit, IList<Characteristic> frameworkCharacteristics)
        {
            var dataSet = _db.SPADataSets.First(x => x.Framework.Value == unit.PrimaryFramework && x.AssessmentType == unit.CurrentAssessmentType && x.Unit.Value == unit.Oid);

            var charlist = new List<PrioritisationCharacteristicDTO>();
            var helper = new AssessmentHelper(_db);

            var dataSetList = _db.IndicatorDataSets.Where(ind => ind.Unit == unit.Oid
                                                  && ind.Grade1 != null
                                                  && ind.Grade1.ShortTitle.Equals(NotReviewedGrade)
                                                  && ind.GCRecord == null && ind.Framework == unit.PrimaryFramework).OrderBy(x => x.PeriodFromYear).ToList();

            foreach (var characteristic in frameworkCharacteristics.OrderBy(x => x.Principle1.Dimension).ThenBy(x => x.Reference))
            {
                var currPriorCharDTO = new PrioritisationCharacteristicDTO()
                {
                    OID = characteristic.OID,
                    Reference = characteristic.Reference,
                    AssessmentScore = helper.GetCharacteristicScore(characteristic, unit) ?? 0,
                    Risks = characteristic.NonFulfilmentRisks,
                    Statement = characteristic.Description,
                    Title = characteristic.Title,
                    IsPrior = dataSet.PriorCharacteristics.Any(x => x.Characteristic == characteristic.OID),
                    IsRelevant = dataSet.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.Any(x => x.NonRelevantCharacteristics == characteristic.OID),
                };
                var indicator = _db.IndicatorIndicators_FrameworkFrameworks.FirstOrDefault(x => x.Frameworks == unit.PrimaryFramework && x.Indicator.Characteristic1.Reference.Equals(characteristic.Reference))?.Indicator;
                if (indicator != null)
                {
                    currPriorCharDTO.IndicatorOID = indicator.OID;
                    var trend = ReportsController.GetTrend(indicator, dataSetList);
                    currPriorCharDTO.IsHashedRed = trend.All(x => double.IsNaN(x));
                    var score = ReportsController.GetScore(trend);
                    if (trend.All(x => !double.IsNaN(x)))
                    {
                        score = score * indicator.Conversion.GetValueOrDefault();
                    }
                    if (indicator.TresholdValue.HasValue && trend.Any())
                    {
                        var result = trend.LastOrDefault();
                        if (indicator.Conversion.HasValue && indicator.Conversion > 0)
                        {
                            if (result < (double)indicator.TresholdValue.Value)
                            {
                                score = -50;
                            }
                            else if (indicator.Conversion.HasValue && indicator.Conversion < 0)
                            {
                                if (result > (double)indicator.TresholdValue.Value)
                                {
                                    score = -50;
                                }
                            }
                        }
                    }
                    currPriorCharDTO.IndicatorScore = score;
                }
                charlist.Add(currPriorCharDTO);
            }
            return charlist;
        }

        /// <summary>
        /// Returns ordered PriorCharacteristics list by specific PrincipleGroup
        /// </summary>
        /// <param name="principleGroupOid">Oid of PrincipleGroup</param>
        /// <returns><code>PriorCharacteristicDTO</code> list</returns>
        [Authorize]
        [Route("api/Characteristics/GetTopPriorByPrincipleGroup({principleGroupOid})")]
        public IHttpActionResult GetTopPriorCharacteristicsByCurFrameworkAndPrincipleGroup(int principleGroupOid)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSet = _db.SPADataSets.FirstOrDefault(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            if (dataSet == null) return BadRequest("Assessment need to be started first");

            var priorCharacteristics = principleGroupOid <= 0
                ? dataSet.PriorCharacteristics
                : dataSet.PriorCharacteristics.Where(x => x.Characteristic1.PrincipleGroup == principleGroupOid);
            return Ok(priorCharacteristics.OrderBy(x => x.Order).Select(x => new PriorCharacteristicDTO() { OID = x.Characteristic1.OID, Title = x.Characteristic1.Title, Reference = x.Characteristic1.Reference, Order = x.Order.Value, ShortTitle = x.Characteristic1.ShortTitle }).ToList());
        }

        /// <summary>
        /// POST Method for adding Characteristic to PriorCharacteristics list based on current Unit info
        /// </summary>
        /// <param name="priorCharacteristicsOid">Oid of Characteristic</param>
        /// <returns>Ok - if succeeded</returns>
        [Route("api/Characteristics/AddPriorCharacteristic({priorCharacteristicsOid})")]
        [HttpPost]
        public IHttpActionResult AddPriorCharacteristic(int priorCharacteristicsOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSet = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            var maxOrder = dataSet.PriorCharacteristics.Max(x => x.Order);
            if (dataSet.PriorCharacteristics.All(x => x.Characteristic != priorCharacteristicsOid))
                dataSet.PriorCharacteristics.Add(new PriorCharacteristic() { Characteristic = priorCharacteristicsOid, SPADataSet = dataSet, Order = maxOrder == null ? 0 : maxOrder + 1 });
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

            return Ok();
        }

        /// <summary>
        /// POST Method for set Order of PriorCharacteristic
        /// </summary>
        /// <param name="priorCharacteristic"><code>PriorCharacteristicDTO</code> instance</param>
        /// <returns>Ok - if succeeded</returns>
        [Route("api/Characteristics/SetPriorCharacteristicOrder")]
        [HttpPost]
        public IHttpActionResult SetPriorCharacteristicOrder(PriorCharacteristicDTO priorCharacteristic)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSet = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            var priorChar = dataSet.PriorCharacteristics.FirstOrDefault(x => x.Characteristic == priorCharacteristic.OID);
            if (priorChar == null) return BadRequest("Prior Characteristic not found. Oid=" + priorCharacteristic.OID);
            var secondChar = dataSet.PriorCharacteristics.FirstOrDefault(x => x.Order == priorCharacteristic.Order);
            if (secondChar == null) return BadRequest("Prior Characteristic not found. Order=" + priorCharacteristic.Order);
            secondChar.Order = priorChar.Order;
            priorChar.Order = priorCharacteristic.Order;
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

            return Ok();
        }

        /// <summary>
        /// Method for Characteristic Score recalculation - used by Web Jobs
        /// </summary>
        /// <param name="unitOid">Oid of <code>Unit</code></param>
        /// <returns>Ok - if succeeded</returns>
        [HttpGet]
        public IHttpActionResult RecalcCharacteristicUnitScores([FromODataUri] Guid unitOid)
        {
            try
            {
                var unit = _db.Units.Find(unitOid);
                var helper = new AssessmentHelper(_db);
                RecalcUnitCharacteristicScores(helper, unit);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Recalculation error: " + ex.ToString());
            }
        }

        /// <summary>
        /// Method for Characteristic Score recalculation for all existed Units - used by Web Jobs
        /// </summary>
        /// <returns>Ok - if succeeded</returns>
        [HttpGet]
        public IHttpActionResult RecalcAllCharacteristicScores()
        {
            var units = _db.Units.Where(x => x.PrimaryFramework.HasValue && x.CurrentAssessmentType.HasValue && x.Organization.Party.GCRecord == null);
            var helper = new AssessmentHelper(_db);
            try
            {
                foreach (var unit in units)
                {
                    RecalcUnitCharacteristicScores(helper, unit);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Recalculation error: " + ex.ToString());
            }
            return Ok();
        }

        private void RecalcUnitCharacteristicScores(AssessmentHelper helper, Unit unit)
        {
            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == unit.PrimaryFramework.Value && x.Characteristic.GCRecord == null).Select(x => x.Characteristic).ToList();
            foreach (var characteristic in frameworkCharacteristics)
            {
                var score = helper.CalculateCharacteristicScore(characteristic, unit);
                if (score != null)
                {
                    using (var db = new BlueNorthEntities())
                    {
                        var charScore = db.UnitCharacteristicScores.FirstOrDefault(x => x.Unit == unit.Oid && x.Characteristic == characteristic.OID && x.Framework == unit.PrimaryFramework);
                        if (charScore == null)
                        {
                            charScore = new UnitCharacteristicScore() { Unit = unit.Oid, Characteristic = characteristic.OID, Framework = unit.PrimaryFramework };
                            charScore = db.UnitCharacteristicScores.Add(charScore);
                            db.SaveChanges();
                        }
                        charScore.Score = score;
                        charScore.Calculated = DateTime.Now;
                        db.SaveChanges();
                    }
                }

            }
        }

        /// <summary>
        /// Method for removing Characteristic to PriorCharacteristics list based on current Unit info
        /// </summary>
        /// <param name="priorCharacteristicOid">Oid of Characteristic</param>
        /// <returns>Ok - if succeeded</returns>
        [Route("api/Characteristics/RemovePriorCharacteristic({priorCharacteristicOid})")]
        public IHttpActionResult RemovePriorCharacteristic(int priorCharacteristicOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSet = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            var existedPriorCharacteristic = dataSet.PriorCharacteristics.FirstOrDefault(x => x.Characteristic == priorCharacteristicOid);

            if (existedPriorCharacteristic == null) return BadRequest("Not found prioir Characteristic for current SPADataset with Oid=" + priorCharacteristicOid);

            _db.PriorCharacteristics.Remove(existedPriorCharacteristic);
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

            return Ok();
        }

        #endregion
        /// <summary>
        /// NOT IN USE
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        // DELETE: odata/Characteristics(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            var characteristic = _db.Characteristics.Find(key);
            if (characteristic == null) return NotFound();

            _db.Characteristics.Remove(characteristic);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacteristicExists(key))
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

        private bool CharacteristicExists(int key)
        {
            return _db.ImprovementPlanItems.Count(e => e.OID == key) > 0;
        }

        public class PriorListFilter
        {
            public int principleGroupOid { get; set; }
            public int principleOid { get; set; }
        }
    }
}
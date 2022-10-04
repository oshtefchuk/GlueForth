using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;

namespace BlueNorth.WebApi
{
    [ApiExplorerSettings(IgnoreApi = false)]
    public class StandardsController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        /// <summary>
        /// Returns list of all Standards. Standard represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all Standards</returns>
        public IEnumerable<Standard> GetStandards()
        {
            return _db.Standards.Select(CloneStandard).Where(cloned => cloned != null);
        }

        /// <summary>
        /// Get Standard by OID
        /// </summary>
        /// <param name="key">OID of Standard</param>
        /// <returns>Standard represented as root element, withoud referenced entities</returns>
        [Route("api/Standards({key})")]
        public IHttpActionResult GetStandard(int key)
        {
            var standard = _db.Standards.SingleOrDefault(x => x.OID == key);
            var cloned = CloneStandard(standard);
            return cloned == null ? (IHttpActionResult)NotFound() : Ok(cloned);
        }

        /// <summary>
        /// Returns list of speficic Commodity Standards. Standard represented as root element, withoud referenced entities
        /// </summary>
        /// <param name="key">Commodity OID</param>
        /// <returns>list of Commodity Standards</returns>
        [Route("api/Standards/ByCommodity")]
        public IEnumerable<Standard> GetByCommodity(int key)
        {
            var standardList = _db.Standards
                .Where(x => x.StandardStandards_CommodityCommodities.Any(y => y.Commodity.OID == key)).ToList();

            return standardList.Select(CloneStandard).Where(cloned => cloned != null);
        }


        /// <summary>
        /// Returns list of speficic Unit Standards. Standard represented as root element, withoud referenced entities
        /// </summary>
        /// <param name="unitId">Unit OID</param>
        /// <returns>list of Unit Standards</returns>
        [Route("api/Standards/ByUnit({unitId})")]
        public IHttpActionResult GetByUnit(Guid unitId)
        {
            var unit = _db.Units.Find(unitId);

            return Ok(unit.UnitUnits_StandardStandards.Select(x => CloneStandard(x.Standard)));
        }

        /// <summary>
        /// Returns list of speficic Framework Standards. Framework represented as root element, withoud referenced entities
        /// </summary>
        /// <param name="unitId">Framework OID</param>
        /// <returns>list of Framework Standards</returns>
        [Route("api/Standards/ByFramework({frameworkId})")]
        public IEnumerable<Standard> GetByByFramework(int frameworkId)
        {
            var standards = _db.Frameworks.Find(frameworkId).FrameworkFrameworks_CommodityCommodities
                .Select(x => x.Commodity).SelectMany(x => x.StandardStandards_CommodityCommodities).Select(x => x.Standard).Distinct().ToList();
            standards.ForEach(x => x.LogoImage = null);
            return standards.Select(x => CloneStandard(x));
        }

        /// <summary>
        /// Returns list of current User.CurrentUnit Standards. Standard represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of current Unit Standards</returns>
        [Route("api/Standards/ByCurrentUnit")]
        [Authorize]
        public IHttpActionResult GetByCurrentUnit()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            var standards = user.Unit.UnitUnits_StandardStandards.Select(x => x.Standard);
            foreach (var standard in standards)
            {
                var nonCompliants = GetNonCompliantPoints(standard, user.Unit);
                standard.GCRecord = nonCompliants.Count; //- planned;
            }
            standards = standards.Select(x => CloneStandard(x));
            return Ok(standards);
        }


        private List<Question> GetNonCompliantPoints(Standard standard, Unit unit)
        {
            var controlPoints = standard.StandardChapters.SelectMany(y => y.StandardContents);
            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == unit.PrimaryFramework.Value && x.AssessmentType == 0 && x.Unit.Value == unit.Oid).OID;
            var nonCompliantPoints = new List<StandardStatusDTO>();
            var result = new List<Question>();
            foreach (var controlPoint in controlPoints)
            {
                var characteristics = unit.Framework.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => controlPoint.StandardContentStandardContents_CharacteristicCharacteristics.Any(y => y.Characteristic.Reference.Equals(x.Characteristic.Reference))).Select(x => x.Characteristic).ToList();
                var controlPointQuestionGroupsIDs = controlPoint.StandardContentStandardContents_QuestionGroupQuestionGroups.Select(x => x.QuestionGroups).Distinct();
                foreach (var characteristic in characteristics)
                {
                    var benchmarkedQuestions = characteristic.QuestionQuestions_CharacteristicCharacteristics.Where(x => controlPointQuestionGroupsIDs.Contains(x.Question.Group)).Select(z => z.Question);
                    foreach (var question in benchmarkedQuestions)
                    {
                        var answer = question.Answers.FirstOrDefault(z => z.DataSet == dataSetOid && z.Characteristic == characteristic.OID);
                        if ((answer == null || answer.Choice != question.DefaultAnswer))
                        {
                            result.Add(question);
                        }
                    }
                    //if (result.Contains(question)) break;
                }
            }
            return result;
        }

        /// <summary>
        /// Returns list of current User.CurrentUnit Standards with calculated Status 
        /// </summary>
        /// <returns>list of current Unit Standards</returns>
        [Route("api/Standards/GetStatusesByCurrentUnit")]
        [Authorize]
        public IHttpActionResult GetStatuesesByCurrentUnit()
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            var controlPoints = user.Unit.UnitUnits_StandardStandards.SelectMany(x => x.Standard.StandardChapters).SelectMany(y => y.StandardContents);
            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == user.Unit.PrimaryFramework.Value && x.AssessmentType == 0 && x.Unit.Value == user.Unit.Oid).OID;
            var nonCompliantPoints = new List<StandardStatusDTO>();
            foreach (var controlPoint in controlPoints)
            {

                foreach (var characteristic in controlPoint.StandardContentStandardContents_CharacteristicCharacteristics)
                {
                    var benchmarkedQuestions = characteristic.Characteristic.QuestionQuestions_CharacteristicCharacteristics.Where(x => x.Characteristic.QuestionGroupQuestionGroups_CharacteristicCharacteristics.Any(y => x.Question.Group == y.QuestionGroups)).Select(z => z.Question);
                    if (benchmarkedQuestions.Any(x => x.Answers.Count(y => y.DataSet == dataSetOid && y.Characteristic == characteristic.Characteristics && y.Choice == 3) == 0))
                    {
                        nonCompliantPoints.Add(new StandardStatusDTO()
                        {
                            Reference = characteristic.Characteristic.Reference,
                            Title = controlPoint.StandardChapter1.Standard1.Title,
                            Description = controlPoint.Description,
                            Status = (characteristic.Characteristic.PriorCharacteristics.All(x => x.DataSet != dataSetOid) ? "NOT " : "") + "IN ACTION PLAN"
                        });
                    }
                }
            }
            return Ok(nonCompliantPoints);
        }
        /// <summary>
        /// Returns list of non-compliant current User.CurrentUnit Standards data for Standards page
        /// </summary>
        /// <param name="filter"><code>StandardsStateFilter</code> instance</param>
        /// <returns><code>StandardStatusDTO</code> list</returns>
        [Route("api/Standards/GetCurrentUnitStatuses")]
        [Authorize]
        [HttpPost]
        public IHttpActionResult GetCurrentUnitStatuses(StandardsStateFilter filter)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            var controlPoints = filter.StandardOid > 0 ? _db.Standards.Find(filter.StandardOid).StandardChapters.SelectMany(y => y.StandardContents) : user.Unit.UnitUnits_StandardStandards.SelectMany(x => x.Standard.StandardChapters).SelectMany(y => y.StandardContents).OrderBy(x => x.Reference);
            int zxcy;
            controlPoints = controlPoints.OrderBy(x => x.Reference.Replace('.', ' ').Split(' ')[0]).ThenBy(y => int.TryParse(y.Reference.Replace('.', ' ').Split(' ')[1], out zxcy) ? int.Parse(y.Reference.Replace('.', ' ').Split(' ')[1]) : y.Reference.Replace('.', ' ').Split(' ')[1].Length);
            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == user.Unit.PrimaryFramework.Value && x.AssessmentType == 0 && x.Unit.Value == user.Unit.Oid).OID;
            var nonCompliantPoints = new List<StandardStatusDTO>();
            foreach (var controlPoint in controlPoints)
            {
                var characteristics = user.Unit.Framework.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => controlPoint.StandardContentStandardContents_CharacteristicCharacteristics.Any(y => y.Characteristic.Reference.Equals(x.Characteristic.Reference))).Select(x => x.Characteristic).ToList();
                if (filter.CharacteristicOid > 0)
                {
                    characteristics = characteristics.Where(x => x.OID == filter.CharacteristicOid).ToList();
                }
                if (filter.PrincipleGroupOid > 0)
                {
                    characteristics = characteristics.Where(x => x.PrincipleGroup == filter.PrincipleGroupOid).ToList();
                }
                var controlPointQuestionGroupsIDs = controlPoint.StandardContentStandardContents_QuestionGroupQuestionGroups.Select(x => x.QuestionGroups).Distinct();
                foreach (var characteristic in characteristics)
                {
                    var benchmarkedQuestions = characteristic.QuestionQuestions_CharacteristicCharacteristics.Where(x => controlPointQuestionGroupsIDs.Contains(x.Question.Group)).Select(z => z.Question);
                    if (filter.QuestionGroupOid > 0)
                    {
                        benchmarkedQuestions = benchmarkedQuestions.Where(x => x.Group == filter.QuestionGroupOid);
                    }
                    var grouped = benchmarkedQuestions.GroupBy(x => x.QuestionGroup);
                    foreach (var group in grouped)
                    {
                        foreach (var question in group)
                        {
                            var answer = question.Answers.FirstOrDefault(z => z.DataSet == dataSetOid && z.Characteristic == characteristic.OID);
                            if (answer == null || answer.Choice != question.DefaultAnswer)
                            {
                                nonCompliantPoints.Add(new StandardStatusDTO()
                                {
                                    Reference = characteristic.Reference,
                                    ShortTitle = controlPoint.StandardChapter1.Standard1.ShortTitle,
                                    Title = controlPoint.StandardChapter1.Standard1.Title,
                                    StandardContentRef = controlPoint.Reference,
                                    Description = controlPoint.Description,
                                    Choice = answer == null ? -1 : answer.Choice.GetValueOrDefault(),  //Math.Round(score / group.Count() * 100, 2).ToString() + "%",
                                    DefaultChoice = question.DefaultAnswer.GetValueOrDefault(),
                                    CharacteristicOid = characteristic.OID,
                                    StandardContentOid = controlPoint.OID,
                                    CharacteristicName = characteristic.Title,
                                    QuestionGroup = group.Key.Title,
                                    TasksCount = characteristic.ImprovementPlanItems.Sum(x =>  x.StandardContentStandardContents_ImprovementPlanItemImprovementPlanItems.Count(y=> y.StandardContents == controlPoint.OID))
                                });
                            }
                        }
                    }
                }
            }
            return Ok(nonCompliantPoints);
        }

        /// <summary>
        /// Returns list of all current User.CurrentUnit Standards data for Standards page
        /// </summary>
        /// <param name="filter"><code>StandardsStateFilter</code> instance</param>
        /// <returns><code>StandardStatusDTO</code> list</returns>
        [Route("api/Standards/GetCurrentUnitAllStatuses")]
        [Authorize]
        [HttpPost]
        public IHttpActionResult GetCurrentUnitAllStatuses(StandardsStateFilter filter)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);
            var controlPoints = filter.StandardOid > 0 ? _db.Standards.Find(filter.StandardOid).StandardChapters.SelectMany(y => y.StandardContents) : user.Unit.UnitUnits_StandardStandards.SelectMany(x => x.Standard.StandardChapters).SelectMany(y => y.StandardContents).ToList();
            var ref2 = controlPoints.Select(y => y.Reference + " {-} " + y.Reference.Replace('.', ' ').Split(' ')[1]).ToList();
            int zxcy;
            controlPoints = controlPoints.OrderBy(x => x.Reference.Replace('.', ' ').Split(' ')[0]).ThenBy(y => int.TryParse(y.Reference.Replace('.', ' ').Split(' ')[1], out zxcy) ? int.Parse(y.Reference.Replace('.', ' ').Split(' ')[1]) : y.Reference.Replace('.', ' ').Split(' ')[1].Length);
            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == user.Unit.PrimaryFramework.Value && x.AssessmentType == 0 && x.Unit.Value == user.Unit.Oid).OID;
            var nonCompliantPoints = new List<StandardStatusDTO>();
            foreach (var controlPoint in controlPoints)
            {
                var characteristics = user.Unit.Framework.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => controlPoint.StandardContentStandardContents_CharacteristicCharacteristics.Any(y => y.Characteristic.Reference.Equals(x.Characteristic.Reference))).Select(x => x.Characteristic).ToList();
                if (!characteristics.Any())
                {//995 we have no assigned questions - 
                    nonCompliantPoints.Add(new StandardStatusDTO()
                    {
                        Reference = "Beyond Scope of Assessment",
                        ShortTitle = controlPoint.StandardChapter1.Standard1.ShortTitle,
                        Title = controlPoint.StandardChapter1.Standard1.Title,
                        StandardContentRef = controlPoint.Reference,
                        Description = controlPoint.Description,
                        StandardContentOid = controlPoint.OID,
                        CharacteristicName = "Beyond Scope of Assessment",
                        QuestionGroup = "Beyond Scope of Assessment"
                    });
                }
                else
                {
                    if (filter.CharacteristicOid > 0)
                    {
                        characteristics = characteristics.Where(x => x.OID == filter.CharacteristicOid).ToList();
                    }
                    if (filter.PrincipleGroupOid > 0)
                    {
                        characteristics = characteristics.Where(x => x.PrincipleGroup == filter.PrincipleGroupOid).ToList();
                    }
                    var controlPointQuestionGroupsIDs = controlPoint.StandardContentStandardContents_QuestionGroupQuestionGroups.Select(x => x.QuestionGroups).Distinct();
                    foreach (var characteristic in characteristics)
                    {
                        var benchmarkedQuestions = characteristic.QuestionQuestions_CharacteristicCharacteristics.Where(x => controlPointQuestionGroupsIDs.Contains(x.Question.Group)).Select(z => z.Question);
                        var qty = benchmarkedQuestions.Count();
                        if (filter.QuestionGroupOid > 0)
                        {
                            benchmarkedQuestions = benchmarkedQuestions.Where(x => x.Group == filter.QuestionGroupOid);
                        }
                        var grouped = benchmarkedQuestions.GroupBy(x => x.QuestionGroup);
                        foreach (var group in grouped)
                        {
                            foreach (var question in group)
                            {

                                var answer = question.Answers.FirstOrDefault(z => z.DataSet == dataSetOid && z.Characteristic == characteristic.OID);
                                nonCompliantPoints.Add(new StandardStatusDTO()
                                {
                                    Reference = characteristic.Reference,
                                    ShortTitle = controlPoint.StandardChapter1.Standard1.ShortTitle,
                                    Title = controlPoint.StandardChapter1.Standard1.Title,
                                    StandardContentRef = controlPoint.Reference,
                                    Description = controlPoint.Description,
                                    Choice = answer == null ? -1 : answer.Choice.GetValueOrDefault(),  //Math.Round(score / group.Count() * 100, 2).ToString() + "%",
                                    DefaultChoice = question.DefaultAnswer.GetValueOrDefault(),
                                    CharacteristicOid = characteristic.OID,
                                    StandardContentOid = controlPoint.OID,
                                    CharacteristicName = characteristic.Title,
                                    QuestionGroup = group.Key.ShortTitle,
                                    TasksCount = characteristic.ImprovementPlanItems.Sum(x => x.StandardContentStandardContents_ImprovementPlanItemImprovementPlanItems.Count(y => y.StandardContents == controlPoint.OID))
                                });
                            }
                        }
                        if (!grouped.Any())
                        {//995 we have no assigned questions - 
                            nonCompliantPoints.Add(new StandardStatusDTO()
                            {
                                Reference = characteristic.Reference,
                                ShortTitle = controlPoint.StandardChapter1.Standard1.ShortTitle,
                                Title = controlPoint.StandardChapter1.Standard1.Title,
                                StandardContentRef = controlPoint.Reference,
                                Description = controlPoint.Description,
                                CharacteristicOid = characteristic.OID,
                                StandardContentOid = controlPoint.OID,
                                CharacteristicName = characteristic.Title,
                                QuestionGroup = "Beyond Scope of Assessment",
                                TasksCount = characteristic.ImprovementPlanItems.Sum(x => x.StandardContentStandardContents_ImprovementPlanItemImprovementPlanItems.Count(y => y.StandardContents == controlPoint.OID))
                            });
                        }
                    }
                }
            }
            return Ok(nonCompliantPoints);
        }

        private Standard CloneStandard(Standard standard)
        {
            if (standard.Version1?.Deleted == true) return null;
            return (Standard)_db.Entry(standard).CurrentValues.ToObject();
        }

        /// <summary>
        /// Set current Unit Standards
        /// </summary>
        /// <param name="standardOids">array of Standard Oids</param>
        /// <returns>Ok - if suceeded</returns>
        [Route("api/Standards/UpdateCurrentUnitSet")]
        [Authorize]
        public IHttpActionResult UpdateCurrentUnitSet(int[] standardOids)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            foreach (var unitStandard in user.Unit.UnitUnits_StandardStandards.ToList())
            {
                if (!standardOids.Contains(unitStandard.Standard.OID))
                {
                    _db.UnitUnits_StandardStandards.Remove(unitStandard);
                }
            }
            foreach (var standardOid in standardOids)
            {
                if (user.Unit.UnitUnits_StandardStandards.All(x => x.Standards != standardOid))
                {
                    _db.UnitUnits_StandardStandards.Add(new UnitUnits_StandardStandards() { Standards = standardOid, Units = user.Unit.Oid });
                }
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
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) _db.Dispose();
            base.Dispose(disposing);
        }
    }

    public class StandardsStateFilter
    {
        public int CharacteristicOid { get; set; }
        public int PrincipleGroupOid { get; set; }
        public int QuestionGroupOid { get; set; }
        public int StandardOid { get; set; }
    }
}
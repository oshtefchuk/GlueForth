using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using BlueNorth.WebApi.DTOs;
using static BlueNorth.WebApi.ReportsController;

namespace BlueNorth.WebApi.Helpers
{
    public class AssessmentHelper : IDisposable
    {
        private readonly BlueNorthEntities _db;
        private readonly string[] _liteQuestionGroups;

        public AssessmentHelper(BlueNorthEntities db)
        {
            var liteGroupsFromConfig = ConfigurationManager.AppSettings["LiteQuestionGroups"].ToLower();
            _liteQuestionGroups = liteGroupsFromConfig.Split(';');
            _db = db;
        }

        public void Dispose()
        {
            _db.Dispose();
        }

        #region Characteristic
        public List<Characteristic> GetCharacteristicListByFramework(int frameworkOid)
        {
            return _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == frameworkOid && x.Characteristic.GCRecord == null).Select(x => x.Characteristic).ToList();
        }

        #endregion

        #region Principle

        private List<Principle> GetPrincipleListByFramework(int frameworkOid)
        {
            var chainedList = GetCharacteristicListByFramework(frameworkOid);

            var principleList = chainedList
                .Where(x => x.Principle != null)
                .Select(x => x.Principle1)
                .ToList();

            return principleList;
        }

        public List<PrincipleDTO> GetPrincipleDtoList(Unit unit)
        {
            var frameworkOid = unit.PrimaryFramework.Value;
            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == frameworkOid && x.Characteristic.GCRecord == null).Select(x => x.Characteristic).OrderBy(x => x.Principle1.Order).ToList();

            var principleList = frameworkCharacteristics.GroupBy(y => y.Principle1);

            var principleDtoList = new List<PrincipleDTO>();
            var dataSetOid = _db.SPADataSets.Where(x => x.Framework.Value == frameworkOid && x.AssessmentType == unit.CurrentAssessmentType && x.Unit.Value == unit.Oid).Select(x => x.OID).FirstOrDefault();

            if (unit.CurrentAssessmentType == 0)
            {
                var unansweredCharacteristics = frameworkCharacteristics.SelectMany(x => x.QuestionQuestions_CharacteristicCharacteristics).Where(x => x.Question.Answers.All(z => z.DataSet != dataSetOid || z.GCRecord != null)).Select(x => x.Characteristics.Value).ToList();
                foreach (var pGroup in principleList)
                {
                    var unansweredCharacteristicsQty =
                        pGroup.Key.Characteristics.Count(x => x.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.Count(y => y.SPADataSets == dataSetOid) == 0 && unansweredCharacteristics.Contains(x.OID));

                    principleDtoList.Add(new PrincipleDTO(pGroup.Key) { CharacteristicsCount = unansweredCharacteristicsQty });
                }
            }
            else
            {
                foreach (var pGroup in principleList)
                {
                    var unansweredCharacteristics = 0;
                    foreach (var ch in pGroup)
                    {
                        var question1 = ch.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                            .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                            .Where(x => _liteQuestionGroups[0].Equals(x.Title.ToLower()))
                            .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);

                        var question2 = ch.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                            .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                            .Where(x => _liteQuestionGroups[1].Equals(x.Title.ToLower()))
                            .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);
                        var answer1 = question1.Answers.FirstOrDefault(x => x.Characteristic == ch.OID && x.DataSet == dataSetOid && x.GCRecord == null);
                        var answer2 = question2.Answers.FirstOrDefault(x => x.Characteristic == ch.OID && x.DataSet == dataSetOid && x.GCRecord == null);
                        if (answer1 == null || answer2 == null) unansweredCharacteristics++;
                    }
                    principleDtoList.Add(new PrincipleDTO(pGroup.Key) { CharacteristicsCount = unansweredCharacteristics });
                }
            }

            return principleDtoList;
        }
        public List<PrincipleDTO> GetPrincipleStatusDtoList(Unit unit)
        {
            var frameworkOid = unit.PrimaryFramework.Value;
            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == frameworkOid && x.Characteristic.GCRecord == null).Select(x => x.Characteristic);

            var principleList = frameworkCharacteristics.GroupBy(y => y.Principle1);

            var principleDtoList = new List<PrincipleDTO>();
            var dataSetOid = _db.SPADataSets.Where(x => x.Framework.Value == frameworkOid && x.AssessmentType == unit.CurrentAssessmentType && x.Unit.Value == unit.Oid).Select(x => x.OID).FirstOrDefault();
            var frameworkCharacteristicsIds = unit.Framework.FrameworkFrameworks_CharacteristicCharacteristics.Select(x => x.Characteristics).ToList();

            foreach (var pGroup in principleList)
            {
                var groupQuestionsCount = 0;
                var principleCharacteristics = unit.Framework.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Characteristic.Principle == pGroup.Key.OID && x.Characteristic.GCRecord == null).Select(x => x.Characteristics).ToList();
                var answeredCharacteristicsCount = 0;
                foreach (var charId in principleCharacteristics)
                {

                    if (unit.CurrentAssessmentType == 1)
                    {
                        groupQuestionsCount = _db.QuestionGroupQuestionGroups_CharacteristicCharacteristics.Where(x => x.Characteristics == charId)
                        .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                        .Where(x => _liteQuestionGroups.Contains(x.Title.ToLower()))
                        .SelectMany(y => y.Questions).Count(x => x.GCRecord == null);
                    }
                    else
                        groupQuestionsCount = _db.QuestionQuestions_CharacteristicCharacteristics.Count(x => x.Characteristics == charId && x.Question.GCRecord == null);

                    var answersCount = _db.Answers.Count(x => x.GCRecord == null && x.SPADataSet.OID == dataSetOid && x.Characteristic == charId);
                    if (groupQuestionsCount == answersCount) answeredCharacteristicsCount++;
                }
                principleDtoList.Add(new PrincipleDTO(pGroup.Key, principleCharacteristics.Count, principleCharacteristics.Count - answeredCharacteristicsCount));
            }
            return principleDtoList;
        }

        #endregion

        #region Principle Group
        public List<PrincipleGroupDTO> GetPrincipleGroupList(Unit unit)
        {
            var frameworkOid = unit.PrimaryFramework.Value;
            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == frameworkOid && x.Characteristic.GCRecord == null).Select(x => x.Characteristic).ToList();

            var principleGroupList = frameworkCharacteristics.GroupBy(y => y.PrincipleGroup1);

            var principleGroupDtoList = new List<PrincipleGroupDTO>();
            var dataSetOid = _db.SPADataSets.Where(x => x.Framework.Value == frameworkOid && x.AssessmentType == unit.CurrentAssessmentType && x.Unit.Value == unit.Oid).Select(x => x.OID).FirstOrDefault();
            foreach (var pGroup in principleGroupList)
            {
                principleGroupDtoList.Add(new PrincipleGroupDTO(pGroup.Key));
            }
            return principleGroupDtoList;
        }


        /// <summary>
        /// Returns list of PrincipleGroups related to current AssessmentType and Framework as DTO's. 
        /// Result contains data about current SPA answering state:
        /// CharacteristicsCount - count of not completed Characteristics
        /// </summary>
        /// <param name="unit"></param>
        /// <returns>lsit of PrincipleGroup as DTO</returns>
        public List<PrincipleGroupDTO> GetPrincipleGroupDtoList(Unit unit)
        {
            var frameworkOid = unit.PrimaryFramework.Value;
            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == frameworkOid && x.Characteristic.GCRecord == null).Select(x => x.Characteristic).OrderBy(x=>x.PrincipleGroup1.Order).ToList();

            var principleGroupList = frameworkCharacteristics.GroupBy(y => y.PrincipleGroup1);

            var principleGroupDtoList = new List<PrincipleGroupDTO>();
            var dataSetOid = _db.SPADataSets.Where(x => x.Framework.Value == frameworkOid && x.AssessmentType == unit.CurrentAssessmentType && x.Unit.Value == unit.Oid).Select(x => x.OID).FirstOrDefault();
            if (unit.CurrentAssessmentType == 0)
            {
                var unansweredCharacteristics = frameworkCharacteristics.SelectMany(x => x.QuestionQuestions_CharacteristicCharacteristics).Where(x => x.Question.Answers.All(z => z.DataSet != dataSetOid || z.GCRecord != null)).Select(x => x.Characteristics.Value).ToList();
                foreach (var pGroup in principleGroupList)
                {
                    var unansweredCharacteristicsQty =
                        pGroup.Key.Characteristics.Count(x => x.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.Count(y => y.SPADataSets == dataSetOid) == 0 && unansweredCharacteristics.Contains(x.OID));

                    principleGroupDtoList.Add(new PrincipleGroupDTO(pGroup.Key) { CharacteristicsCount = unansweredCharacteristicsQty });
                }
            }
            else
            {
                foreach (var pGroup in principleGroupList)
                {
                    var unansweredCharacteristics = 0;
                    foreach (var ch in pGroup)
                    {
                        if (ch.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics.Any(y => y.SPADataSets == dataSetOid)) continue; //skip non relevant char-stics
                        var question1 = ch.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                            .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                            .Where(x => _liteQuestionGroups[0].Equals(x.Title.ToLower()))
                            .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);

                        var question2 = ch.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                            .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                            .Where(x => _liteQuestionGroups[1].Equals(x.Title.ToLower()))
                            .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);
                        var answer1 = question1.Answers.FirstOrDefault(x => x.Characteristic == ch.OID && x.DataSet == dataSetOid && x.GCRecord == null);
                        var answer2 = question2.Answers.FirstOrDefault(x => x.Characteristic == ch.OID && x.DataSet == dataSetOid && x.GCRecord == null);
                        if (answer1 == null || answer2 == null) unansweredCharacteristics++;
                    }
                    principleGroupDtoList.Add(new PrincipleGroupDTO(pGroup.Key) { CharacteristicsCount = unansweredCharacteristics });
                }
            }
            return principleGroupDtoList;
        }

        public List<PrincipleGroupDTO> GetPrincipleGroupStatusDtoList(Unit unit, int assessmentType)
        {
            var frameworkOid = unit.PrimaryFramework.Value;
            var frameworkCharacteristics = _db.FrameworkFrameworks_CharacteristicCharacteristics.Where(x => x.Frameworks == frameworkOid && x.Characteristic.GCRecord == null).Select(x => x.Characteristic).ToList();

            var principleGroupList = frameworkCharacteristics.GroupBy(y => y.PrincipleGroup1);

            var principleGroupDtoList = new List<PrincipleGroupDTO>();
            var dataSetOid = _db.SPADataSets.Where(x => x.Framework.Value == frameworkOid && x.AssessmentType == assessmentType && x.Unit.Value == unit.Oid).Select(x => x.OID).FirstOrDefault();
            var frameworkCharacteristicsIds = unit.Framework.FrameworkFrameworks_CharacteristicCharacteristics.Select(x => x.Characteristics).ToList();

            foreach (var pGroup in principleGroupList)
            {
                var groupQuestionsCount = 0;
                if (assessmentType == 1)
                {
                    groupQuestionsCount = _db.QuestionGroupQuestionGroups_CharacteristicCharacteristics.Where(x => frameworkCharacteristicsIds.Contains(x.Characteristics) && x.Characteristic.GCRecord == null && x.Characteristic.PrincipleGroup == pGroup.Key.OID)
                    .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                    .Where(x => _liteQuestionGroups.Contains(x.Title.ToLower()))
                    .SelectMany(y => y.Questions).Count(x => x.GCRecord == null);
                }
                else
                    groupQuestionsCount = _db.QuestionQuestions_CharacteristicCharacteristics.Count(x => frameworkCharacteristicsIds.Contains(x.Characteristics) && x.Question.GCRecord == null && x.Characteristic.GCRecord == null && x.Characteristic.PrincipleGroup == pGroup.Key.OID);

                var answersCount = _db.Answers.Count(x => x.GCRecord == null && x.SPADataSet.OID == dataSetOid && x.Characteristic1.PrincipleGroup == pGroup.Key.OID);
                principleGroupDtoList.Add(new PrincipleGroupDTO(pGroup.Key, groupQuestionsCount, groupQuestionsCount - answersCount));
            }
            return principleGroupDtoList;
        }
        #endregion

        #region Dimension

        private List<Dimension> GetDimensionListByStandard(int frameworkOid)
        {
            var chainedList = GetPrincipleListByFramework(frameworkOid);

            var dimensionList = chainedList
                .Where(x => x.Dimension1 != null)
                .Select(x => x.Dimension1)
                .ToList();

            return dimensionList;
        }

        public List<DimensionDTO> GetDimensionDtoList(Unit unit, bool liteAssessmentType)
        {
            var dimensionList = GetDimensionListByStandard(unit.PrimaryFramework.Value)
                .Where(cloned => cloned.GCRecord == null)                
                .Distinct().OrderBy(x=>x.Reference)
                .ToList();

            var dimensionDtoList = new List<DimensionDTO>();

            var dataSetOid = _db.SPADataSets.Where(x => x.Framework.Value == unit.PrimaryFramework.Value && (x.AssessmentType == (liteAssessmentType ? 1 : 0)) && x.Unit.Value == unit.Oid).Select(x => x.OID).FirstOrDefault();
            var liteGroupsFromConfig = ConfigurationManager.AppSettings["LiteQuestionGroups"].ToLower();
            var frameworkCharacteristicsIds = unit.Framework.FrameworkFrameworks_CharacteristicCharacteristics.Select(x => x.Characteristics).ToList();
            foreach (var dimension in dimensionList)
            {
                var dimensionQuestionsCount = 0;
                if (liteAssessmentType)
                {
                    dimensionQuestionsCount = _db.QuestionGroupQuestionGroups_CharacteristicCharacteristics.Where(x => frameworkCharacteristicsIds.Contains(x.Characteristics) && x.Characteristic.GCRecord == null && x.Characteristic.Principle1.Dimension == dimension.OID)
                    .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                    .Where(x => _liteQuestionGroups.Contains(x.Title.ToLower()))
                    .SelectMany(y => y.Questions).Count(x => x.GCRecord == null);
                }
                else
                    dimensionQuestionsCount = _db.QuestionQuestions_CharacteristicCharacteristics.Count(x => frameworkCharacteristicsIds.Contains(x.Characteristics) && x.Question.GCRecord == null && x.Characteristic.GCRecord == null && x.Characteristic.Principle1.Dimension == dimension.OID);

                var answersCount = _db.Answers.Count(x => x.GCRecord == null && x.SPADataSet.OID == dataSetOid && x.Characteristic1.Principle1.Dimension == dimension.OID);
                dimensionDtoList.Add(new DimensionDTO(dimension, dimensionQuestionsCount, dimensionQuestionsCount - answersCount));
            }

            return dimensionDtoList;
        }
        #endregion

        #region Clone

        public Characteristic CloneCharacteristic(Characteristic characteristic)
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

        public Principle ClonePrinciple(Principle principle)
        {
            //if (principle.Version1?.Deleted == true) return null;
            if (principle.GCRecord != null) return null;
            return (Principle)_db.Entry(principle).CurrentValues.ToObject();
        }

        public Dimension CloneDimension(Dimension dimension)
        {
            //if (principle.Version1?.Deleted == true) return null;
            if (dimension.GCRecord != null) return null;
            return (Dimension)_db.Entry(dimension).CurrentValues.ToObject();
        }

        #endregion

        #region Characteristic Score/Statues

        public int GetCharacteristicState(Characteristic characteristic, Unit unit)
        {
            var statusText = GetCharacteristicMatrix(characteristic, unit)?.StatusText;
            switch (statusText)
            {
                case "Off the Radar": return 0;
                case "Dabbling": return 1;
                case "Good Fortune": return 2;
                case "Making Preparations": return 3;
                case "Tentative Engagement": return 4;
                case "Over Stretched": return 5;
                case "Ready to Start": return 6;
                case "Well Underway": return 7;
                case "Fulfilled": return 8;
                default:
                    break;
            }
            return -1;
        }

        public double? GetCharacteristicScore(Characteristic characteristic, Unit unit)
        {
            return unit.UnitCharacteristicScores.FirstOrDefault(x => x.Characteristic == characteristic.OID && x.Framework == unit.PrimaryFramework)?.Score;
        }

        public double? CalculateCharacteristicScore(Characteristic characteristic, Unit unit)
        {
            if (unit.Framework.ScoringMode == 1)
            {//1310 - Straight score mode
                var dataset = _db.SPADataSets.FirstOrDefault(x => x.Framework.Value == unit.PrimaryFramework.Value && x.AssessmentType == unit.CurrentAssessmentType && x.Unit.Value == unit.Oid);
                var characteristQuestions = characteristic.QuestionQuestions_CharacteristicCharacteristics.Select(x => x.Question);
                var answers = characteristQuestions.SelectMany(x => x.Answers.Where(y => y.DataSet == dataset.OID && y.Characteristic == characteristic.OID));
                double answersScore = 0;
                foreach (var answer in answers)
                {
                    answersScore += (answer.Choice == (int)AnswerVariants.Partially ? 0.5 : (answer.Choice == (int)AnswerVariants.Yes ? 1 : 0));
                }
                var score = Math.Round((answersScore / characteristQuestions.Count()) * 100, 2);
                return score;
            }
            return GetCharacteristicMatrix(characteristic, unit)?.AdjScore.Value;
        }

        private StatusMatrix GetCharacteristicMatrix(Characteristic characteristic, Unit unit)
        {
            var dataset = _db.SPADataSets.FirstOrDefault(x => x.Framework.Value == unit.PrimaryFramework.Value && x.AssessmentType == unit.CurrentAssessmentType && x.Unit.Value == unit.Oid);
            if (dataset == null) return null;
            var datasetOid = dataset.OID;
            string code = unit.CurrentAssessmentType == 0 ? GetFullAssessmentCode(characteristic, datasetOid) : GetLiteAssessmentCode(characteristic, datasetOid);
            return _db.StatusMatrices.FirstOrDefault(x => x.Code == code);
        }

        private static string GetFullAssessmentCode(Characteristic characteristic, int datasetOid)
        {
            var groupMСQuestions = characteristic.QuestionQuestions_CharacteristicCharacteristics.Where(x => x.Question.QuestionGroup.ShortTitle.StartsWith("1")).Select(x => x.Question);
            var groupMСQuestionsCount = groupMСQuestions.Count();
            var groupMСQuestionsAnswers = groupMСQuestions.SelectMany(x => x.Answers.Where(y => y.DataSet == datasetOid && y.Characteristic == characteristic.OID));
            double groupMСQuestionsAnswersScore = 0;
            foreach (var answer in groupMСQuestionsAnswers)
            {
                groupMСQuestionsAnswersScore += (answer.Choice == (int)AnswerVariants.Partially ? 0.5 : (answer.Choice == (int)AnswerVariants.Yes ? 1 : 0));
            }
            var groupPIQuestions = characteristic.QuestionQuestions_CharacteristicCharacteristics.Where(x => x.Question.QuestionGroup.ShortTitle.StartsWith("2")).Select(x => x.Question);
            var groupPIQuestionsCount = groupPIQuestions.Count();
            var groupPIQuestionsAnswers = groupPIQuestions.SelectMany(x => x.Answers.Where(y => y.DataSet == datasetOid && y.Characteristic == characteristic.OID));
            double groupPIQuestionsAnswersScore = 0;
            foreach (var answer in groupPIQuestionsAnswers)
            {
                groupPIQuestionsAnswersScore += (answer.Choice == (int)AnswerVariants.Partially ? 0.5 : (answer.Choice == (int)AnswerVariants.Yes ? 1 : 0));
            }
            return groupMСQuestionsCount.ToString() + groupPIQuestionsCount.ToString() + groupMСQuestionsAnswersScore.ToString() + groupPIQuestionsAnswersScore.ToString();
        }

        private static string GetLiteAssessmentCode(Characteristic characteristic, int datasetOid)
        {
            var liteGroupsFromConfig = ConfigurationManager.AppSettings["LiteQuestionGroups"].ToLower();
            var liteQuestionGroups = liteGroupsFromConfig.Split(';');
            var groupMСQuestions = characteristic.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                                                .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                                                .Where(x => liteQuestionGroups[0].Equals(x.Title.ToLower()))
                                                .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);

            double groupMСQuestionsAnswersScore = 0;
            if (groupMСQuestions != null)
            {
                var groupMСQuestionsAnswers = groupMСQuestions.Answers.Where(y => y.DataSet == datasetOid && y.Characteristic == characteristic.OID);
                foreach (var answer in groupMСQuestionsAnswers)
                {
                    groupMСQuestionsAnswersScore += (answer.Choice == (int)AnswerVariants.Partially ? 0.5 : (answer.Choice == (int)AnswerVariants.Yes ? 1 : 0));
                }
            }
            var groupPIQuestions = characteristic.QuestionGroupQuestionGroups_CharacteristicCharacteristics
                                                .Select(x => x.QuestionGroup).Where(qg => qg.GCRecord == null)
                                                .Where(x => liteQuestionGroups[1].Equals(x.Title.ToLower()))
                                                .SelectMany(y => y.Questions).SingleOrDefault(z => z.GCRecord == null);
            double groupPIQuestionsAnswersScore = 0;
            if (groupPIQuestions != null)
            {
                var groupPIQuestionsAnswers = groupPIQuestions.Answers.Where(y => y.DataSet == datasetOid && y.Characteristic == characteristic.OID);

                foreach (var answer in groupPIQuestionsAnswers)
                {
                    groupPIQuestionsAnswersScore += (answer.Choice == (int)AnswerVariants.Partially ? 0.5 : (answer.Choice == (int)AnswerVariants.Yes ? 1 : 0));
                }
            }
            return "11" + groupMСQuestionsAnswersScore.ToString() + groupPIQuestionsAnswersScore.ToString();
        }
        #endregion
    }
}
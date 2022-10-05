using System.Linq;

namespace GlueForth.WebApi.DTOs
{
    /// <summary>
    /// This class represent Question model for Current Unit Assessment type --> Lite
    /// </summary>
    public class LiteQuestionDTO
    {
        #region Constructor

        public LiteQuestionDTO()
        {
            
        }

        public LiteQuestionDTO(Characteristic characteristic, Question question1, Question question2, Unit selectedUnit)
        {
            #region Characteristic

            CharacteristicOid = characteristic.OID;
            CharacteristicReference = characteristic.Reference;
            CharacteristicDescription = characteristic.Description;
            CharacteristicSummary = characteristic.Summary;
            CharacteristicGuidance = characteristic.GuidanceText;
            IsCharacteristicGuidanceExists = !string.IsNullOrEmpty(characteristic.Summary);

            IsRelevantCharacteristic = !characteristic.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics
                .Intersect(
                    selectedUnit.SPADataSets.Where(x => x.AssessmentType == selectedUnit.CurrentAssessmentType)
                        .SelectMany(x => x.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics)).Any();

            #endregion

            QuestionOid1 = question1.OID;
            QuestionOid2 = question2.OID;

            #region FirstAnswer

            var answer1 = question1.Answers.FirstOrDefault(x =>
                x.GCRecord == null &&
                x.Characteristic1 != null &&
                x.Characteristic1.OID == characteristic.OID &&
                x.SPADataSet != null &&
                x.SPADataSet.GCRecord == null &&
                x.SPADataSet.Unit == selectedUnit.Oid &&
                x.SPADataSet.AssessmentType == selectedUnit.CurrentAssessmentType);

            AnswerChoise1 = -1;
            if (answer1 != null)
            {
                AnswerOid1 = answer1.OID;
                AnswerChoise1 = answer1.Choice;                
            }

            UnknownAG1 = question1.UnknownAnswerGuidance;
            NoAG1 = question1.NoAnswerGuidance;
            PartiallyAG1 = question1.PartiallyAnswerGuidance;
            YesAG1 = question1.YesAnswerGuidance;
            #endregion

            #region SecondAnswer

            var answer2 = question2.Answers.FirstOrDefault(x =>
                x.GCRecord == null &&
                x.Characteristic1 != null &&
                x.Characteristic1.OID == characteristic.OID &&
                x.SPADataSet != null &&
                x.SPADataSet.GCRecord == null &&
                x.SPADataSet.Unit == selectedUnit.Oid &&
                x.SPADataSet.AssessmentType == selectedUnit.CurrentAssessmentType);

            AnswerChoise2 = -1;
            if (answer2 != null)
            {
                AnswerOid2 = answer2.OID;
                AnswerChoise2 = answer2.Choice;
            }

            UnknownAG2 = question2.UnknownAnswerGuidance;
            NoAG2 = question2.NoAnswerGuidance;
            PartiallyAG2 = question2.PartiallyAnswerGuidance;
            YesAG2 = question2.YesAnswerGuidance;

            #endregion
        }

        public LiteQuestionDTO(Characteristic characteristic, Question question1, AnswerNote answerNote1, Question question2, AnswerNote answerNote2, Unit selectedUnit)
        {
            #region Characteristic

            CharacteristicOid = characteristic.OID;
            CharacteristicReference = characteristic.Reference;
            CharacteristicDescription = characteristic.Description;
            CharacteristicSummary = characteristic.Summary;
            CharacteristicGuidance = characteristic.GuidanceText;
            IsCharacteristicGuidanceExists = !string.IsNullOrEmpty(characteristic.Summary);

            IsRelevantCharacteristic = !characteristic.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics
                .Intersect(
                    selectedUnit.SPADataSets.Where(x => x.AssessmentType == selectedUnit.CurrentAssessmentType)
                        .SelectMany(x => x.SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics)).Any();

            #endregion

            QuestionOid1 = question1.OID;
            QuestionOid2 = question2.OID;

            #region FirstAnswer

            var answer1 = question1.Answers.FirstOrDefault(x =>
                x.GCRecord == null &&
                x.Characteristic1 != null &&
                x.Characteristic1.OID == characteristic.OID &&
                x.SPADataSet != null &&
                x.SPADataSet.GCRecord == null &&
                x.SPADataSet.Unit == selectedUnit.Oid &&
                x.SPADataSet.AssessmentType == selectedUnit.CurrentAssessmentType);

            AnswerChoise1 = -1;
            if (answer1 != null)
            {
                AnswerOid1 = answer1.OID;
                AnswerChoise1 = answer1.Choice;
            }

            UnknownAG1 = question1.UnknownAnswerGuidance;
            NoAG1 = question1.NoAnswerGuidance;
            PartiallyAG1 = question1.PartiallyAnswerGuidance;
            YesAG1 = question1.YesAnswerGuidance;
            if (answerNote1 != null)
            {
                if ((!string.IsNullOrEmpty(answerNote1.Note) || (answerNote1.AnswerNoteAttachments.Count > 0)))
                    IsNoteOrFileExist1 = true;
                else
                    IsNoteOrFileExist1 = false;
            }
            #endregion

            #region SecondAnswer

            var answer2 = question2.Answers.FirstOrDefault(x =>
                x.GCRecord == null &&
                x.Characteristic1 != null &&
                x.Characteristic1.OID == characteristic.OID &&
                x.SPADataSet != null &&
                x.SPADataSet.GCRecord == null &&
                x.SPADataSet.Unit == selectedUnit.Oid &&
                x.SPADataSet.AssessmentType == selectedUnit.CurrentAssessmentType);

            AnswerChoise2 = -1;
            if (answer2 != null)
            {
                AnswerOid2 = answer2.OID;
                AnswerChoise2 = answer2.Choice;
            }

            UnknownAG2 = question2.UnknownAnswerGuidance;
            NoAG2 = question2.NoAnswerGuidance;
            PartiallyAG2 = question2.PartiallyAnswerGuidance;
            YesAG2 = question2.YesAnswerGuidance;
            if (answerNote2 != null)
            {
                if ((!string.IsNullOrEmpty(answerNote2.Note) || (answerNote2.AnswerNoteAttachments.Count > 0)))
                    IsNoteOrFileExist2 = true;
                else
                    IsNoteOrFileExist2 = false;
            }

            #endregion
        }

        #endregion

        #region Properties

        public int CharacteristicOid { get; set; }
        public string CharacteristicReference { get; set; }
        public string CharacteristicDescription { get; set; }
        public string CharacteristicGuidance { get; set; }
        public string CharacteristicSummary { get; set; }
        public bool IsCharacteristicGuidanceExists { get; set; }
        public bool IsRelevantCharacteristic { get; set; }

        public int QuestionOid1 { get; set; }
        public int QuestionOid2 { get; set; }

        public int AnswerOid1 { get; set; }
        public int? AnswerChoise1 { get; set; }
        public string UnknownAG1 { get; set; }
        public string NoAG1 { get; set; }
        public string PartiallyAG1 { get; set; }
        public string YesAG1 { get; set; }
        public bool IsNoteOrFileExist1 { get; set; }

        public int AnswerOid2 { get; set; }
        public int? AnswerChoise2 { get; set; }
        public string UnknownAG2 { get; set; }
        public string NoAG2 { get; set; }
        public string PartiallyAG2 { get; set; }
        public string YesAG2 { get; set; }
        public bool IsNoteOrFileExist2 { get; set; }
        public int Status { get; set; }
        #endregion
    }
}
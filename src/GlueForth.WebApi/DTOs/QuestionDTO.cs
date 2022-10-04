using System;

namespace BlueNorth.WebApi.DTOs
{
    /// <summary>
    /// This class represent Question model for FullQuestionDTO
    /// </summary>
    public class QuestionDTO
    {
        public QuestionDTO()
        {

        }
        public QuestionDTO(QuestionGroup group, Question question, Answer answer)
        {
            Oid = group.OID;
            Title = group.Title;
            QuestionOid = question.OID;
            GroupShortTitle = group.ShortTitle;
            QuestionTitle = question.Title;
            GuidanceText = question.GuidanceText;
            IsGuidanceExists = !string.IsNullOrEmpty(question.GuidanceText);
            AnswerChoise = -1;

            if (answer != null)
            {
                AnswerOid = answer.OID;
                AnswerChoise = answer.Choice;
                if (answer.SPADataSet != null)
                {
                    SpaUnit = answer.SPADataSet.Unit;
                    SpaAssessment = answer.SPADataSet.AssessmentType;
                }
            }

            UnknownAnswerGuidance = question.UnknownAnswerGuidance;
            NoAnswerGuidance = question.NoAnswerGuidance;
            PartiallyAnswerGuidance = question.PartiallyAnswerGuidance;
            YesAnswerGuidance = question.YesAnswerGuidance;
        }

        public QuestionDTO(QuestionGroup group, Question question, Answer answer, AnswerNote answernote)
        {
            Oid = group.OID;
            Title = group.Title;
            QuestionOid = question.OID;
            GroupShortTitle = group.ShortTitle;
            QuestionTitle = question.Title;
            GuidanceText = question.GuidanceText;
            IsGuidanceExists = !string.IsNullOrEmpty(question.GuidanceText);
            AnswerChoise = -1;
            if (answer != null)
            {
                AnswerOid = answer.OID;
                AnswerChoise = answer.Choice;
                if (answer.SPADataSet != null)
                {
                    SpaUnit = answer.SPADataSet.Unit;
                    SpaAssessment = answer.SPADataSet.AssessmentType;
                }
            }

            UnknownAnswerGuidance = question.UnknownAnswerGuidance;
            NoAnswerGuidance = question.NoAnswerGuidance;
            PartiallyAnswerGuidance = question.PartiallyAnswerGuidance;
            YesAnswerGuidance = question.YesAnswerGuidance;
            if (answernote != null)
            {
                if ((!string.IsNullOrEmpty(answernote.Note) || (answernote.AnswerNoteAttachments.Count > 0)))
                    IsNoteOrFileExist = true;
                else
                    IsNoteOrFileExist = false;
            }
        }


        public int Oid { get; set; }
        public int QuestionOid { get; set; }
        public string Title { get; set; }
        public string GroupShortTitle { get; set; }
        public string QuestionTitle { get; set; }
        public int AnswerOid { get; set; }
        public int? AnswerChoise { get; set; }
        public bool IsGuidanceExists { get; set; }
        public string GuidanceText { get; set; }
        public Guid? SpaUnit { get; set; }
        public int? SpaAssessment { get; set; }

        public string UnknownAnswerGuidance { get; set; }
        public string NoAnswerGuidance { get; set; }
        public string PartiallyAnswerGuidance { get; set; }
        public string YesAnswerGuidance { get; set; }
        public bool IsNoteOrFileExist { get; set; }
    }
}
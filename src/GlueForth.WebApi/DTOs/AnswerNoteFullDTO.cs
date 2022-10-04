using System;
using System.Linq;

namespace BlueNorth.WebApi.DTOs
{
    public class AnswerNoteFullDTO
    {
        public AnswerNoteFullDTO()
        {

        }

        public AnswerNoteFullDTO(AnswerNote answerNote)
        {
            OID = answerNote.OID;
            Dimension = answerNote.Answer1.Characteristic1.Principle1.Dimension1.Reference;
            Principle = answerNote.Answer1.Characteristic1.Principle1.Reference;
            Characteristic = answerNote.Answer1.Characteristic1.ShortTitle;
            CharacteristicRef = answerNote.Answer1.Characteristic1.Reference;
            QuestionType = answerNote.Answer1.Question1.QuestionGroup.Title;
            Notes = answerNote.Note;
            if (answerNote.AnswerNoteAttachments.Any())
                Attachments = answerNote.AnswerNoteAttachments
                    .Select(x => new AttachmentDTO() {OID = x.OID, FileName = x.FileData.FileName}).ToArray();
        }

        public int OID { get; set; }
        public string Dimension { get; set; }
        public string Principle { get; set; }
        public string CharacteristicRef { get; set; }
        public string Characteristic { get; set; }
        public string QuestionType { get; set; }
        public string Notes { get; set; }
        public AttachmentDTO[] Attachments { get; set; }
    }

}
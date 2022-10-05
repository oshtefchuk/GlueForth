using System;
using System.Linq;

namespace GlueForth.WebApi.DTOs
{
    public class AnswerNoteDTO
    {
        public AnswerNoteDTO()
        {

        }

        public AnswerNoteDTO(AnswerNote answerNote)
        {
            OID = answerNote.OID;
            if (answerNote.Answer1 != null) Question = answerNote.Answer1.Question.GetValueOrDefault();
            if (answerNote.Note != null) Note = answerNote.Note;
            if (answerNote.AnswerNoteAttachments.Any())
                Attachments = answerNote.AnswerNoteAttachments
                    .Select(x => new AttachmentDTO() {OID = x.OID, FileName = x.FileData.FileName}).ToArray();
        }

        public int OID { get; set; }
        public int Question { get; set; }
        public string Note { get; set; }
        public AttachmentDTO[] Attachments { get; set; }
    }

    public class AttachmentDTO
    {
        public string FileName { get; set; }
        public int OID { get; set; }
    }
}
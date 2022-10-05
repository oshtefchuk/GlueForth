using System;
using System.Linq;

namespace GlueForth.WebApi.DTOs
{
    public class AnswerNoteAttachmentDTO
    {
        public AnswerNoteAttachmentDTO()
        {
            
        }

        public AnswerNoteAttachmentDTO(AnswerNoteAttachment answerNoteAttachment)
        {
            OID = answerNoteAttachment.OID;
            if (answerNoteAttachment.AnswerNote1 != null) AnswerNoteOID = answerNoteAttachment.AnswerNote1.OID;
            if (answerNoteAttachment.FileData != null)
            {
                FileName = answerNoteAttachment.FileData.FileName;
                File = answerNoteAttachment.FileData.Content;
                FileSize = answerNoteAttachment.FileData.Content.Length;
            }
        }

        public int OID { get; set; }
        public int AnswerNoteOID { get; set; }
        public string FileName { get; set; }
        public byte[] File { get; set; }
        public int FileSize { get; set; }
    }
}
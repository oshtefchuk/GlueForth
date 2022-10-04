using System;

namespace BlueNorth.WebApi.DTOs
{
    public class PrimaryDataFieldNotesDTO
    {
        /// <summary>
        /// This class represent Indicator Notes model for IndicatorNoteDTO
        /// </summary>
        public PrimaryDataFieldNotesDTO()
        {
            
        }
        public PrimaryDataFieldNotesDTO(PrimaryDataFieldNote note)
        {
            OID = note.OID;
            Message = note.Note;
            Created = note.Created;
            Modified = note.Modified;
            UserOid = note.User1.Oid;

            FirstName = string.IsNullOrEmpty(note.User1.Person1?.FirstName)
                ? string.Empty
                : note.User1.Person1.FirstName;

            LastName = string.IsNullOrEmpty(note.User1.Person1?.LastName)
                ? string.Empty
                : note.User1.Person1.LastName;

            UserFullName = FirstName + ' ' + LastName;
        }

        public int OID { get; set; }
        public string Message { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserFullName { get; set; }
        public Guid UserOid { get; set; }
    }
}
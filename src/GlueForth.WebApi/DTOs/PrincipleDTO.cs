namespace GlueForth.WebApi.DTOs
{
    /// <summary>
    /// This class represents DTO of Principle entity for selector on lite assessment capture page
    /// </summary>
    public class PrincipleDTO
    {
        public PrincipleDTO()
        {
            
        }
        public PrincipleDTO(Principle principle, int questionsCount, int unansweredQuestionsCount)
        {
            OID = principle.OID;
            Title = principle.Title;
            ShortTitle = principle.ShortTitle;
            UnAnsweredQuestionsCount = unansweredQuestionsCount;
            AnsweredPercentage = (int)(((double)(questionsCount - unansweredQuestionsCount) / questionsCount) * 100);
            CharacteristicsCount = principle.Characteristics.Count;
        }

        public PrincipleDTO(Principle principle)
        {
            OID = principle.OID;
            ShortTitle = principle.ShortTitle;
            Title = principle.Title;
            CharacteristicsCount = principle.Characteristics.Count;
        }

        public int OID { get; set; }
        public string ShortTitle { get; set; }
        public string Title { get; set; }
        public int UnAnsweredQuestionsCount { get; set; }
        public float AnsweredPercentage { get; set; }

        public int CharacteristicsCount { get; set; }
    }
}
namespace GlueForth.WebApi.DTOs
{
    /// <summary>
    /// This class represents DTO of Dimension entity for selector on lite assessment capture page
    /// </summary>
    public class DimensionDTO
    {
        public DimensionDTO()
        {
            
        }
        public DimensionDTO(Dimension dimension, double questionsCount, double unansweredQuestionsCount)
        {
            OID = dimension.OID;
            ShortTitle = dimension.ShortTitle;
            UnAnsweredQuestionsCount = (int)unansweredQuestionsCount;
            AnsweredPercentage = questionsCount == 0 ? 0 : (int)((questionsCount - unansweredQuestionsCount) / questionsCount * 100);
        }

        public int OID { get; set; }
        public string ShortTitle { get; set; }
        public int UnAnsweredQuestionsCount { get; set; }
        public float AnsweredPercentage { get; set; }
    }
}
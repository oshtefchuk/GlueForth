namespace GlueForth.WebApi.DTOs
{
    public class PrincipleGroupDTO
    {
        public PrincipleGroupDTO()
        {
            
        }
        public PrincipleGroupDTO(PrincipleGroup pGroup, int questionsCount, int unansweredQuestionsCount)
        {
            OID = pGroup.OID;
            ShortTitle = pGroup.ShortTitle;
            Title = pGroup.Title;
            UnAnsweredQuestionsCount = unansweredQuestionsCount;
            AnsweredPercentage = (int)(((double)(questionsCount - unansweredQuestionsCount) / questionsCount) * 100);
            CharacteristicsCount = pGroup.Characteristics.Count;
        }

        public PrincipleGroupDTO(PrincipleGroup pGroup)
        {
            OID = pGroup.OID;
            ShortTitle = pGroup.ShortTitle;
            Title = pGroup.Title;
            CharacteristicsCount = pGroup.Characteristics.Count;
        }

        public int OID { get; set; }
        public string Title { get; set; }
        public string ShortTitle { get; set; }
        public float AnsweredPercentage { get; set; }

        public int UnAnsweredQuestionsCount { get; set; }
        public int CharacteristicsCount { get; set; }
    }
}
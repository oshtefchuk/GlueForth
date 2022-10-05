using System.Collections.Generic;

namespace GlueForth.WebApi.DTOs
{
    /// <summary>
    /// This class represent Question model for Current Unit Assessment type --> Full
    /// </summary>
    public class FullQuestionDTO
    {
        public FullQuestionDTO()
        {
            
        }
        public FullQuestionDTO(List<QuestionDTO> questions, bool isRelevantCharacteristic)
        {
            IsRelevantCharacteristic = isRelevantCharacteristic;
            QuestionsList = questions;
        }

        public List<QuestionDTO> QuestionsList { get; set; }
        public bool IsRelevantCharacteristic { get; set; }
    }
}
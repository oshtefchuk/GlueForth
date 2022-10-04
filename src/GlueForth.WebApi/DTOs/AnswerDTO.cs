using System;

namespace BlueNorth.WebApi.DTOs
{
    public class AnswerDTO
    {
        public AnswerDTO()
        {
            
        }

	    public AnswerDTO(Answer answer)
	    {
		    OID = answer.OID;
		    if (answer.Question != null) Question = answer.Question.Value;
		    if (answer.Choice != null) Choice = answer.Choice.Value;
		    if (answer.User != null) User = answer.User.Value;
		    if (answer.SPADataSet.Unit != null) Unit = answer.SPADataSet.Unit.Value;
		    if (answer.SPADataSet.AssessmentType != null) AssessmentType = answer.SPADataSet.AssessmentType.Value;
		    if (answer.Characteristic != null) Characteristic = answer.Characteristic.Value;
	    }
        public int OID { get; set; }
        public int Question { get; set; }
        public int Choice { get; set; }
        public Guid User { get; set; }
        public Guid Unit { get; set; }
        public int AssessmentType { get; set; }
        public int Characteristic { get; set; }
    }
}
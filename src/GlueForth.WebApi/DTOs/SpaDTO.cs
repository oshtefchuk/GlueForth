using System.Collections.Generic;
using System.Linq;

namespace BlueNorth.WebApi.DTOs
{
    /// <summary>
    /// This class represent SPA DataSet model for strategic assessment => current status page
    /// Used in GetSpaDataSetByAssessmentType method
    /// </summary>
    public class SpaDTO
    {
        public enum DataSetState
        {
            NotStarted,
            InProgress,
            Completed
        }

        public SpaDTO()
        {
            
        }


        public SpaDTO(SPADataSet spa, int questionsCount, int answersCount)
        {
            OID = spa.OID;
            Grade = spa.Grade1 != null ? spa.Grade1.Title : "";
            AnsweredPercentage = (int)(((double)answersCount / (double)questionsCount) * 100);

            switch (AnsweredPercentage)
            {
                case 0:
                    State = DataSetState.NotStarted;
                    break;
                case 100:
                    State = DataSetState.Completed;
                    break;
                default:
                    State = DataSetState.InProgress;
                    break;
            }
        }

        public int OID { get; set; }
        public string Grade { get; set; }
        public int AnsweredPercentage { get; set; }
        public DataSetState State { get; set; }
    }
}
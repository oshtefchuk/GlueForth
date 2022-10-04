using System;

namespace BlueNorth.WebApi
{
    public class IndicatorDataSetDTO
    {
        public IndicatorDataSetDTO()
        {
            
        }
        public IndicatorDataSetDTO(IndicatorDataSet dataSet)
        {
            if (dataSet.PeriodFromYear != null) PeriodFromYear = dataSet.PeriodFromYear.Value;
            if (dataSet.PeriodToYear != null) PeriodToYear = dataSet.PeriodToYear.Value;
            if (dataSet.PeriodFromMonth != null) PeriodFromMonth = dataSet.PeriodFromMonth.Value;
            if (dataSet.PeriodToMonth != null) PeriodToMonth = dataSet.PeriodToMonth.Value;
            OID = dataSet.OID;
            if (dataSet.Unit != null) Unit = dataSet.Unit.Value;
            if (dataSet.Framework != null) Framework = dataSet.Framework.Value;
            Comment = dataSet.Comment;
            if (dataSet.Grade1?.OID != null)
            {
                Grade = dataSet.Grade1.OID;
                GradeTitle = dataSet.Grade1.Title;
                GradeShortTitle = dataSet.Grade1.ShortTitle;
            }
        }

        public short PeriodFromYear { get; set; }
        public short PeriodToYear { get; set; }
        public short PeriodFromMonth { get; set; }
        public short PeriodToMonth { get; set; }
        public int Progress { get; set; }
        public int OID { get; set; }
        public Guid Unit { get; set; }
        public int Framework { get; set; }
        public string Comment { get; set; }
        public int State { get; set; }
        public int Grade { get; set; }
        public string GradeTitle { get; set; }
        public string GradeShortTitle { get; set; }
    }
}
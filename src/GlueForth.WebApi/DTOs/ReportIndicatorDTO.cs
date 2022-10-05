using System.Collections.Generic;

namespace GlueForth.WebApi.DTOs
{
    public class ReportIndicatorDTO
    {
        public ReportIndicatorDTO()
        {
            
        }
        public int IndicatorOid { get; set; }
        public string PrincipleGroup { get; set; }
        public int CharacteristicOid { get; set; }
        public string Characteristic { get; set; }
        public string CharacteristicRef { get; set; }
        public string MeasuredBy { get; set; }
        public string Formula { get; set; }
        public string Relevance { get; set; }
        public double[] Trend { get; set; }
        public ReportIndicatoYearValue[] TrendDictionary { get; set; }
        public int Score { get; set; }
        public int DimensionOid { get; set; }
    }

    public class ReportIndicatoYearValue
    {
        public short Year { get; set; }
        public double Value { get; set; }

    }
}

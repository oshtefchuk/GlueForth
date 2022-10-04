namespace BlueNorth.WebApi
{
    public class PrioritisationCharacteristicDTO
    {
        public PrioritisationCharacteristicDTO() { }
        public int OID { get; set; }
        public int IndicatorOID { get; set; }

        public string Reference { get; set; }
        public string Title { get; set; }
        public string Risks { get; set; }
        public string Statement { get; set; }
        public double AssessmentScore { get; set; }
        public int IndicatorScore { get; set; }
        public bool IsPrior { get; set; }
        public bool IsRelevant { get; set; }
        public bool IsHashedRed { get; set; } // for front-end to show no primary data present for calculation

    }
}
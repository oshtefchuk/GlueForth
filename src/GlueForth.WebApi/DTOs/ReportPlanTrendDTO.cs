namespace BlueNorth.WebApi.DTOs
{
    public class ReportPlanTrendDTO
    {
        public ReportPlanTrendDTO()
        {
            
        }
        public string PeriodName { get; set; }
        public int Open { get; set; }
        public int Completed { get; set; }
        public int Overdue { get; set; }
    }
}

namespace BlueNorth.WebApi.DTOs
{
    public class PriorReportItemDTO
    {
        public PriorReportItemDTO()
        {

        }
        public string CharacteristicRef { get; set; }
        public string CharacteristicTitle { get; set; }
        public int[] QuestionGroupStatuses { get; set; }

        public int Status { get; set; }
    }
}

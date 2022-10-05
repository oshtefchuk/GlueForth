namespace GlueForth.WebApi.DTOs
{
    public class CommodityPDMValueDTO
    {
        public CommodityPDMValueDTO()
        {
        }

        public int? PrimaryDataValueOid { get; set; }
        public int? CommodityOid { get; set; }
        public double Value { get; set; }
        public int? MonthNumber { get; set; }
    }
}
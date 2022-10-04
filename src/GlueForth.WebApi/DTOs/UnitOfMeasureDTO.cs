namespace BlueNorth.WebApi.DTOs
{
    public class UnitOfMeasureDTO
    {
        public UnitOfMeasureDTO()
        {
            
        }
        public UnitOfMeasureDTO(UnitOfMeasure unit)
        {
            Oid = unit.OID;
            ShortTitle = unit.ShortTitle;
        }

        public int? Oid { get; set; }
        public string ShortTitle { get; set; }
    }
}
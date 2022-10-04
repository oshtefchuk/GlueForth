namespace BlueNorth.WebApi
{
    public class PriorCharacteristicDTO
    {
        public PriorCharacteristicDTO() { }
        public int OID { get; set; }
        public string Title { get; set; }
        public string ShortTitle { get; set; }
        public string Reference { get; set; }
        public int Order { get; set; }
    }
}
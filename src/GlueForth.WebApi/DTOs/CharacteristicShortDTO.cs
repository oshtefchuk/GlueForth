namespace GlueForth.WebApi
{
    public class CharacteristicShortDTO
    {
        public CharacteristicShortDTO(Characteristic characteristic)
        {
            if (characteristic != null)
            {
                OID = characteristic.OID;
                Reference = characteristic.Reference;
                ShortTitle = characteristic.ShortTitle;
                Description = characteristic.Description;
                Summary = characteristic.Summary;
                GuidanceText = characteristic.GuidanceText;
            }
        }
        public int OID { get; set; }
        public string Reference { get; set; }
        public string ShortTitle { get; set; }
        public string Description { get; set; }
        public string Summary { get; set; }

        public string GuidanceText { get; set; }
        public int Status { get; set; }

    }
}
namespace GlueForth.WebApi
{
    public class CharacteristicDTO
    {
        public CharacteristicDTO() { }
        public int OID { get; set; }
        public string Title { get; set; }
        public int[] Answers { get; set; }
    }
}
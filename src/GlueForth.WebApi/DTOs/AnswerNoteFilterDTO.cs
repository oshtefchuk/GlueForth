namespace BlueNorth.WebApi.DTOs
{
    /// <summary>
    /// Structure that used for transfer filter selection for AnswerNotes list page (Repository)
    /// </summary>
    public class AnswerNoteFilterDTO
    {
        public int DimensionOid { get; set; }
        public int PrincipleOid { get; set; }
        public int CharacteristicOid { get; set; }
        public int PrincipleGroupOid { get; set; }
    }
}
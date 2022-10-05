using System;
using System.Collections.Generic;
using System.Linq;

namespace GlueForth.WebApi
{
    public class ImprovementPlanDTO
    {
        public ImprovementPlanDTO() {

        }

        public int QuestionOid { get; set; }
        public int CharacteristicOid { get; set; }
        public string QuestionGroup { get; set; }
        public string ImprovementPlanQuestion { get; set; }
        public string ImprovementPlanGuidance { get; set; }

        public List<ImprovementPlanItemDTO> Items = new List<ImprovementPlanItemDTO>();
        public int State { get; set; }
    }
    public class ImprovementPlanItemDTO
    {
        public ImprovementPlanItemDTO()
        {

        }
        public ImprovementPlanItemDTO(ImprovementPlanItem item)
        {
            QuestionOid = item.Question ?? 0;
            QuestionGroup = item.Question1?.QuestionGroup?.ShortTitle;
            CharacteristicOid = item.Characteristic1.OID;
            CharacteristicRef = item.Characteristic1.Reference;
            CharacteristicShortTitle = item.Characteristic1.ShortTitle;
            StandardContent = string.Join("; ", item.StandardContentStandardContents_ImprovementPlanItemImprovementPlanItems.Select(x => x.StandardContent.Reference));
            ImprovementPlanItemOid = item.OID;
            Actions = item.Actions;
            Resposible = item.Resposible;
            DueDate = item.DueDate ?? DateTime.MinValue;
            Result = item.Result;
            IsCompleted = item.IsCompleted.Value;
            IsDisabled = item.IsDisabled.Value;
            Cost = item.Cost.GetValueOrDefault();
            Status = item.IsCompleted == true ? "Completed" : IsOverDue ? "OverDue" : "Due";
            if (item.Attachment.HasValue)
            {
                File = item.FileData.Content;
                FileName = item.FileData.FileName;
                FileSize = item.FileData.size.GetValueOrDefault();
            }
        }

        public int QuestionOid { get; set; }
        public int CharacteristicOid { get; set; }
        public string CharacteristicRef { get; set; }
        public string CharacteristicShortTitle { get; set; }
        public string StandardContent { get; set; }
        public string QuestionGroup { get; set; }
        public int StandardContentOid { get; set; }
        public int ImprovementPlanItemOid { get; set; }
        public string Actions { get; set; }
        public string Resposible { get; set; }
        public DateTime DueDate { get; set; }
        public string Result { get; set; }
        public double Cost { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsOverDue { get { return DueDate > DateTime.MinValue && DueDate <= DateTime.Now; } }
        public bool IsDisabled { get; set; }

        public string Status { get; set; }

        public string FileName { get; set; }
        public byte[] File { get; set; }
        public int FileSize { get; set; }

    }

}
using System;
using System.Collections.Generic;

namespace GlueForth.WebApi
{
    public class StandardStatusDTO
    {
        public string ShortTitle { get; set; }
        public string Title { get; set; }
        public string Reference { get; set; }
        public string StandardContentRef { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int CharacteristicOid { get; set; }
        public string CharacteristicName { get; set; }
        public int StandardContentOid { get; set; }
        public string QuestionGroup { get; set; }
        public int TasksCount { get; set; }
        public int Choice { get; set; }
        public int DefaultChoice { get; set; }
    }
}

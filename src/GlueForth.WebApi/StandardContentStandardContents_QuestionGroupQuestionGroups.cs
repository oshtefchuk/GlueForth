//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GlueForth.WebApi
{
    using System;
    using System.Collections.Generic;
    
    public partial class StandardContentStandardContents_QuestionGroupQuestionGroups
    {
        public Nullable<int> QuestionGroups { get; set; }
        public Nullable<int> StandardContents { get; set; }
        public int OID { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
    
        public virtual QuestionGroup QuestionGroup { get; set; }
        public virtual StandardContent StandardContent { get; set; }
    }
}

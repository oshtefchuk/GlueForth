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
    
    public partial class Question
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Question()
        {
            this.Answers = new HashSet<Answer>();
            this.QuestionQuestions_CharacteristicCharacteristics = new HashSet<QuestionQuestions_CharacteristicCharacteristics>();
            this.ImprovementPlanItems = new HashSet<ImprovementPlanItem>();
        }
    
        public int OID { get; set; }
        public string Title { get; set; }
        public string Reference { get; set; }
        public string GuidanceText { get; set; }
        public Nullable<int> Group { get; set; }
        public Nullable<int> DefaultAnswer { get; set; }
        public string UnknownAnswerGuidance { get; set; }
        public string NoAnswerGuidance { get; set; }
        public string PartiallyAnswerGuidance { get; set; }
        public string YesAnswerGuidance { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
        public Nullable<int> GCRecord { get; set; }
        public string ImprovementPlanQuestion { get; set; }
        public string ImprovementPlanGuidance { get; set; }
    
        public virtual QuestionGroup QuestionGroup { get; set; }
        public virtual Version Version1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Answer> Answers { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuestionQuestions_CharacteristicCharacteristics> QuestionQuestions_CharacteristicCharacteristics { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ImprovementPlanItem> ImprovementPlanItems { get; set; }
    }
}

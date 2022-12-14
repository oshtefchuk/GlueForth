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
    
    public partial class QuestionGroup
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public QuestionGroup()
        {
            this.QuestionGroup1 = new HashSet<QuestionGroup>();
            this.Questions = new HashSet<Question>();
            this.QuestionGroupQuestionGroups_CharacteristicCharacteristics = new HashSet<QuestionGroupQuestionGroups_CharacteristicCharacteristics>();
            this.StandardContentStandardContents_QuestionGroupQuestionGroups = new HashSet<StandardContentStandardContents_QuestionGroupQuestionGroups>();
        }
    
        public int OID { get; set; }
        public string Title { get; set; }
        public string ShortTitle { get; set; }
        public Nullable<int> Parent { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
        public Nullable<int> GCRecord { get; set; }
        public string GuidanceText { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuestionGroup> QuestionGroup1 { get; set; }
        public virtual QuestionGroup QuestionGroup2 { get; set; }
        public virtual Version Version1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Question> Questions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuestionGroupQuestionGroups_CharacteristicCharacteristics> QuestionGroupQuestionGroups_CharacteristicCharacteristics { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<StandardContentStandardContents_QuestionGroupQuestionGroups> StandardContentStandardContents_QuestionGroupQuestionGroups { get; set; }
    }
}

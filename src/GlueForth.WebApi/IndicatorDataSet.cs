//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BlueNorth.WebApi
{
    using System;
    using System.Collections.Generic;
    
    public partial class IndicatorDataSet
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public IndicatorDataSet()
        {
            this.PrimaryDataValues = new HashSet<PrimaryDataValue>();
            this.PrimaryDataFieldNotes = new HashSet<PrimaryDataFieldNote>();
        }
    
        public int OID { get; set; }
        public Nullable<System.Guid> Unit { get; set; }
        public Nullable<int> Grade { get; set; }
        public string Comment { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
        public Nullable<int> GCRecord { get; set; }
        public Nullable<short> PeriodFromYear { get; set; }
        public Nullable<short> PeriodToYear { get; set; }
        public Nullable<short> PeriodFromMonth { get; set; }
        public Nullable<short> PeriodToMonth { get; set; }
        public Nullable<int> Framework { get; set; }
    
        public virtual Grade Grade1 { get; set; }
        public virtual Unit Unit1 { get; set; }
        public virtual Framework Framework1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PrimaryDataValue> PrimaryDataValues { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PrimaryDataFieldNote> PrimaryDataFieldNotes { get; set; }
    }
}
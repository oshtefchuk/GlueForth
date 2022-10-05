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
    
    public partial class PrimaryDataValue
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PrimaryDataValue()
        {
            this.ProductionAreas = new HashSet<ProductionArea>();
            this.CommodityPDValues = new HashSet<CommodityPDValue>();
            this.PrimaryDataMonthValues = new HashSet<PrimaryDataMonthValue>();
        }
    
        public int OID { get; set; }
        public Nullable<int> PrimaryDataField { get; set; }
        public Nullable<int> DataSet { get; set; }
        public string Value { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
        public Nullable<int> GCRecord { get; set; }
    
        public virtual IndicatorDataSet IndicatorDataSet { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductionArea> ProductionAreas { get; set; }
        public virtual PrimaryDataField PrimaryDataField1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CommodityPDValue> CommodityPDValues { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PrimaryDataMonthValue> PrimaryDataMonthValues { get; set; }
    }
}

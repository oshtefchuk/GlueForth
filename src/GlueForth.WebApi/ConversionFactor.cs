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
    
    public partial class ConversionFactor
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ConversionFactor()
        {
            this.IndicatorIndicators_ConversionFactorConversionFactors = new HashSet<IndicatorIndicators_ConversionFactorConversionFactors>();
        }
    
        public int OID { get; set; }
        public string Reference { get; set; }
        public string Name { get; set; }
        public Nullable<int> DataType { get; set; }
        public Nullable<System.Guid> Country { get; set; }
        public Nullable<double> Value { get; set; }
        public Nullable<int> StartYear { get; set; }
        public Nullable<int> EndYear { get; set; }
        public string Description { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
        public Nullable<int> GCRecord { get; set; }
        public Nullable<int> SourceUoM { get; set; }
        public Nullable<int> TargetUoM { get; set; }
    
        public virtual Country Country1 { get; set; }
        public virtual PrimaryDataType PrimaryDataType { get; set; }
        public virtual UnitOfMeasure UnitOfMeasure1 { get; set; }
        public virtual UnitOfMeasure UnitOfMeasure2 { get; set; }
        public virtual Version Version1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<IndicatorIndicators_ConversionFactorConversionFactors> IndicatorIndicators_ConversionFactorConversionFactors { get; set; }
    }
}

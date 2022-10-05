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
    
    public partial class Dimension
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Dimension()
        {
            this.DimensionDimensions_CommodityCommodities = new HashSet<DimensionDimensions_CommodityCommodities>();
            this.Principles = new HashSet<Principle>();
        }
    
        public int OID { get; set; }
        public string Title { get; set; }
        public string Reference { get; set; }
        public string ShortTitle { get; set; }
        public string Description { get; set; }
        public string GuidanceText { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
        public Nullable<int> GCRecord { get; set; }
        public Nullable<int> Color { get; set; }
    
        public virtual Version Version1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DimensionDimensions_CommodityCommodities> DimensionDimensions_CommodityCommodities { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Principle> Principles { get; set; }
    }
}

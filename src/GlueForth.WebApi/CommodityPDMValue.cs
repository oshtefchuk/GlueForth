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
    
    public partial class CommodityPDMValue
    {
        public int OID { get; set; }
        public Nullable<int> PrimaryDataMonthValue { get; set; }
        public Nullable<int> Commodity { get; set; }
        public Nullable<double> Value { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
        public Nullable<int> GCRecord { get; set; }
    
        public virtual Commodity Commodity1 { get; set; }
        public virtual PrimaryDataMonthValue PrimaryDataMonthValue1 { get; set; }
    }
}

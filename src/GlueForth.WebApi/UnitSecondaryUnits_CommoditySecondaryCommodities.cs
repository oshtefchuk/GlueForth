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
    
    public partial class UnitSecondaryUnits_CommoditySecondaryCommodities
    {
        public Nullable<int> SecondaryCommodities { get; set; }
        public Nullable<System.Guid> SecondaryUnits { get; set; }
        public int OID { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
    
        public virtual Commodity Commodity { get; set; }
        public virtual Unit Unit { get; set; }
    }
}

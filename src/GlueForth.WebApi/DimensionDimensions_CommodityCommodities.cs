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
    
    public partial class DimensionDimensions_CommodityCommodities
    {
        public Nullable<int> Commodities { get; set; }
        public Nullable<int> Dimensions { get; set; }
        public int OID { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
    
        public virtual Commodity Commodity { get; set; }
        public virtual Dimension Dimension { get; set; }
    }
}

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
    
    public partial class CommodityCommodities_CharacteristicCharacteristics
    {
        public Nullable<int> Characteristics { get; set; }
        public Nullable<int> Commodities { get; set; }
        public int OID { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
    
        public virtual Commodity Commodity { get; set; }
        public virtual Characteristic Characteristic { get; set; }
    }
}

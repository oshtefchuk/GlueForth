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
    
    public partial class SPADataSetSPADataSets_CharacteristicNonRelevantCharacteristics
    {
        public Nullable<int> NonRelevantCharacteristics { get; set; }
        public Nullable<int> SPADataSets { get; set; }
        public int OID { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
    
        public virtual Characteristic Characteristic { get; set; }
        public virtual SPADataSet SPADataSet { get; set; }
    }
}

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
    
    public partial class Unit
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Unit()
        {
            this.UnitUnits_RetailerRetailers = new HashSet<UnitUnits_RetailerRetailers>();
            this.SPADataSets = new HashSet<SPADataSet>();
            this.IndicatorDataSets = new HashSet<IndicatorDataSet>();
            this.UnitUnits_StandardStandards = new HashSet<UnitUnits_StandardStandards>();
            this.UnitUnits_SupplierSuppliers = new HashSet<UnitUnits_SupplierSuppliers>();
            this.UnitUnits_CommodityCommodities = new HashSet<UnitUnits_CommodityCommodities>();
            this.UnitCharacteristicScores = new HashSet<UnitCharacteristicScore>();
            this.Users = new HashSet<User>();
            this.UserAssignedForUsers_UnitAssignedUnits = new HashSet<UserAssignedForUsers_UnitAssignedUnits>();
            this.UserCreatedByUsers_UnitCreatedUnits = new HashSet<UserCreatedByUsers_UnitCreatedUnits>();
            this.UnitSecondaryUnits_CommoditySecondaryCommodities = new HashSet<UnitSecondaryUnits_CommoditySecondaryCommodities>();
        }
    
        public System.Guid Oid { get; set; }
        public Nullable<int> UnitType { get; set; }
        public Nullable<System.Guid> Organisation { get; set; }
        public Nullable<int> UnitStructure { get; set; }
        public Nullable<System.Guid> ContactPerson { get; set; }
        public Nullable<int> PrimaryCommodity { get; set; }
        public Nullable<double> LocationLongtitude { get; set; }
        public Nullable<double> LocationLattitude { get; set; }
        public Nullable<int> CurrentAssessmentType { get; set; }
        public Nullable<int> PrimaryFramework { get; set; }
    
        public virtual Organization Organization { get; set; }
        public virtual UnitType UnitType1 { get; set; }
        public virtual Organisation Organisation1 { get; set; }
        public virtual Person Person { get; set; }
        public virtual Commodity Commodity { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UnitUnits_RetailerRetailers> UnitUnits_RetailerRetailers { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SPADataSet> SPADataSets { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<IndicatorDataSet> IndicatorDataSets { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UnitUnits_StandardStandards> UnitUnits_StandardStandards { get; set; }
        public virtual Framework Framework { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UnitUnits_SupplierSuppliers> UnitUnits_SupplierSuppliers { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UnitUnits_CommodityCommodities> UnitUnits_CommodityCommodities { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UnitCharacteristicScore> UnitCharacteristicScores { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User> Users { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserAssignedForUsers_UnitAssignedUnits> UserAssignedForUsers_UnitAssignedUnits { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserCreatedByUsers_UnitCreatedUnits> UserCreatedByUsers_UnitCreatedUnits { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UnitSecondaryUnits_CommoditySecondaryCommodities> UnitSecondaryUnits_CommoditySecondaryCommodities { get; set; }
    }
}

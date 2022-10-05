using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;
using System.Collections.Generic;
using System.Linq;

namespace GlueForth.Model
{
    [NavigationItem("Units")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Unit : Organization
    {
        public Unit(Session session) : base(session)
        {
        }

        private UnitType _unitType;
        public UnitType UnitType
        {
            get { return _unitType; }
            set { SetPropertyValue("UnitType", ref _unitType, value); }
        }

        private Organisation _organisation;
        [Association("Organisation-Units")]
        public Organisation Organisation
        {
            get { return _organisation; }
            set { SetPropertyValue("Organisation", ref _organisation, value); }
        }

        private Person _contactPerson;
        public Person ContactPerson
        {
            get { return _contactPerson; }
            set { SetPropertyValue("ContactPerson", ref _contactPerson, value); }
        }


        private UnitStructure _unitStructure;
        public UnitStructure UnitStructure
        {
            get { return _unitStructure; }
            set { SetPropertyValue("UnitStructure", ref _unitStructure, value); }
        }

        private Commodity _primaryCommodity;
        public Commodity PrimaryCommodity
        {
            get { return _primaryCommodity; }
            set { SetPropertyValue("Commodity", ref _primaryCommodity, value); }
        }

        private float _locationLongtitude;
        public float LocationLongtitude
        {
            get { return _locationLongtitude; }
            set { SetPropertyValue("LocationLongtitude", ref _locationLongtitude, value); }
        }

        private float _locationLattitude;
        public float LocationLattitude
        {
            get { return _locationLattitude; }
            set { SetPropertyValue("LocationLattitude", ref _locationLattitude, value); }
        }

        private Framework _primaryFramework;
        public Framework PrimaryFramework
        {
            get { return _primaryFramework; }
            set { SetPropertyValue("PrimaryFramework", ref _primaryFramework, value); }
        }

        private AssessmentType _currentAssessmentType;

        public AssessmentType CurrentAssessmentType
        {
            get { return _currentAssessmentType; }
            set { SetPropertyValue("CurrentAssessmentType", ref _currentAssessmentType, value); }
        }

        [Association("Unit-Commodities")]
        public XPCollection<Commodity> Commodities
        {
            get { return GetCollection<Commodity>("Commodities"); }
        }

        [Association("Unit-Retailers")]
        public XPCollection<Retailer> Retailers
        {
            get { return GetCollection<Retailer>("Retailers"); }
        }

        [Association("Unit-Suppliers")]
        public XPCollection<Supplier> Suppliers
        {
            get { return GetCollection<Supplier>("Suppliers"); }
        }

        [Association("Unit-Standards")]
        public XPCollection<Standard> Standards
        {
            get { return GetCollection<Standard>("Standards"); }
        }

        [Association("User-AssignedUnits")]
        public XPCollection<User> AssignedForUsers
        {
            get { return GetCollection<User>("AssignedForUsers"); }
        }

        [Association("User-CreatedUnits")]
        public XPCollection<User> CreatedByUsers
        {
            get { return GetCollection<User>("CreatedByUsers"); }
        }


        public List<UnitCharacteristicScore> CharacteristicScores
        {
            get
            {
                return (from unitCharacteristicScore in new XPQuery<UnitCharacteristicScore>(Session)
                    where unitCharacteristicScore.Unit.Oid == this.Oid
                    select unitCharacteristicScore).ToList();
            }
        }
    }

    public enum UnitStructure
    {
        Independent, //Independent Commercial Entity
        Cooperative
    }
}
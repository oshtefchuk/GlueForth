using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo;
using System.ComponentModel;

namespace GlueForth.Model
{
    [NavigationItem("SPA Structure")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    [DefaultProperty("Reference")]
    public class Commodity : XPObject
    {
        private const string RULEID_COMMODITY_TITLE_REQUIRED = "Commodity.Title_Required";

        private string _reference;
        [Size(200)]
        public string Reference
        {
            get { return _reference; }
            set { SetPropertyValue("Reference", ref _reference, value); }
        }

        private string _title;
        [Size(20)]
        [RuleRequiredField(RULEID_COMMODITY_TITLE_REQUIRED, DefaultContexts.Save)]
        public string Title
        {
            get { return _title; }
            set { SetPropertyValue("Title", ref _title, value); }
        }

        private CommodityCategory _category;
        public CommodityCategory Category
        {
            get { return _category; }
            set { SetPropertyValue("Category", ref _category, value); }
        }

        private UnitType _unitType;
        public UnitType UnitType
        {
            get { return _unitType; }
            set { SetPropertyValue("UnitType", ref _unitType, value); }
        }

        [Association("Commodity-Standards")]
        public XPCollection<Standard> Standards
        {
            get { return GetCollection<Standard>("Standards"); }
        }


        [Association("Supplier-Commodities")]
        public XPCollection<Supplier> Suppliers
        {
            get { return GetCollection<Supplier>("Suppliers"); }
        }

        private Version _version;

        public Commodity(Session session) : base(session)
        {
        }

        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }


        [Association("Commodity-Dimensions")]
        public XPCollection<Dimension> Dimensions
        {
            get { return GetCollection<Dimension>("Dimensions"); }
        }

        [Association("Framework-Commodities")]
        public XPCollection<Framework> Frameworks
        {
            get { return GetCollection<Framework>("Frameworks"); }
        }

        [Association("Commodity-Characteristics")]
        public XPCollection<Characteristic> Characteristics
        {
            get { return GetCollection<Characteristic>("Characteristics"); }
        }

        [Association("Commodity-Principles")]
        public XPCollection<Principle> Principles
        {
            get { return GetCollection<Principle>("Principles"); }
        }

        [Association("Unit-Commodities")]
        public XPCollection<Unit> Units
        {
            get { return GetCollection<Unit>("Units"); }
        }
        #region NonPersistent Fields


        #endregion
    }
}
using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.ExpressApp.Model;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo;
using System;
using System.ComponentModel;
using System.Drawing;

namespace BlueNorth.Model
{
    [DefaultProperty("ShortTitle")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    [NavigationItem("Indicators")]
    [RuleCombinationOfPropertiesIsUnique("CategoryOrderUnique", DefaultContexts.Save, "Category, Order")]
    public class PrimaryDataField : XPObject
    {
        public PrimaryDataField(Session session) : base(session)
        {
        }

        private string _reference;
        [Indexed(Unique = true), Size(50)]
        public string Reference
        {
            get { return _reference; }
            set { SetPropertyValue("Reference", ref _reference, value); }
        }

        private string _name;
        [Size(200)]
        [Required]
        public string Name
        {
            get { return _name; }
            set { SetPropertyValue("Name", ref _name, value); }
        }

        private PrimaryDataType _primaryDataType;
        [Required]
        public PrimaryDataType PrimaryDataType
        {
            get { return _primaryDataType; }
            set { SetPropertyValue("PrimaryDataType", ref _primaryDataType, value); }
        }

        private UnitOfMeasure _defaultUOM;
        public UnitOfMeasure DefaultUOM
        {
            get { return _defaultUOM; }
            set { SetPropertyValue("DefaultUOM", ref _defaultUOM, value); }
        }

        private PrimaryDataField _dependendOn;
        public PrimaryDataField DependendOn
        {
            get { return _dependendOn; }
            set { SetPropertyValue("DependendOn", ref _dependendOn, value); }
        }

        private bool _isCommodityDependendent;
        public bool IsCommodityDependendent
        {
            get { return _isCommodityDependendent; }
            set { SetPropertyValue("IsCommodityDependendent", ref _isCommodityDependendent, value); }
        }

        private bool _isMonthlyDataModeAvailable;
        public bool IsMonthlyDataModeAvailable
        {
            get { return _isMonthlyDataModeAvailable; }
            set { SetPropertyValue("IsMonthlyDataModeAvailable", ref _isMonthlyDataModeAvailable, value); }
        }

        private DataFieldCategory _category;
        [Required]
        public DataFieldCategory Category
        {
            get { return _category; }
            set { SetPropertyValue("Category", ref _category, value); }
        }

        private int _order;
        public int Order
        {
            get { return _order; }
            set { SetPropertyValue("Order", ref _order, value); }
        }

        [Persistent("Color")]
        private Int32 color;
        [NonPersistent]
        public Color Color
        {
            get { return Color.FromArgb(color); }
            set
            {
                color = value.ToArgb();
                OnChanged("Color");
            }
        }

        [Association("PrimaryDataField-UnitsOfMeasure")]
        public XPCollection<UnitOfMeasure> UnitsOfMeasure

        {
            get { return GetCollection<UnitOfMeasure>("UnitsOfMeasure"); }
        }

        [Association("Indicator-PrimaryFields")]
        public XPCollection<Indicator> Indicators
        {
            get { return GetCollection<Indicator>("Indicators"); }
        }

        private string _guidanceNotes;
        [Size(2000)]
        public string GuidanceNotes
        {
            get { return _guidanceNotes; }
            set { SetPropertyValue("GuidanceNotes", ref _guidanceNotes, value); }
        }

        private string _notes;
        [Size(2000)]
        public string Notes
        {
            get { return _notes; }
            set { SetPropertyValue("Notes", ref _notes, value); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }
    }
}
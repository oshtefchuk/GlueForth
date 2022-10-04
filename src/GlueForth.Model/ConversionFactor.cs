using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.ExpressApp.Model;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;
using System.ComponentModel;

namespace BlueNorth.Model
{
    [DefaultProperty("ShortTitle")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    [NavigationItem("Indicators")]
    public class ConversionFactor : XPObject
    {
        public ConversionFactor(Session session) : base(session)
        {
        }

        private string _reference;
        [Indexed(Unique = true), Size(10)]
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

        private PrimaryDataType _dataType;
        [Required]
        public PrimaryDataType DataType
        {
            get { return _dataType; }
            set { SetPropertyValue("DataType", ref _dataType, value); }
        }

        private Country _country;
        [Required]
        public Country Country
        {
            get { return _country; }
            set { SetPropertyValue("Country", ref _country, value); }
        }

        private UnitOfMeasure _sourceUoM;
        [Required]
        public UnitOfMeasure SourceUoM
        {
            get { return _sourceUoM; }
            set { SetPropertyValue("SourceUoM", ref _sourceUoM, value); }
        }
        private UnitOfMeasure _targetUoM;
        [Required]
        public UnitOfMeasure TargetUoM
        {
            get { return _targetUoM; }
            set { SetPropertyValue("TargetUoM", ref _targetUoM, value); }
        }

        private double _value;
        public double Value
        {
            get { return _value; }
            set { SetPropertyValue("Value", ref _value, value); }
        }

        private int _startYear;
        public int StartYear
        {
            get { return _startYear; }
            set { SetPropertyValue("StartYear", ref _startYear, value); }
        }

        private int _endYear;
        public int EndYear
        {
            get { return _endYear; }
            set { SetPropertyValue("EndYear", ref _endYear, value); }
        }

        private string _description;
        [Size(2000)]
        public string Description
        {
            get { return _description; }
            set { SetPropertyValue("Description", ref _description, value); }
        }

        [Association("Indicator-ConversionFactors")]
        public XPCollection<Indicator> Indicators
        {
            get { return GetCollection<Indicator>("Indicators"); }
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
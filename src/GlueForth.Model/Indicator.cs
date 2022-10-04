using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.ExpressApp.Model;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.ComponentModel;
using System.Linq;

namespace BlueNorth.Model
{
    [NavigationItem("Indicators")]

    [DefaultProperty("ShortTitle")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Indicator : XPObject
    {
        public Indicator(Session session) : base(session)
        {
        }

        private string _title;
        [Size(200)]
        public string Title
        {
            get { return _title; }
            set { SetPropertyValue("Title", ref _title, value); }
        }

        private string _shortTitle;
        [Size(20)]
        public string ShortTitle
        {
            get { return _shortTitle; }
            set { SetPropertyValue("ShortTitle", ref _shortTitle, value); }
        }

        private int _order;
        public int Order
        {
            get { return _order; }
            set { SetPropertyValue("Order", ref _order, value); }
        }

        private int _сonversion = 1;
        public int Conversion
        {
            get { return _сonversion; }
            set { SetPropertyValue("Conversion", ref _сonversion, value); }
        }

        private decimal _tresholdValue;
        public decimal TresholdValue
        {
            get { return _tresholdValue; }
            set { SetPropertyValue("TresholdValue", ref _tresholdValue, value); }
        }

        private Characteristic _characteristic;
        public Characteristic Characteristic
        {
            get { return _characteristic; }
            set { SetPropertyValue("Characteristic", ref _characteristic, value); }
        }

        private UnitOfMeasure _unitOfMeasure;
        public UnitOfMeasure UnitOfMeasure
        {
            get { return _unitOfMeasure; }
            set { SetPropertyValue("UnitOfMeasure", ref _unitOfMeasure, value); }
        }


        [Association("Indicator-PrimaryFields")]
        [DetailViewLayoutAttribute("General", LayoutGroupType.TabbedGroup, 100)]
        public XPCollection<PrimaryDataField> PrimaryDataFields
        {
            get { return GetCollection<PrimaryDataField>("PrimaryDataFields"); }
        }

        [Association("Indicator-ConversionFactors")]
        [DetailViewLayoutAttribute("General", LayoutGroupType.TabbedGroup, 100)]
        public XPCollection<ConversionFactor> ConversionFactors
        {
            get { return GetCollection<ConversionFactor>("ConversionFactors"); }
        }
        private string _relevance;

        [Size(1000)]
        public string Relevance
        {
            get { return _relevance; }
            set { SetPropertyValue("Relevance", ref _relevance, value); }
        }

        private string _interpretation;

        [Size(2000)]
        public string Interpretaion
        {
            get { return _interpretation; }
            set { SetPropertyValue("Interpretaion", ref _interpretation, value); }
        }

        private string _formula;
        [Size(2000)]
        [DetailViewLayoutAttribute("General", LayoutGroupType.TabbedGroup, 100)]
        public string Formula
        {
            get { return _formula; }
            set { SetPropertyValue("Formula", ref _formula, value); }
        }

        private string _markup;
        [Size(2000)]
        public string Markup
        {
            get { return _markup; }
            set { SetPropertyValue("Markup", ref _markup, value); }
        }

        [Association("Indicator-Organisations")]
        public XPCollection<Organisation> Organisations
        {
            get { return GetCollection<Organisation>("Organisations"); }
        }

        [Association("Indicator-Users")]
        public XPCollection<User> Users
        {
            get { return GetCollection<User>("Users"); }
        }

        [Association("Indicator-Frameworks")]
        public XPCollection<Framework> Frameworks
        {
            get { return GetCollection<Framework>("Frameworks"); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [VisibleInDetailView(false)]
        public string FrameworksList
        {
            get
            {
                return string.Join("; ", Frameworks.Select(y => y.ShortTitle));
            }
        }
    }
}
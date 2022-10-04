using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.ComponentModel;

namespace BlueNorth.Model
{
    [NavigationItem("SPA Structure")]
    [DefaultProperty("ShortTitle")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Framework : XPObject
    {
        public Framework(Session session) : base(session)
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

        private OrganisationType _organisationType;
        public OrganisationType OrganisationType
        {
            get { return _organisationType; }
            set { SetPropertyValue("OrganisationType", ref _organisationType, value); }
        }

        private ScoringMode _scoringMode;
        public ScoringMode ScoringMode
        {
            get { return _scoringMode; }
            set { SetPropertyValue("ScoringMode", ref _scoringMode, value); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [Association("Framework-Characteristics")]
        public XPCollection<Characteristic> Characteristics
        {
            get { return GetCollection<Characteristic>("Characteristics"); }
        }

        [Association("Framework-Commodities")]
        public XPCollection<Commodity> Commodities
        {
            get { return GetCollection<Commodity>("Commodities"); }
        }

        [Association("Indicator-Frameworks")]
        public XPCollection<Indicator> Indicators
        {
            get { return GetCollection<Indicator>("Indicators"); }
        }

        [Association("Framework-FrontMenuItems")]
        public XPCollection<FrameworkFrontMenuItem> MenuItems
        {
            get { return GetCollection<FrameworkFrontMenuItem>("MenuItems"); }
        }
    }
    public enum ScoringMode
    {
        Matrix,
        Straight
    }
}
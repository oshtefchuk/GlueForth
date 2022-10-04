using DevExpress.Xpo;

namespace BlueNorth.Model
{

    public class CommodityIndicatorGuidance : XPObject
    {
        public CommodityIndicatorGuidance(Session session) : base(session)
        {
        }

        private Commodity _commodity;
        public Commodity Commodity
        {
            get { return _commodity; }
            set { SetPropertyValue("Commodity", ref _commodity, value); }
        }

        private Indicator _indicator;
        public Indicator Indicator
        {
            get { return _indicator; }
            set { SetPropertyValue("Indicator", ref _indicator, value); }
        }

        private string _guidance;
        public string Guidance
        {
            get { return _guidance; }
            set { SetPropertyValue("Guidance", ref _guidance, value); }
        }

        private Version _version;
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }
    }
}
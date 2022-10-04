using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.ComponentModel;

namespace BlueNorth.Model
{
    [NavigationItem("SPA Structure")]
    [DefaultProperty("Code")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class StatusMatrix : XPObject
    {
        public StatusMatrix(Session session) : base(session)
        {
        }

        private string _code;
        [Size(10)]
        [Indexed]
        public string Code
        {
            get { return _code; }
            set { SetPropertyValue("Code", ref _code, value); }
        }

        private int _zone;
        public int Zone
        {
            get { return _zone; }
            set { SetPropertyValue("Zone", ref _zone, value); }
        }

        private string _reference;
        public string Reference
        {
            get { return _reference; }
            set { SetPropertyValue("Reference", ref _reference, value); }
        }

        private double _adjScore;
        public double AdjScore
        {
            get { return _adjScore; }
            set { SetPropertyValue("AdjScore", ref _adjScore, value); }
        }

        private string _statusText;
        public string StatusText
        {
            get { return _statusText; }
            set { SetPropertyValue("StatusText", ref _statusText, value); }
        }
    }
}
using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System;
using System.ComponentModel;
using System.Drawing;

namespace BlueNorth.Model
{
    [NavigationItem("SPA Structure")]
    [DefaultProperty("Reference")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Dimension : XPObject
    {
        public Dimension(Session session) : base(session)
        {
        }

        private string _title;
        [Size(200)]
        public string Title
        {
            get { return _title; }
            set { SetPropertyValue("Title", ref _title, value); }
        }

        private string _reference;
        [Size(200)]
        public string Reference
        {
            get { return _reference; }
            set { SetPropertyValue("Reference", ref _reference, value); }
        }

        private string _shortTitle;
        [Size(30)]
        public string ShortTitle
        {
            get { return _shortTitle; }
            set { SetPropertyValue("ShortTitle", ref _shortTitle, value); }
        }


        private string _description;
        [Size(2000)]
        public string Description
        {
            get { return _description; }
            set { SetPropertyValue("Description", ref _description, value); }
        }

        private string _guidanceText;
        [Size(2000)]
        public string GuidanceText
        {
            get { return _guidanceText; }
            set { SetPropertyValue("GuidanceText", ref _guidanceText, value); }
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

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [Association("Commodity-Dimensions")]
        [Browsable(false)]
        public XPCollection<Commodity> Commodities
        {
            get { return GetCollection<Commodity>("Commodities"); }
        }
    }
}
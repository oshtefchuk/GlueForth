using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.ComponentModel;

namespace BlueNorth.Model
{
    [NavigationItem("Units")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Retailer : XPObject
    {
        public Retailer(Session session) : base(session)
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

        private string _description;
        [Size(2000)]
        public string Description
        {
            get { return _description; }
            set { SetPropertyValue("Description", ref _description, value); }
        }

        private string _image;
        [Size(300)]
        public string Image
        {
            get { return _image; }
            set { SetPropertyValue("Image", ref _image, value); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [Association("Retailer-Suppliers")]
        public XPCollection<Supplier> Retailers
        {
            get { return GetCollection<Supplier>("Retailers"); }
        }

        [Association("Unit-Retailers")]
        [Browsable(false)]
        public XPCollection<Unit> Units
        {
            get { return GetCollection<Unit>("Units"); }
        }
    }
}
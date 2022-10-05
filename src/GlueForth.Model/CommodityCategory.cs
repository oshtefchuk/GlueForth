using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace GlueForth.Model
{
    [NavigationItem("SPA Structure")]
    [DefaultProperty("Title")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class CommodityCategory : XPObject
    {
        public CommodityCategory(Session session) : base(session)
        {
        }

        private string _title;
        [Size(200)]
        public string Title
        {
            get { return _title; }
            set { SetPropertyValue("Title", ref _title, value); }
        }


        private Version _version;
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [NonPersistent]
        public IList<Commodity> Commodities
        {
            get
            {
                return (from commodity in new XPQuery<Commodity>(Session)
                        where commodity.Category != null && commodity.Category.Oid == this.Oid select commodity).ToList();
            }
        }
    }
}
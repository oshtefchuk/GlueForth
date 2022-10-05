using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;
using System.ComponentModel;

namespace GlueForth.Model
{
    [NavigationItem("Units")]
    [DefaultProperty("Name")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Organisation : Organization
    {
        public Organisation(Session session) : base(session)
        {
        }

        [Association("Organisation-Units")]
        public XPCollection<Unit> Units
        {
            get { return GetCollection<Unit>("Units"); }
        }


        [Association("Indicator-Organisations")]
        [Browsable(false)]
        public XPCollection<Indicator> Indicators
        {
            get { return GetCollection<Indicator>("Indicators"); }
        }

        private int _unitsCountLimit;
        public int UnitsCountLimit
        {
            get { return _unitsCountLimit; }
            set { SetPropertyValue("UnitsCountLimit", ref _unitsCountLimit, value); }
        }
    }
}
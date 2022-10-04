using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Xpo;

namespace BlueNorth.Model
{
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class FrameworkFrontMenuItem : XPObject
    {
        public FrameworkFrontMenuItem(Session session) : base(session)
        {
        }

        private Framework _framework;
        [Association("Framework-FrontMenuItems")]
        public Framework Framework
        {
            get { return _framework; }
            set { SetPropertyValue("Framework", ref _framework, value); }
        }

        private FrontMenuItem _frontMenuItem;
        public FrontMenuItem FrontMenuItem
        {
            get { return _frontMenuItem; }
            set { SetPropertyValue("FrontMenuItem", ref _frontMenuItem, value); }
        }

        private bool _disabled;
        public bool Disabled
        {
            get { return _disabled; }
            set { SetPropertyValue("Disabled", ref _disabled, value); }
        }

        public string DisplayName => $"{this.Framework?.Title} - {this.FrontMenuItem?.Route}";
    }
}
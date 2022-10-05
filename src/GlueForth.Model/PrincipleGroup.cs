using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo;
using System.ComponentModel;

namespace GlueForth.Model
{
    [DefaultProperty("ShortTitle")]
    [NavigationItem("SPA Structure")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class PrincipleGroup : XPObject
    {
        public PrincipleGroup(Session session) : base(session)
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
        [RuleUniqueValue("", DefaultContexts.Save,
   CriteriaEvaluationBehavior = CriteriaEvaluationBehavior.BeforeTransaction)]
        public string ShortTitle
        {
            get { return _shortTitle; }
            set { SetPropertyValue("ShortTitle", ref _shortTitle, value); }
        }

        private int _order;
        [RuleUniqueValue]
        public int Order
        {
            get { return _order; }
            set { SetPropertyValue("Order", ref _order, value); }
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
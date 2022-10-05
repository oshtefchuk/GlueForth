using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.ExpressApp.Model;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace GlueForth.Model
{

    [NavigationItem("SPA Structure")]
    [DefaultProperty("ShortTitle")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class QuestionGroup : XPObject
    {
        public QuestionGroup(Session session) : base(session)
        {
        }

        private string _title;
        [Size(200)]
        [Required]
        public string Title
        {
            get { return _title; }
            set { SetPropertyValue("Title", ref _title, value); }
        }

        private string _shortTitle;
        [RuleUniqueValue("", DefaultContexts.Save,
   CriteriaEvaluationBehavior = CriteriaEvaluationBehavior.BeforeTransaction)]
        [Indexed(Unique = true), Size(20)]
        public string ShortTitle
        {
            get { return _shortTitle; }
            set { SetPropertyValue("ShortTitle", ref _shortTitle, value); }
        }

        private string _guidanceText;
        [Size(2000)]
        public string GuidanceText
        {
            get { return _guidanceText; }
            set { SetPropertyValue("GuidanceText", ref _guidanceText, value); }
        }

        private QuestionGroup _parent;
        public QuestionGroup Parent
        {
            get { return _parent; }
            set { SetPropertyValue("Parent", ref _parent, value); }
        }

        [Association("QuestionGroup-Characteristics")]
        public XPCollection<Characteristic> Characteristics
        {
            get { return GetCollection<Characteristic>("Characteristics"); }
        }

        [Association("StandardContent-QuestionGroup")]
        public XPCollection<StandardContent> StandardContents
        {
            get { return GetCollection<StandardContent>("StandardContents"); }
        }

        [VisibleInDetailView(false)]
        [VisibleInListView(false)]
        public string ParentGroup
        {
            get { return Parent == null ? Title : Parent.Title; }
        }

        [VisibleInDetailView(false)]
        [VisibleInListView(false)]
        public int ParentIndex
        {
            get { return Parent == null ? 1 : 0; }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [Appearance("RuleMethod", AppearanceItemType = "ViewItem", TargetItems = "*", Context = "ListView", FontStyle=System.Drawing.FontStyle.Bold)]
        public bool RuleMethod()
        {
            return Parent == null;
        }

        public IList<Question> Questions
        {
            get
            {
               return new XPQuery<Question>(Session).Where(x => x.Group.Oid == Oid).ToList();

            }
        }
    }
}
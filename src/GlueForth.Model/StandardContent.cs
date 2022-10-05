using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.ComponentModel;
using System.Collections.Generic;
using System.Linq;

namespace GlueForth.Model
{
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    [NavigationItem("SPA Structure")]
    [DefaultProperty("Title")]
    public class StandardContent : XPObject
    {
        public StandardContent(Session session) : base(session)
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
        public string Reference
        {
            get { return _reference; }
            set { SetPropertyValue("Reference", ref _reference, value); }
        }

        private string _description;
        [Size(3000)]
        public string Description
        {
            get { return _description; }
            set { SetPropertyValue("Description", ref _description, value); }
        }

        private StandardChapter _standardChapter;
        public StandardChapter StandardChapter
        {
            get { return _standardChapter; }
            set { SetPropertyValue("StandardChapter", ref _standardChapter, value); }
        }


        [Association("StandardContent-Characteristic")]
        public XPCollection<Characteristic> Characteristics
        {
            get { return GetCollection<Characteristic>("Characteristics"); }
        }

        [Association("StandardContent-QuestionGroup")]
        public XPCollection<QuestionGroup> QuestionGroups
        {
            get { return GetCollection<QuestionGroup>("QuestionGroups"); }
        }

        [Association("ImprovementPlanItem-StandardContents")]
        [VisibleInDetailView(false)]
        public XPCollection<ImprovementPlanItem> ImprovementPlanItems
        {
            get { return GetCollection<ImprovementPlanItem>("ImprovementPlanItems"); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [VisibleInDetailView(false)]
        public string QuestionGroupsRefs => string.Join(";", QuestionGroups.Select(x => x.ShortTitle).ToList());
        [VisibleInDetailView(false)]
        public string CharacteristicRefs => string.Join(";", Characteristics.Select(x => x.Reference).ToList());
    }
}
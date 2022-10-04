using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.ComponentModel;
using System.Collections.Generic;
using System.Linq;
using DevExpress.ExpressApp.Model;
using System.Configuration;
using DevExpress.Persistent.Validation;

namespace BlueNorth.Model
{
    [NavigationItem("SPA Structure")]
    [DefaultProperty("Reference")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Characteristic : XPObject
    {
        readonly string[] liteQuestionGroups;
        public Characteristic(Session session) : base(session)
        {
            if (ConfigurationManager.AppSettings["LiteQuestionGroups"] != null)
            {
                string liteGroupsFromConfig = ConfigurationManager.AppSettings["LiteQuestionGroups"].ToLower();
                liteQuestionGroups = liteGroupsFromConfig.Split(';');
            }
        }

        private string _title;
        [Size(200)]
        public string Title
        {
            get { return _title; }
            set { SetPropertyValue("Title", ref _title, value); }
        }       

        private string _shortTitle;
        public string ShortTitle
        {
            get { return _shortTitle; }
            set { SetPropertyValue("ShortTitle", ref _shortTitle, value); }
        }

        private string _reference;
        [Size(200)]
        public string Reference
        {
            get { return _reference; }
            set { SetPropertyValue("Reference", ref _reference, value); }
        }

        private string _description;
        [Size(2000)]
        [DetailViewLayoutAttribute("General", LayoutGroupType.TabbedGroup, 100)]
        public string Description
        {
            get { return _description; }
            set { SetPropertyValue("Description", ref _description, value); }
        }

        private string _summary;
        [Size(2000)]
        [DetailViewLayoutAttribute("General", LayoutGroupType.TabbedGroup, 100)]
        public string Summary
        {
            get { return _summary; }
            set { SetPropertyValue("Summary", ref _summary, value); }
        }

        private string _guidanceText;
        [Size(SizeAttribute.Unlimited), ObjectValidatorIgnoreIssue(typeof(ObjectValidatorLargeNonDelayedMember))]
        [DetailViewLayoutAttribute("General", LayoutGroupType.TabbedGroup, 100)]
        public string GuidanceText
        {
            get { return _guidanceText; }
            set { SetPropertyValue("GuidanceText", ref _guidanceText, value); }
        }

        private string _nonFulfilmentRisks;
        [Size(2000)]
        [DetailViewLayoutAttribute("General", LayoutGroupType.TabbedGroup, 100)]
        public string NonFulfilmentRisks
        {
            get { return _nonFulfilmentRisks; }
            set { SetPropertyValue("NonFulfilmentRisks", ref _nonFulfilmentRisks, value); }
        }

        private Principle _principle;
        public Principle Principle
        {
            get { return _principle; }
            set { SetPropertyValue("Principle", ref _principle, value); }
        }

        private PrincipleGroup _principleGroup;
        public PrincipleGroup PrincipleGroup
        {
            get { return _principleGroup; }
            set { SetPropertyValue("PrincipleGroup", ref _principleGroup, value); }
        }

        [VisibleInDetailView(false)]
        public string FrameworksList
        {
            get
            {
                return string.Join("; ", Frameworks.Select(y => y.ShortTitle));
            }
        }

        private CommodityCategory _commodityCategory;
        public CommodityCategory CommodityCategory
        {
            get { return _commodityCategory; }
            set { SetPropertyValue("CommodityCategory", ref _commodityCategory, value); }
        }     

        private OrganisationType _organisationType;
        public OrganisationType OrganisationType
        {
            get { return _organisationType; }
            set { SetPropertyValue("OrganisationType", ref _organisationType, value); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [Association("Commodity-Characteristics")]
        [Browsable(false)]
        public XPCollection<Commodity> Commodities
        {
            get { return GetCollection<Commodity>("Commodities"); }
        }

        [Association("Framework-Characteristics")]
        public XPCollection<Framework> Frameworks
        {
            get { return GetCollection<Framework>("Frameworks"); }
        }

        [Association("SPADataSet-Characteristics")]
        [Browsable(false)]
        public XPCollection<SPADataSet> SPADataSets
        {
            get { return GetCollection<SPADataSet>("SPADataSets"); }
        }

        [Association("QuestionGroup-Characteristics")]
        [VisibleInDetailView(false)]
        public XPCollection<QuestionGroup> QuestionGroups
        {
            get { return GetCollection<QuestionGroup>("QuestionGroups"); }
        }

        [Association("Question-Characteristics")]
        public XPCollection<Question> Questions
        {
            get { return GetCollection<Question>("Questions"); }
        }

        [Association("StandardContent-Characteristic")]
        public XPCollection<StandardContent> StandardContents
        {
            get { return GetCollection<StandardContent>("StandardContents"); }
        }

        public IList<Question> LiteSPAQuestions
        {
            get
            {
                return QuestionGroups.Where(x => liteQuestionGroups.Contains(x.Title.ToLower())).SelectMany(x => x.Questions).ToList();
            }
        }       

        public IList<Scoring> Scoring
        {
            get
            {
                return (from scoring in new XPQuery<Scoring>(Session)
                        where scoring.Characteristic.Oid == this.Oid
                        select scoring).ToList();

            }
        }
        
    }
}
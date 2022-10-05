using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.ComponentModel;
using System.Collections.Generic;
using System.Linq;

namespace GlueForth.Model
{
    public enum AssessmentType
    {
        Full,
        Lite
    }

    [NavigationItem("SPA Structure")]
    [DefaultProperty("Title")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Question : XPObject
    {
        public Question(Session session) : base(session)
        {
        }

        public override void AfterConstruction()
        {
            DefaultAnswer = AnswerVariants.Yes;
            base.AfterConstruction();
        }

        private string _title;
        [Size(500)]
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

        private string _guidanceText;
        [Size(2000)]
        public string GuidanceText
        {
            get { return _guidanceText; }
            set { SetPropertyValue("GuidanceText", ref _guidanceText, value); }
        }

        private string _improvementPlanQuestion;
        [Size(500)]
        public string ImprovementPlanQuestion
        {
            get { return _improvementPlanQuestion; }
            set { SetPropertyValue("ImprovementPlanQuestion", ref _improvementPlanQuestion, value); }
        }

        private string _improvementPlanGuidance;
        [Size(1000)]
        public string ImprovementPlanGuidance
        {
            get { return _improvementPlanGuidance; }
            set { SetPropertyValue("ImprovementPlanGuidance", ref _improvementPlanGuidance, value); }
        }

        private QuestionGroup _group;
        public QuestionGroup Group
        {
            get { return _group; }
            set { SetPropertyValue("Group", ref _group, value); }
        }

        private AnswerVariants _defaultAnswer;
        [VisibleInListView(false)]
        public AnswerVariants DefaultAnswer
        {
            get { return _defaultAnswer; }
            set { SetPropertyValue("DefaultAnswer", ref _defaultAnswer, value); }
        }

        private string _unknownAnswerGuidance;
        [Size(200)]
        [VisibleInListView(false)]
        public string UnknownAnswerGuidance
        {
            get { return _unknownAnswerGuidance; }
            set { SetPropertyValue("UnknownAnswerGuidance", ref _unknownAnswerGuidance, value); }
        }

        private string _noAnswerGuidance;
        [Size(200)]
        [VisibleInListView(false)]
        public string NoAnswerGuidance
        {
            get { return _noAnswerGuidance; }
            set { SetPropertyValue("NoAnswerGuidance", ref _noAnswerGuidance, value); }
        }

        private string _partiallyAnswerGuidance;
        [Size(200)]
        [VisibleInListView(false)]
        public string PartiallyAnswerGuidance
        {
            get { return _partiallyAnswerGuidance; }
            set { SetPropertyValue("PartiallyAnswerGuidance", ref _partiallyAnswerGuidance, value); }
        }

        private string _yesAnswerGuidance;
        [Size(200)]
        [VisibleInListView(false)]
        public string YesAnswerGuidance
        {
            get { return _yesAnswerGuidance; }
            set { SetPropertyValue("YesAnswerGuidance", ref _yesAnswerGuidance, value); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [Association("Question-Characteristics")]
        [Browsable(false)]
        public XPCollection<Characteristic> Characteristics
        {
            get { return GetCollection<Characteristic>("Characteristics"); }
        }

        public string Frameworks
        {
            get
            {
                return string.Join("; ", Characteristics.SelectMany(x => x.Frameworks).Distinct().Select(y => y.Title));
            }
        }

        public List<Answer> Answers
        {
            get
            {
                return (from answer in new XPQuery<Answer>(Session)
                    where answer.Question.Oid == this.Oid
                    select answer).ToList();
            }
        }
    }
}
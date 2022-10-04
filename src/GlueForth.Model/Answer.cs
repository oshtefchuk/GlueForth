using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo;
using System;

namespace BlueNorth.Model
{
    public enum AnswerVariants
    {
        Unknown,
        No,
        Partially,
        Yes
    }

    [NavigationItem("SPA Results")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    [RuleCombinationOfPropertiesIsUnique("Question,Characteristic,DataSet")]
    public class Answer : XPObject
    {
        public Answer(Session session) : base(session)
        {
        }

        private Question _question;
        public Question Question
        {
            get { return _question; }
            set { SetPropertyValue("Question", ref _question, value); }
        }

        private Characteristic _characteristic;
        public Characteristic Characteristic
        {
            get { return _characteristic; }
            set { SetPropertyValue("Characteristic", ref _characteristic, value); }
        }

        private AnswerVariants _choice;
        public AnswerVariants Choice
        {
            get { return _choice; }
            set { SetPropertyValue("Choice", ref _choice, value); }
        }

        private User _user;
        public User User
        {
            get { return _user; }
            set { SetPropertyValue("User", ref _user, value); }
        }

        private SPADataSet _dataSet;
        public SPADataSet DataSet
        {
            get { return _dataSet; }
            set { SetPropertyValue("DataSet", ref _dataSet, value); }
        }

        private DateTime _created;
        public DateTime Created
        {
            get { return _created; }
            set { SetPropertyValue("Created", ref _created, value); }
        }

        private DateTime _modified;
        public DateTime Modified
        {
            get { return _modified; }
            set { SetPropertyValue("Modified", ref _modified, value); }
        }

        public string DisplayName => $"{Characteristic?.Reference} - {Question?.Reference} - {Choice}";
    }
}
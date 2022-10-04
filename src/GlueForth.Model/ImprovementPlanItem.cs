using System;
using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace BlueNorth.Model
{

    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    [NavigationItem("Prioritisation")]
    public class ImprovementPlanItem : XPObject
    {
        public ImprovementPlanItem(Session session) : base(session)
        {
        }

        private SPADataSet _dataSet;
        public SPADataSet DataSet
        {
            get { return _dataSet; }
            set { SetPropertyValue("DataSet", ref _dataSet, value); }
        }


        private Characteristic _characteristic;
        public Characteristic Characteristic
        {
            get { return _characteristic; }
            set { SetPropertyValue("Characteristic", ref _characteristic, value); }
        }

        private Question _question;
        public Question Question
        {
            get { return _question; }
            set { SetPropertyValue("Question", ref _question, value); }
        }

        private StandardContent _standardContent;
        public StandardContent StandardContent
        {
            get { return _standardContent; }
            set { SetPropertyValue("StandardContent", ref _standardContent, value); }
        }

        [Association("ImprovementPlanItem-StandardContents")]
        public XPCollection<StandardContent> StandardContents
        {
            get { return GetCollection<StandardContent>("StandardContents"); }
        }

        private string _actions;
        [Size(500)]
        public string Actions
        {
            get { return _actions; }
            set { SetPropertyValue("Actions", ref _actions, value); }
        }

        private string _resposible;
        [Size(200)]
        public string Resposible
        {
            get { return _resposible; }
            set { SetPropertyValue("Resposible", ref _resposible, value); }
        }

        private DateTime _dueDate;
        public DateTime DueDate
        {
            get { return _dueDate; }
            set { SetPropertyValue("DueDate", ref _dueDate, value); }
        }

        private DateTime _completed;
        public DateTime Completed
        {
            get { return _completed; }
            set { SetPropertyValue("Completed", ref _completed, value); }
        }

        private DateTime _created;
        public DateTime Created
        {
            get { return _created; }
            set { SetPropertyValue("Created", ref _created, value); }
        }

        private string _result;
        [Size(500)]
        public string Result
        {
            get { return _result; }
            set { SetPropertyValue("Result", ref _result, value); }
        }

        private bool _isCompleted;
        public bool IsCompleted
        {
            get { return _isCompleted; }
            set { SetPropertyValue("IsCompleted", ref _isCompleted, value); }
        }

        private double _cost;
        /// <summary>
        /// estimated cost of improvement
        /// </summary>
        public double Cost
        {
            get { return _cost; }
            set { SetPropertyValue("Cost", ref _cost, value); }
        }

        /// <summary>
        /// estimated cost of improvement
        /// </summary>
        private FileData _attachment;
        [Aggregated, ExpandObjectMembers(ExpandObjectMembers.Never)]
        [FileTypeFilter("DocumentFiles", 1, "*.txt", "*.doc", "*.docx", "*.pdf")]
        [FileTypeFilter("Images", 2, "*.jpg", "*.png", "*.jpeg", "*.gif")]
        public FileData Attachment
        {
            get { return _attachment; }
            set { SetPropertyValue("Attachment", ref _attachment, value); }
        }

        private bool _isDisabled;
        public bool IsDisabled
        {
            get { return _isDisabled; }
            set { SetPropertyValue("IsDisabled", ref _isDisabled, value); }
        }
    }
}
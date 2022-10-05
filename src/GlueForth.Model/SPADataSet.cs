using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System;

namespace GlueForth.Model
{
    [NavigationItem("SPA Results")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class SPADataSet : XPObject
    {
        public SPADataSet(Session session) : base(session)
        {
        }

        private Unit _unit;
        public Unit Unit
        {
            get { return _unit; }
            set { SetPropertyValue("Unit", ref _unit, value); }
        }

        private Framework _framework;
        public Framework Framework
        {
            get { return _framework; }
            set { SetPropertyValue("Framework", ref _framework, value); }
        }

        private AssessmentType _assessmentType;
        public AssessmentType AssessmentType
        {
            get { return _assessmentType; }
            set { SetPropertyValue("AssessmentType", ref _assessmentType, value); }
        }

        private Grade _grade;
        public Grade Grade
        {
            get { return _grade; }
            set { SetPropertyValue("Grade", ref _grade, value); }
        }

        [Association("SPADataSet-Characteristics")]
        public XPCollection<Characteristic> NonRelevantCharacteristics => GetCollection<Characteristic>("NonRelevantCharacteristics");

        private string _comment;
        [Size(2000)]
        public string Comment
        {
            get { return _comment; }
            set { SetPropertyValue("Comment", ref _comment, value); }
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
    }
}
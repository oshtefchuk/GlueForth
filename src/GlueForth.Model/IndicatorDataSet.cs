using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System;

namespace BlueNorth.Model
{
    [NavigationItem("Indicators")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class IndicatorDataSet : XPObject
    {
        public IndicatorDataSet(Session session) : base(session)
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


        private Int16 _periodFromYear;
        public Int16 PeriodFromYear
        {
            get { return _periodFromYear; }
            set { SetPropertyValue("PeriodFromYear", ref _periodFromYear, value); }
        }

        private Int16 _periodToYear;
        public Int16 PeriodToYear
        {
            get { return _periodToYear; }
            set { SetPropertyValue("PeriodToYear", ref _periodToYear, value); }
        }

        private Int16 _periodFromMonth;
        public Int16 PeriodFromMonth
        {
            get { return _periodFromMonth; }
            set { SetPropertyValue("PeriodFromMonth", ref _periodFromMonth, value); }
        }

        private Int16 _periodToMonth;
        public Int16 PeriodToMonth
        {
            get { return _periodToMonth; }
            set { SetPropertyValue("PeriodToMonth", ref _periodToMonth, value); }
        }

        private Grade _grade;
        public Grade Grade
        {
            get { return _grade; }
            set { SetPropertyValue("Grade", ref _grade, value); }
        }

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

        [NonPersistent]
        [DisplayName()]
        public string DisplayName
        {
            get { return $"{Unit?.Name} {PeriodFromYear}-{PeriodToYear} {Framework?.Title}";  }
        }
    }
}

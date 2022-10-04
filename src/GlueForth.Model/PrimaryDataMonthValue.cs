using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System;

namespace BlueNorth.Model
{
    [NavigationItem("Indicators")]

    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class PrimaryDataMonthValue : XPObject
    {
        public PrimaryDataMonthValue(Session session) : base(session)
        {
        }

        private PrimaryDataValue _primaryDataValue;
        public PrimaryDataValue PrimaryDataValue
        {
            get { return _primaryDataValue; }
            set { SetPropertyValue("PrimaryDataValue", ref _primaryDataValue, value); }
        }

        private int _monthNumber;
        public int MonthNumber
        {
            get { return _monthNumber; }
            set { SetPropertyValue("MonthNumber", ref _monthNumber, value); }
        }

        private string _value;
        public string Value
        {
            get { return _value; }
            set { SetPropertyValue("Value", ref _value, value); }
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


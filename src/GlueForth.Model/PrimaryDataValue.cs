using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System;

namespace BlueNorth.Model
{
    [NavigationItem("Indicators")]

    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class PrimaryDataValue : XPObject
    {
        public PrimaryDataValue(Session session) : base(session)
        {
        }

        private PrimaryDataField _primaryDataField;
        public PrimaryDataField PrimaryDataField
        {
            get { return _primaryDataField; }
            set { SetPropertyValue("PrimaryDataField", ref _primaryDataField, value); }
        }

        private IndicatorDataSet _dataSet;
        public IndicatorDataSet DataSet
        {
            get { return _dataSet; }
            set { SetPropertyValue("DataSet", ref _dataSet, value); }
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


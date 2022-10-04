using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System;

namespace BlueNorth.Model
{
    [NavigationItem("Indicators")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class PrimaryDataFieldNote : XPObject
    {
        public PrimaryDataFieldNote(Session session) : base(session)
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

        private User _user;
        public User User
        {
            get { return _user; }
            set { SetPropertyValue("User", ref _user, value); }
        }

        private string _note;
        [Size(2000)]
        public string Note
        {
            get { return _note; }
            set { SetPropertyValue("Note", ref _note, value); }
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


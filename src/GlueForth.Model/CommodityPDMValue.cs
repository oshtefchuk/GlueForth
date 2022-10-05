using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System;

namespace GlueForth.Model
{
    /// <summary>
    /// Class, that represents Commodity-specific primary data value for specific Month
    /// </summary>
    [NavigationItem("Indicators")]   
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class CommodityPDMValue : XPObject
    {
        public CommodityPDMValue(Session session) : base(session)
        {
        }

        private PrimaryDataMonthValue _primaryDataMonthValue;
        public PrimaryDataMonthValue PrimaryDataMonthValue
        {
            get { return _primaryDataMonthValue; }
            set { SetPropertyValue("PrimaryDataValue", ref _primaryDataMonthValue, value); }
        }

        private Commodity _commodity;
        public Commodity Commodity
        {
            get { return _commodity; }
            set { SetPropertyValue("Commodity", ref _commodity, value); }
        }

        private double _value;
        public double Value
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


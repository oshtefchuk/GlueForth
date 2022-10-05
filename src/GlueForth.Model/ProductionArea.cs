using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System;

namespace GlueForth.Model
{
    [NavigationItem("Indicators")]

    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class ProductionArea : XPObject
    {
        public ProductionArea(Session session) : base(session)
        {
        }

        private PrimaryDataValue _primaryDataValue;
        public PrimaryDataValue PrimaryDataValue
        {
            get { return _primaryDataValue; }
            set { SetPropertyValue("PrimaryDataValue", ref _primaryDataValue, value); }
        }

        private string _name;
        [Size(200)]
        public string Name
        {
            get { return _name; }
            set { SetPropertyValue("Name", ref _name, value); }
        }

        private double _size;
        public double Size
        {
            get { return _size; }
            set { SetPropertyValue("Size", ref _size, value); }
        }


        private string _drawingData;
        [Size(SizeAttribute.Unlimited), ObjectValidatorIgnoreIssue(typeof(ObjectValidatorLargeNonDelayedMember))]
        public string DrawingData
        {
            get { return _drawingData; }
            set { SetPropertyValue("DrawingData", ref _drawingData, value); }
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


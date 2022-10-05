using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Xpo;

namespace GlueForth.Model
{
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class PrimaryDataFieldUserEditMode : XPObject
    {
        public PrimaryDataFieldUserEditMode(Session session) : base(session)
        {
        }
        private PrimaryDataField _primaryDataField;
        public PrimaryDataField PrimaryDataField
        {
            get { return _primaryDataField; }
            set { SetPropertyValue("PrimaryDataField", ref _primaryDataField, value); }
        }


        private User _user;
        public User User
        {
            get { return _user; }
            set { SetPropertyValue("User", ref _user, value); }
        }

        private AreaSizeMode _areaSizeMode;
        public AreaSizeMode AreaSizeMode
        {
            get { return _areaSizeMode; }
            set { SetPropertyValue("AreaSizeMode", ref _areaSizeMode, value); }
        }

        private PeriodDataMode _periodDataMode;
        public PeriodDataMode PeriodDataMode
        {
            get { return _periodDataMode; }
            set { SetPropertyValue("PeriodDataMode", ref _periodDataMode, value); }
        }

        private Commodity _commodity;
        public Commodity Commodity
        {
            get { return _commodity; }
            set { SetPropertyValue("Commodity", ref _commodity, value); }
        }

    }

    public enum PeriodDataMode
    {
        Annually,
        Monthly
    }
}
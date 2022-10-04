using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo;

namespace BlueNorth.Model
{
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    [NavigationItem("Prioritisation")]
    [RuleCombinationOfPropertiesIsUnique("DataSetCharacteristicUnique", DefaultContexts.Save, "DataSet, Characteristic")]
    [RuleCombinationOfPropertiesIsUnique("DataSetOrder", DefaultContexts.Save, "DataSet, Order")]
    public class PriorCharacteristic : XPObject
    {
        public PriorCharacteristic(Session session) : base(session)
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

        private int _order;
        public int Order
        {
            get { return _order; }
            set { SetPropertyValue("Order", ref _order, value); }
        }
    }
}
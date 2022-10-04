using System.ComponentModel;
using DevExpress.Xpo;
using DevExpress.Persistent.Validation;
using DevExpress.Persistent.Base;
using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;

namespace BlueNorth.Model
{
    [DefaultProperty("Title")]
    [NavigationItem("SPA Results")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Scoring : XPObject
    {
        #region constructor
        public Scoring(Session session) : base(session)
        {
        }
        #endregion
        #region Persistent Fields
        private Characteristic _characteristic;
        [RuleRequiredField()]
        public Characteristic Characteristic
        {
            get { return _characteristic; }
            set { SetPropertyValue("Characteristic", ref _characteristic, value); }
        }

        private Commodity _commodity;
        [RuleRequiredField()]
        public Commodity Commodity
        {
            get { return _commodity; }
            set { SetPropertyValue("Commodity", ref _commodity, value); }
        }

        private UnitType _unitType;
        [RuleRequiredField()]
        public UnitType UnitType
        {
            get { return _unitType; }
            set { SetPropertyValue("UnitType", ref _unitType, value); }
        }

        private float _score;
        public float Score
        {
            get { return _score; }
            set { SetPropertyValue("Score", ref _score, value); }
        }

        public override void AfterConstruction()
        {
            this.Score = 1;
            base.AfterConstruction();
        }
        #endregion
    }

}

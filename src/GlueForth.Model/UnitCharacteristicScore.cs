using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Xpo;
using System;

namespace GlueForth.Model
{
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class UnitCharacteristicScore : XPObject
    {
        public UnitCharacteristicScore(Session session) : base(session)
        {
        }
        private Characteristic _сharacteristicd;
        public Characteristic Characteristic
        {
            get { return _сharacteristicd; }
            set { SetPropertyValue("Characteristic", ref _сharacteristicd, value); }
        }

        private Framework _framework;
        public Framework Framework
        {
            get { return _framework; }
            set { SetPropertyValue("Framework", ref _framework, value); }
        }

        private Unit _unit;
        public Unit Unit
        {
            get { return _unit; }
            set { SetPropertyValue("Unit", ref _unit, value); }
        }

        private DateTime _calculated;
        public DateTime Calculated
        {
            get { return _calculated; }
            set { SetPropertyValue("Calculated", ref _calculated, value); }
        }

        private double _score;
        public double Score
        {
            get { return _score; }
            set { SetPropertyValue("Score", ref _score, value); }
        }
    }
}
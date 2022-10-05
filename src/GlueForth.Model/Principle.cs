using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using DevExpress.Xpo;
using System;
using System.ComponentModel;
using System.Drawing;

namespace GlueForth.Model
{
    [NavigationItem("SPA Structure")]
    [DefaultProperty("ShortTitle")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Principle : XPObject
    {
        public Principle(Session session) : base(session)
        {
        }

        private string _title;
        [Size(200)]
        public string Title
        {
            get { return _title; }
            set { SetPropertyValue("Title", ref _title, value); }
        }

        private string _shortTitle;
        [RuleUniqueValue("", DefaultContexts.Save,
            CriteriaEvaluationBehavior = CriteriaEvaluationBehavior.BeforeTransaction)]
        [Indexed(Unique = true), Size(50)]
        public string ShortTitle
        {
            get { return _shortTitle; }
            set { SetPropertyValue("ShortTitle", ref _shortTitle, value); }
        }

        private string _reference;
        [Size(200)]
        public string Reference
        {
            get { return _reference; }
            set { SetPropertyValue("Reference", ref _reference, value); }
        }

        private string _description;
        [Size(2000)]
        public string Description
        {
            get { return _description; }
            set { SetPropertyValue("Description", ref _description, value); }
        }

        private string _summary;
        [Size(2000)]
        public string Summary
        {
            get { return _summary; }
            set { SetPropertyValue("Summary", ref _summary, value); }
        }

        private string _guidanceText;
        [Size(2000)]
        public string GuidanceText
        {
            get { return _guidanceText; }
            set { SetPropertyValue("GuidanceText", ref _guidanceText, value); }
        }

        private Dimension _dimension;
        public Dimension Dimension
        {
            get { return _dimension; }
            set { SetPropertyValue("Dimension", ref _dimension, value); }
        }

        private int _order;
        [RuleUniqueValue]
        public int Order
        {
            get { return _order; }
            set { SetPropertyValue("Order", ref _order, value); }
        }

        [Persistent("Color")]
        private Int32 color;
        [NonPersistent]
        public Color Color
        {
            get { return Color.FromArgb(color); }
            set
            {
                color = value.ToArgb();
                OnChanged("Color");
            }
        }

        private string _link;
        [Size(100)]
        public string Link
        {
            get { return _link; }
            set { SetPropertyValue("Link", ref _link, value); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [Association("Commodity-Principles")]
        [Browsable(false)]
        public XPCollection<Commodity> Commodities
        {
            get { return GetCollection<Commodity>("Commodities"); }
        }
    }
}
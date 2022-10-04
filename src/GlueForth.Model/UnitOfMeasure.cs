using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.ComponentModel;

namespace BlueNorth.Model
{
    [DefaultProperty("ShortTitle")]
    [NavigationItem("Indicators")]
    public class UnitOfMeasure : XPObject
    {
        public UnitOfMeasure(Session session) : base(session)
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
        [Size(20)]
        public string ShortTitle
        {
            get { return _shortTitle; }
            set { SetPropertyValue("ShortTitle", ref _shortTitle, value); }
        }

        private string _symbol;
        [Size(20)]
        public string Symbol
        {
            get { return _symbol; }
            set { SetPropertyValue("Symbol", ref _symbol, value); }
        }

        [Association("PrimaryDataField-UnitsOfMeasure")]
        [Browsable(false)]
        public XPCollection<PrimaryDataField> PrimaryDataFields

        {
            get { return GetCollection<PrimaryDataField>("PrimaryDataFields"); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }
    }
}
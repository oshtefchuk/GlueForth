using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.ComponentModel;

namespace GlueForth.Model
{
    [DefaultProperty("ShortTitle")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class PrimaryDataType : XPObject
    {
        public PrimaryDataType(Session session) : base(session)
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

        private bool _isMapArea;
        [ImmediatePostData]
        public bool IsMapArea
        {
            get { return _isMapArea; }
            set { SetPropertyValue("IsMapArea", ref _isMapArea, value); }
        }

        private bool _isBoolean;
        public bool IsBoolean
        {
            get { return _isBoolean; }
            set { SetPropertyValue("IsBoolean", ref _isBoolean, value); }
        }

        private AreaSizeMode _areaSizeMode;
        [Appearance("HideAreaSizeMode", TargetItems = "AreaSizeMode", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide, Criteria = "IsMapArea=0")]
        public AreaSizeMode AreaSizeMode
        {
            get { return _areaSizeMode; }
            set { SetPropertyValue("AreaSizeMode", ref _areaSizeMode, value); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        /// <summary>
        /// Mode of data entering for this type primary data fields
        /// </summary>

    }
    public enum AreaSizeMode
    {
        MapTool,
        Manual
    }
}
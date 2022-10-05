using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.ExpressApp.Model;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace GlueForth.Model
{
    [NavigationItem("SPA Structure")]
    [DefaultProperty("ShortTitle")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class StandardChapter : XPObject
    {
        public StandardChapter(Session session) : base(session)
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

        private string _reference;
        public string Reference
        {
            get { return _reference; }
            set { SetPropertyValue("Reference", ref _reference, value); }
        }

        private Standard _standard;
        [Required]
        public Standard Standard
        {
            get { return _standard; }
            set { SetPropertyValue("Standard", ref _standard, value); }
        }

        private StandardChapter _parent;
        public StandardChapter Parent
        {
            get { return _parent; }
            set { SetPropertyValue("Parent", ref _parent, value); }
        }

        public IList<StandardContent> StandardContents => (from standardContent in new XPQuery<StandardContent>(Session)
                                                           where standardContent.StandardChapter.Oid == this.Oid
                                                           select standardContent).ToList();

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }
    }
}
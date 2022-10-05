using System.ComponentModel;
using DevExpress.Xpo;
using DevExpress.Persistent.Validation;
using DevExpress.Persistent.Base;
using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using System.Collections.Generic;
using System.Linq;

namespace GlueForth.Model
{
    [DefaultProperty("Title")]
    [NavigationItem("SPA Structure")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class Standard : XPObject
    {
        private const string RULEID_STANDARD_TITLE_REQUIRED = "Standard.Title_Required";
        #region constructor
        public Standard(Session session) : base(session)
        {
        }
        #endregion
        #region Persistent Fields
        private string _reference;
        public string Reference
        {
            get { return _reference; }
            set { SetPropertyValue("Reference", ref _reference, value); }
        }

        private string _title;
        [Size(300)]
        [RuleRequiredField(RULEID_STANDARD_TITLE_REQUIRED, DefaultContexts.Save)]
        public string Title
        {
            get { return _title; }
            set { SetPropertyValue("Title", ref _title, value); }
        }

        private string _shortTitle;
        [Size(30)]
        public string ShortTitle
        {
            get { return _shortTitle; }
            set { SetPropertyValue("ShortTitle", ref _shortTitle, value); }
        }

        private string _description;
        [Size(2000)]
        public string Description
        {
            get { return _description; }
            set { SetPropertyValue("Description", ref _description, value); }
        }


        private string _edition;
        [Size(2000)]
        public string Edition
        {
            get { return _edition; }
            set { SetPropertyValue("Edition", ref _edition, value); }
        }

        [ImageEditor(ListViewImageEditorMode = ImageEditorMode.PictureEdit,
            DetailViewImageEditorMode = ImageEditorMode.PictureEdit,
            ListViewImageEditorCustomHeight = 40)]
        public byte[] LogoImage
        {
            get { return GetPropertyValue<byte[]>("LogoImage"); }
            set { SetPropertyValue<byte[]>("LogoImage", value); }
        }

        private Version _version;
        [Browsable(false)]
        public Version Version
        {
            get { return _version; }
            set { SetPropertyValue("Version", ref _version, value); }
        }

        [Association("Commodity-Standards")]
        public XPCollection<Commodity> Commodities
        {
            get { return GetCollection<Commodity>("Commodities"); }
        }

        [Association("Unit-Standards")]
        [Browsable(false)]
        public XPCollection<Unit> Units
        {
            get { return GetCollection<Unit>("Units"); }
        }
        #endregion

        #region non-persistent fields
        public IList<StandardChapter> StandardChapters => (from standardChapter in new XPQuery<StandardChapter>(Session)
                                                           where standardChapter.Standard.Oid == this.Oid
                                                           select standardChapter).ToList();

        public IList<StandardContent> StandardContents => (from standardContent in new XPQuery<StandardContent>(Session)
                                                           where standardContent.StandardChapter.Standard.Oid == this.Oid
                                                           select standardContent).ToList();

        public IList<Characteristic> Characteristics => StandardContents.SelectMany(x => x.Characteristics).Distinct().ToList();

        public IList<QuestionGroup> QuestionGroups => Characteristics.SelectMany(x => x.QuestionGroups).Distinct().ToList();

        #endregion
    }

}

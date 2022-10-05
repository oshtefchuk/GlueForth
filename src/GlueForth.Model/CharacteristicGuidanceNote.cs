using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Xpo;
using System.ComponentModel;

namespace GlueForth.Model
{
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class CharacteristicGuidanceNote : XPObject
    {
        public CharacteristicGuidanceNote(Session session) : base(session)
        {
        }

        private Characteristic _characteristic;
        public Characteristic Characteristic
        {
            get { return _characteristic; }
            set { SetPropertyValue("Characteristic", ref _characteristic, value); }
        }

        private string _text;
        public string Text
        {
            get { return _text; }
            set { SetPropertyValue("Text", ref _text, value); }
        }

        private string _markup;
        public string Markup
        {
            get { return _markup; }
            set { SetPropertyValue("Markup", ref _markup, value); }
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
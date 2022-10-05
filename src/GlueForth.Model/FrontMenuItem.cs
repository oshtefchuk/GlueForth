using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Xpo;

namespace GlueForth.Model
{
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class FrontMenuItem : XPObject
    {
        public FrontMenuItem(Session session) : base(session)
        {
        }

        private string _route;
        [Size(100)]
        public string Route
        {
            get { return _route; }
            set { SetPropertyValue("Answer", ref _route, value); }
        }

        private string _text;
        [Size(300)]
        public string Text
        {
            get { return _text; }
            set { SetPropertyValue("Text", ref _text, value); }
        }

        private AssessmentType _assessmentType;
        public AssessmentType AssessmentType
        {
            get { return _assessmentType; }
            set { SetPropertyValue("Answer", ref _assessmentType, value); }
        }

        public string DisplayName => $"{this.Route} - {this.Text}";
    }
}
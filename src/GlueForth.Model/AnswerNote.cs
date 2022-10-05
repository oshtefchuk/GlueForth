using System.Collections.Generic;
using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using System.Linq;

namespace GlueForth.Model
{


    [NavigationItem("SPA Results")]
    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    public class AnswerNote : XPObject
    {
        public AnswerNote(Session session) : base(session)
        {
        }

        private Answer _answer;
        public Answer Answer
        {
            get { return _answer; }
            set { SetPropertyValue("Answer", ref _answer, value); }
        }

        private string _note;
        [Size(3000)]
        public string Note
        {
            get { return _note; }
            set { SetPropertyValue("Result", ref _note, value); }
        }

        [NonPersistent]
        public List<AnswerNoteAttachment> Attachments
        {
            get
            {
                return (from attachment in new XPQuery<AnswerNoteAttachment>(Session)
                    where attachment.AnswerNote.Oid == this.Oid
                    select attachment).ToList();
            }
        }

        public string DisplayName => $"{Answer.DisplayName} - {this.Note}";
    }
}
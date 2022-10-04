using System;
using DevExpress.ExpressApp.ConditionalAppearance;
using DevExpress.ExpressApp.Editors;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Xpo;

namespace BlueNorth.Model
{

    [Appearance("HideOid", TargetItems = "Oid", AppearanceItemType = "ViewItem", Visibility = ViewItemVisibility.Hide)]
    [NavigationItem("SPA Results")]
    public class AnswerNoteAttachment : XPObject
    {
        public AnswerNoteAttachment(Session session) : base(session)
        {
        }

        private AnswerNote _answerNote;
        public AnswerNote AnswerNote
        {
            get { return _answerNote; }
            set { SetPropertyValue("AnswerNote", ref _answerNote, value); }
        }

        private FileData _attachment;
        [Aggregated, ExpandObjectMembers(ExpandObjectMembers.Never)]
        [FileTypeFilter("DocumentFiles", 1, "*.txt", "*.doc", "*.docx", "*.pdf")]
        [FileTypeFilter("Images", 2, "*.jpg", "*.png", "*.jpeg", "*.gif")]
        public FileData Attachment
        {
            get { return _attachment; }
            set { SetPropertyValue("Attachment", ref _attachment, value); }
        }
    }
}
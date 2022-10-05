using DevExpress.Xpo;
using System;

namespace GlueForth.Model
{
    public class Version : XPObject
    {

        public Version(Session session) : base(session)
        {
        }

        private string _name;
        public string Name
        {
            get { return _name; }
            set { SetPropertyValue("Name", ref _name, value); }
        }

        private DateTime _created;
        public DateTime Created
        {
            get { return _created; }
            set { SetPropertyValue("Created", ref _created, value); }
        }

        private User _createdBy;
        public User CreatedBy
        {
            get { return _createdBy; }
            set { SetPropertyValue("CreatedBy", ref _createdBy, value); }
        }

        private DateTime _modified;
        public DateTime Modified
        {
            get { return _modified; }
            set { SetPropertyValue("Modified", ref _modified, value); }
        }

        private User _modifiedBy;
        public User ModifiedBy
        {
            get { return _modifiedBy; }
            set { SetPropertyValue("ModifiedBy", ref _modifiedBy, value); }
        }

        private bool _deleted;
        public bool Deleted
        {
            get => _deleted;
            set => SetPropertyValue("Deleted", ref _deleted, value);
        }

        private bool _published;
        public bool Published
        {
            get { return _published; }
            set { SetPropertyValue("Published", ref _published, value); }
        }

    }
}
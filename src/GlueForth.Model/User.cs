using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Persistent.BaseImpl.PermissionPolicy;
using DevExpress.Xpo;
using System.ComponentModel;
using System;
using DevExpress.ExpressApp;
using System.Web;
namespace GlueForth.Model
{

    [DefaultClassOptions]
    [DefaultListViewOptions(true, NewItemRowPosition.None)]
    public class User : PermissionPolicyUser
    {
        private Person _person;

        public User(Session session) : base(session)
        {
        }

        public Person Person
        {
            get { return _person; }
            set { SetPropertyValue("Person", ref _person, value); }
        }

        private Organisation _organisation;
        public Organisation Organisation
        {
            get { return _organisation; }
            set { SetPropertyValue("Organisation", ref _organisation, value); }
        }

        /// <summary>
        /// Units, selected by User as current
        /// </summary>
        private Unit _currentUnit;
        public Unit CurrentUnit
        {
            get { return _currentUnit; }
            set { SetPropertyValue("CurrentUnit", ref _currentUnit, value); }
        }        

        /// <summary>
        /// Is User accepted Terms&Conditions 
        /// </summary>
        private bool _acceptedTermsConditions;
        public bool AcceptedTermsConditions
        {
            get { return _acceptedTermsConditions; }
            set { SetPropertyValue("AcceptedTermsConditions", ref _acceptedTermsConditions, value); }
        }
        
        [EditorAlias("HyperLinkStringPropertyEditor")]
        public string AutoLoginUrl
        {
            get {
                string host = HttpContext.Current.Request.Url.Host.ToLower();
                if (host == "localhost")
                {
                    return "localhost:8080/login" + "?Username=" + UserName;
                }
                else if (host == "bluenorthadmintest.azurewebsites.net")
                {
                    return "bluenorthtest.azurewebsites.net/login" + "?Username=" + UserName;
                }
                else if (host == "admin.mysherpa.co.za")
                {                    
                    return "app.mysherpa.co.za/login" + "?Username=" + UserName;
                }
                else {
                    return "";
                }
            }        
        }     

        [Association("Indicator-Users")]
        [Browsable(false)]
        public XPCollection<Indicator> Indicators
        {
            get { return GetCollection<Indicator>("Indicators"); }
        }

        [Association("User-AssignedUnits")]
        public XPCollection<Unit> AssignedUnits
        {
            get { return GetCollection<Unit>("AssignedUnits"); }
        }

        [Association("User-CreatedUnits")]
        public XPCollection<Unit> CreatedUnits
        {
            get { return GetCollection<Unit>("CreatedUnits"); }
        }

    }
}
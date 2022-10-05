using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DevExpress.Data.Filtering;
using DevExpress.ExpressApp;
using DevExpress.ExpressApp.Actions;
using DevExpress.ExpressApp.Editors;
using DevExpress.ExpressApp.Layout;
using DevExpress.ExpressApp.Model.NodeGenerators;
using DevExpress.ExpressApp.SystemModule;
using DevExpress.ExpressApp.Templates;
using DevExpress.ExpressApp.Utils;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.Validation;
using GlueForth.Model;
using DevExpress.ExpressApp.Web.Editors.ASPx;
using DevExpress.Web;

namespace GlueForth.Module.Web.Controllers
{
    // For more typical usage scenarios, be sure to check out https://documentation.devexpress.com/eXpressAppFramework/clsDevExpressExpressAppViewControllertopic.aspx.
    public partial class OrganisationsViewController : ViewController
    {
        public OrganisationsViewController()
        {
            InitializeComponent();
            // Target required Views (via the TargetXXX properties) and create their Actions.
            TargetViewType = ViewType.DetailView;

            TargetObjectType = typeof(Organisation);            

            ViewControlsCreated += OrganisationsViewController_ViewControlsCreated;
        }

        private void OrganisationsViewController_ViewControlsCreated(object sender, EventArgs e)
        {
            var s = sender as ViewController;
            var v = s.View as DetailView;
            if (v.ViewEditMode == DevExpress.ExpressApp.Editors.ViewEditMode.Edit)
            {
                foreach (ASPxIntPropertyEditor propertyEditor in v.GetItems<ASPxIntPropertyEditor>())
                {
                    ASPxSpinEdit editor = propertyEditor.Editor as ASPxSpinEdit;
                    editor.SpinButtons.Enabled = false;
                    editor.AllowMouseWheel = false;
                }
            }
        }

        protected override void OnActivated()
        {
            base.OnActivated();
            // Perform various tasks depending on the target View.
        }
        protected override void OnViewControlsCreated()
        {
            base.OnViewControlsCreated();
            // Access and customize the target View control.
        }
        protected override void OnDeactivated()
        {
            // Unsubscribe from previously subscribed events and release other references and resources.
            base.OnDeactivated();
        }
    }
}

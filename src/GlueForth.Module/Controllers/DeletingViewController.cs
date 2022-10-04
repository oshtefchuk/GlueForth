using BlueNorth.Model;
using DevExpress.ExpressApp;
using DevExpress.ExpressApp.SystemModule;

namespace BlueNorth.Module.Controllers
{
    // For more typical usage scenarios, be sure to check out https://documentation.devexpress.com/eXpressAppFramework/clsDevExpressExpressAppViewControllertopic.aspx.
    public partial class DeletingViewController : ViewController
    {
        public DeletingViewController()
        {
            InitializeComponent();
            // Target required Views (via the TargetXXX properties) and create their Actions.
        }
        protected override void OnActivated()
        {
            base.OnActivated();
            var controller = Frame.GetController<DeleteObjectsViewController>();
            if (controller != null)
            {
                controller.Deleting += Controller_Deleting;
            }
        }

        private void Controller_Deleting(object sender, DeletingEventArgs e)
        {//we have Version.Deleted and need to be sure, that on deleting it set correctly
            var versionMember = View.ObjectTypeInfo.FindMember("Version");
            if (versionMember == null || versionMember.MemberType != typeof(Version))
            {
                return;
            }
            foreach (var deletingObj in e.Objects)
            {
                var version = (Version)versionMember.GetValue(deletingObj);
                if (version != null)
                {
                    var dbVersion = View.ObjectSpace.GetObject<Version>(version);
                    dbVersion.Deleted = true;
                }
            }
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

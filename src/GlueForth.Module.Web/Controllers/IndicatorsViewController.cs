using System;
using BlueNorth.Model;
using DevExpress.ExpressApp;
using DevExpress.ExpressApp.Actions;
using DevExpress.ExpressApp.Web.Templates.ActionContainers;
using DevExpress.ExpressApp.Web.Templates.ActionContainers.Menu;

namespace BlueNorth.Module.Web.Controllers
{
    // For more typical usage scenarios, be sure to check out https://documentation.devexpress.com/eXpressAppFramework/clsDevExpressExpressAppViewControllertopic.aspx.
    public partial class IndicatorsViewController : ViewController
    {
        public IndicatorsViewController()
        {
            InitializeComponent();
            TargetViewType = ViewType.DetailView;
            TargetObjectType = typeof(Indicator);
            // Target required Views (via the TargetXXX properties) and create their Actions.
            ViewControlsCreated += IndicatorsViewController_ViewControlsCreated;
            choiceActionConversionFactors.CustomizeControl += ChoiceAction_CustomizeControl;
            choiceActionDataFields.CustomizeControl += ChoiceAction_CustomizeControl;
            choiceActionOperations.CustomizeControl += ChoiceAction_CustomizeControl;
        }

        private void View_CurrentObjectChanged(object sender, EventArgs e)
        {
            var indicator = View.CurrentObject as Indicator;
            if (indicator == null) return;
            choiceActionDataFields.Items.Clear();
            choiceActionConversionFactors.Items.Clear();
            foreach (var kvp in indicator.PrimaryDataFields)
            {
                choiceActionDataFields.Items.Add(new ChoiceActionItem(kvp.Name, kvp));
            }
            foreach (var kvp in indicator.ConversionFactors)
            {
                choiceActionConversionFactors.Items.Add(new ChoiceActionItem(kvp.Name, kvp));
            }
        }

        private void ChoiceAction_CustomizeControl(object sender, CustomizeControlEventArgs e)
        {
            SingleChoiceActionAsModeMenuActionItem actionItem = e.Control as SingleChoiceActionAsModeMenuActionItem;
            if (actionItem != null)
            {
                DropDownSingleChoiceActionControlBase control = (DropDownSingleChoiceActionControlBase)actionItem.Control;
                control.Label.Text = actionItem.Action.Caption;
                control.Label.Style["padding-right"] = "5px";
            }
        }

        private void IndicatorsViewController_ViewControlsCreated(object sender, EventArgs e)
        {
            choiceActionDataFields.Items.Clear();
            choiceActionConversionFactors.Items.Clear();
            var indicator = View.CurrentObject as Indicator;
            if (indicator == null) return;
            foreach (var kvp in indicator.PrimaryDataFields)
            {
                choiceActionDataFields.Items.Add(new ChoiceActionItem(kvp.Name, kvp));
            }
            foreach (var kvp in indicator.ConversionFactors)
            {
                choiceActionConversionFactors.Items.Add(new ChoiceActionItem(kvp.Name, kvp));
            }
            View.CurrentObjectChanged += View_CurrentObjectChanged;
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

        private void choiceActionConversionFactors_Execute(object sender, SingleChoiceActionExecuteEventArgs e)
        {
            var selectedFactor = e.SelectedChoiceActionItem.Data as ConversionFactor;
            var indicator = View.CurrentObject as Indicator;
            indicator.Formula += "[" + selectedFactor.Reference + "]";
            choiceActionConversionFactors.SelectedItem = null;
            View.Refresh();
        }

        private void choiceActionDataFields_Execute(object sender, SingleChoiceActionExecuteEventArgs e)
        {
            var selectedDataField = e.SelectedChoiceActionItem.Data as PrimaryDataField;
            var indicator = View.CurrentObject as Indicator;
            indicator.Formula += "[" + selectedDataField.Reference + "]";
            choiceActionDataFields.SelectedItem = null;
            View.Refresh();
        }

        private void choiceActionOperations_Execute(object sender, SingleChoiceActionExecuteEventArgs e)
        {
            var indicator = View.CurrentObject as Indicator;
            indicator.Formula += " " + e.SelectedChoiceActionItem.Data.ToString() + " ";
            choiceActionOperations.SelectedItem = null;
        }
    }
}

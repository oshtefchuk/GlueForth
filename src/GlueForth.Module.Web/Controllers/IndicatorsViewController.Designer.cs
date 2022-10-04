namespace BlueNorth.Module.Web.Controllers
{
    partial class IndicatorsViewController
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            DevExpress.ExpressApp.Actions.ChoiceActionItem choiceActionItem1 = new DevExpress.ExpressApp.Actions.ChoiceActionItem();
            DevExpress.ExpressApp.Actions.ChoiceActionItem choiceActionItem2 = new DevExpress.ExpressApp.Actions.ChoiceActionItem();
            DevExpress.ExpressApp.Actions.ChoiceActionItem choiceActionItem3 = new DevExpress.ExpressApp.Actions.ChoiceActionItem();
            DevExpress.ExpressApp.Actions.ChoiceActionItem choiceActionItem4 = new DevExpress.ExpressApp.Actions.ChoiceActionItem();
            DevExpress.ExpressApp.Actions.ChoiceActionItem choiceActionItem5 = new DevExpress.ExpressApp.Actions.ChoiceActionItem();
            DevExpress.ExpressApp.Actions.ChoiceActionItem choiceActionItem6 = new DevExpress.ExpressApp.Actions.ChoiceActionItem();
            this.choiceActionDataFields = new DevExpress.ExpressApp.Actions.SingleChoiceAction(this.components);
            this.choiceActionConversionFactors = new DevExpress.ExpressApp.Actions.SingleChoiceAction(this.components);
            this.choiceActionOperations = new DevExpress.ExpressApp.Actions.SingleChoiceAction(this.components);
            // 
            // choiceActionDataFields
            // 
            this.choiceActionDataFields.Caption = "Add PrimaryDataField";
            this.choiceActionDataFields.Category = "FormulaEditor";
            this.choiceActionDataFields.ConfirmationMessage = null;
            this.choiceActionDataFields.EmptyItemsBehavior = DevExpress.ExpressApp.Actions.EmptyItemsBehavior.Disable;
            this.choiceActionDataFields.Id = "choiceActionDataFields";
            this.choiceActionDataFields.PaintStyle = DevExpress.ExpressApp.Templates.ActionItemPaintStyle.CaptionAndImage;
            this.choiceActionDataFields.SelectionDependencyType = DevExpress.ExpressApp.Actions.SelectionDependencyType.RequireSingleObject;
            this.choiceActionDataFields.ToolTip = null;
            this.choiceActionDataFields.Execute += new DevExpress.ExpressApp.Actions.SingleChoiceActionExecuteEventHandler(this.choiceActionDataFields_Execute);
            // 
            // choiceActionConversionFactors
            // 
            this.choiceActionConversionFactors.Caption = "Add ConversionFactor";
            this.choiceActionConversionFactors.Category = "FormulaEditor";
            this.choiceActionConversionFactors.ConfirmationMessage = null;
            this.choiceActionConversionFactors.EmptyItemsBehavior = DevExpress.ExpressApp.Actions.EmptyItemsBehavior.Disable;
            this.choiceActionConversionFactors.Id = "choiceActionConversionFactors";
            this.choiceActionConversionFactors.ImageName = "BO_User";
            this.choiceActionConversionFactors.PaintStyle = DevExpress.ExpressApp.Templates.ActionItemPaintStyle.Image;
            this.choiceActionConversionFactors.SelectionDependencyType = DevExpress.ExpressApp.Actions.SelectionDependencyType.RequireSingleObject;
            this.choiceActionConversionFactors.ToolTip = null;
            this.choiceActionConversionFactors.Execute += new DevExpress.ExpressApp.Actions.SingleChoiceActionExecuteEventHandler(this.choiceActionConversionFactors_Execute);
            // 
            // choiceActionOperations
            // 
            this.choiceActionOperations.Caption = "Add Operation";
            this.choiceActionOperations.Category = "FormulaEditor";
            this.choiceActionOperations.ConfirmationMessage = null;
            this.choiceActionOperations.EmptyItemsBehavior = DevExpress.ExpressApp.Actions.EmptyItemsBehavior.Disable;
            this.choiceActionOperations.Id = "choiceActionOperations";
            choiceActionItem1.Caption = "+";
            choiceActionItem1.Data = "+";
            choiceActionItem1.Id = "Entry 1";
            choiceActionItem1.ImageName = null;
            choiceActionItem1.Shortcut = null;
            choiceActionItem1.ToolTip = null;
            choiceActionItem2.Caption = "-";
            choiceActionItem2.Data = "-";
            choiceActionItem2.Id = "Entry 2";
            choiceActionItem2.ImageName = null;
            choiceActionItem2.Shortcut = null;
            choiceActionItem2.ToolTip = null;
            choiceActionItem3.Caption = "*";
            choiceActionItem3.Data = "*";
            choiceActionItem3.Id = "Entry 3";
            choiceActionItem3.ImageName = null;
            choiceActionItem3.Shortcut = null;
            choiceActionItem3.ToolTip = null;
            choiceActionItem4.Caption = "/";
            choiceActionItem4.Data = "/";
            choiceActionItem4.Id = "Entry 4";
            choiceActionItem4.ImageName = null;
            choiceActionItem4.Shortcut = null;
            choiceActionItem4.ToolTip = null;
            choiceActionItem5.Caption = "(";
            choiceActionItem5.Id = "Entry 5";
            choiceActionItem5.ImageName = null;
            choiceActionItem5.Shortcut = null;
            choiceActionItem5.ToolTip = null;
            choiceActionItem6.Caption = ")";
            choiceActionItem6.Id = "Entry 6";
            choiceActionItem6.ImageName = null;
            choiceActionItem6.Shortcut = null;
            choiceActionItem6.ToolTip = null;
            this.choiceActionOperations.Items.Add(choiceActionItem1);
            this.choiceActionOperations.Items.Add(choiceActionItem2);
            this.choiceActionOperations.Items.Add(choiceActionItem3);
            this.choiceActionOperations.Items.Add(choiceActionItem4);
            this.choiceActionOperations.Items.Add(choiceActionItem5);
            this.choiceActionOperations.Items.Add(choiceActionItem6);
            this.choiceActionOperations.PaintStyle = DevExpress.ExpressApp.Templates.ActionItemPaintStyle.Caption;
            this.choiceActionOperations.SelectionDependencyType = DevExpress.ExpressApp.Actions.SelectionDependencyType.RequireSingleObject;
            this.choiceActionOperations.ToolTip = null;
            this.choiceActionOperations.Execute += new DevExpress.ExpressApp.Actions.SingleChoiceActionExecuteEventHandler(this.choiceActionOperations_Execute);
            // 
            // IndicatorsViewController
            // 
            this.Actions.Add(this.choiceActionDataFields);
            this.Actions.Add(this.choiceActionConversionFactors);
            this.Actions.Add(this.choiceActionOperations);

        }

        #endregion

        private DevExpress.ExpressApp.Actions.SingleChoiceAction choiceActionDataFields;
        private DevExpress.ExpressApp.Actions.SingleChoiceAction choiceActionConversionFactors;
        private DevExpress.ExpressApp.Actions.SingleChoiceAction choiceActionOperations;
    }
}

using System;
using System.Text;
using System.Linq;
using DevExpress.ExpressApp;
using System.ComponentModel;
using DevExpress.ExpressApp.DC;
using System.Collections.Generic;
using DevExpress.Persistent.Base;
using DevExpress.Persistent.BaseImpl;
using DevExpress.Persistent.BaseImpl.PermissionPolicy;
using DevExpress.ExpressApp.Model;
using DevExpress.ExpressApp.Actions;
using DevExpress.ExpressApp.Editors;
using DevExpress.ExpressApp.Updating;
using DevExpress.ExpressApp.Model.Core;
using DevExpress.ExpressApp.Model.DomainLogics;
using DevExpress.ExpressApp.Model.NodeGenerators;
using DevExpress.ExpressApp.Xpo;
using System.Reflection;
using DevExpress.Persistent.Validation;
using DevExpress.ExpressApp.Security;
using System.Text.RegularExpressions;
using DevExpress.ExpressApp.Validation;

namespace GlueForth.Module {
    // For more typical usage scenarios, be sure to check out https://documentation.devexpress.com/eXpressAppFramework/clsDevExpressExpressAppModuleBasetopic.aspx.
    public sealed partial class BlueNorthModule : ModuleBase {
        public BlueNorthModule() {
            InitializeComponent();
			BaseObject.OidInitializationMode = OidInitializationMode.AfterConstruction;
        }
        public override IEnumerable<ModuleUpdater> GetModuleUpdaters(IObjectSpace objectSpace, Version versionFromDB) {
            ModuleUpdater updater = new DatabaseUpdate.Updater(objectSpace, versionFromDB);
            return new ModuleUpdater[] { updater };
        }
        public override void Setup(XafApplication application) {
            application.SetupComplete += new EventHandler<EventArgs>(application_SetupComplete);
            base.Setup(application);
            // Manage various aspects of the application UI and behavior at the module level.
        }
                //this code is necessary to enable validation in the "Change Password On First Logon" window.
        void application_SetupComplete(object sender, EventArgs e)
        {
            ValidationModule module = (ValidationModule)((XafApplication)sender).Modules.FindModule(typeof(ValidationModule));
            if (module != null)
            {
                module.InitializeRuleSet();
            }
        }
        public override void Setup(ApplicationModulesManager moduleManager)
        {
            base.Setup(moduleManager);
            ValidationRulesRegistrator.RegisterRule(moduleManager,
                typeof(PasswordStrengthCodeRule),
                typeof(IRuleBaseProperties));
        }
        public override void CustomizeTypesInfo(ITypesInfo typesInfo) {
            base.CustomizeTypesInfo(typesInfo);
            CalculatedPersistentAliasHelper.CustomizeTypesInfo(typesInfo);
        }
    }

    [CodeRule]
    public class PasswordStrengthCodeRule : RuleBase<ChangePasswordOnLogonParameters>
    {
        public PasswordStrengthCodeRule()
            : base("", "ChangePassword")
        {
            this.Properties.SkipNullOrEmptyValues = false;
        }
        public PasswordStrengthCodeRule(IRuleBaseProperties properties) : base(properties) { }
        protected override bool IsValidInternal(ChangePasswordOnLogonParameters target, out string errorMessageTemplate)
        {
            if (CalculatePasswordStrength(target.NewPassword) < 5)
            {
                errorMessageTemplate = "New Password should at least 8 characters long, included upper case, lower case, numbers and a special character(@$!%*#?&).";
                return false;
            }
            errorMessageTemplate = string.Empty;
            return true;
        }
        private int CalculatePasswordStrength(string pwd)
        {
            int weight = 0;
            if (pwd == null) return weight;
            if (pwd.Length > 1 && pwd.Length< 8)
                ++weight;
            else
            {
                if (pwd.Length > 7)
                    ++weight;
                Regex rxUpperCase = new Regex("[A-Z]");
                Regex rxLowerCase = new Regex("[a-z]");
                Regex rxNumerals = new Regex("[0-9]");
                Regex rxSpecialChar = new Regex("[@$!%*#?&]");

                Match match = rxUpperCase.Match(pwd);
                if (match.Success)
                    ++weight;
                match = rxLowerCase.Match(pwd);
                if (match.Success)
                    ++weight;
                match = rxNumerals.Match(pwd);
                if (match.Success)
                    ++weight;
                match = rxSpecialChar.Match(pwd);
                if (match.Success)
                    ++weight;
            }
            if (weight == 5 && pwd.Length< 8)
                --weight;
            return weight;
        }
    }
}

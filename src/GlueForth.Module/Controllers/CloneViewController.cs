using System;
using System.Collections.Generic;
using BlueNorth.Model;
using DevExpress.ExpressApp;
using DevExpress.ExpressApp.CloneObject;
using DevExpress.Persistent.Base;
using DevExpress.Xpo;
using DevExpress.Xpo.Metadata;

namespace BlueNorth.Module.Controllers
{
    // For more typical usage scenarios, be sure to check out https://documentation.devexpress.com/eXpressAppFramework/clsDevExpressExpressAppViewControllertopic.aspx.
    public partial class CloneViewController : ViewController
    {
        public CloneViewController()
        {
            InitializeComponent();
            // Target required Views (via the TargetXXX properties) and create their Actions.
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
              var cloneObjectController = Frame.GetController<CloneObjectViewController>();
            if (cloneObjectController != null)
            {
                cloneObjectController.CustomCloneObject += cloneObjectController_CustomCloneObject;
            }      }

        protected override void OnActivated()
        {
            base.OnActivated();
            var cloneObjectController = Frame.GetController<CloneObjectViewController>();
            if (cloneObjectController != null)
            {
                cloneObjectController.CustomCloneObject += cloneObjectController_CustomCloneObject;
            }
        }
        void cloneObjectController_CustomCloneObject(object sender, CustomCloneObjectEventArgs e)
        {
            e.TargetObjectSpace = e.CreateDefaultTargetObjectSpace();
            var cloner = new CharacteristicCloner();
            if (e.TargetType == typeof(Framework))
            {
                var framework = (Framework)e.TargetObjectSpace.GetObject(e.SourceObject);
                var clonedFramework = e.TargetObjectSpace.CreateObject<Framework>();
                clonedFramework.Title = framework.Title + "_Cloned";
                clonedFramework.ShortTitle = (framework.ShortTitle + "_Cloned").Substring(0, 20);
                for (int i = 0; i < framework.Characteristics.Count; i++)
                {
                    var characteristic = framework.Characteristics[i];

                    var cloendCh = (Characteristic)cloner.CloneTo(characteristic, typeof(Characteristic));
                    CloneCharacteriticQuestions(characteristic, cloendCh);
                    cloendCh.Frameworks.Remove(framework);
                    clonedFramework.Characteristics.Add(cloendCh);
                }
                e.ClonedObject = clonedFramework;
            }
            //else if (e.TargetType == typeof(Characteristic))
            //{
            //    var clonedCharacteristic = (Characteristic)cloner.CloneTo((Characteristic)e.TargetObjectSpace.GetObject(e.SourceObject), typeof(Characteristic));
            //    CloneCharacteriticQuestions((Characteristic)e.SourceObject, clonedCharacteristic);
            //    e.ClonedObject = clonedCharacteristic;
            //}
        }

        private void CloneCharacteriticQuestions(Characteristic sourceObject, Characteristic clonedCharacteristic)
        {
            var cloner = new QuestionCloner();
            for (int y = 0; y < sourceObject.Questions.Count; y++)
            {
                var question = sourceObject.Questions[y];
                var clonedQuestion = (Question)cloner.CloneTo(question, typeof(Question));
                clonedCharacteristic.Questions.Add(clonedQuestion);
            }
        }

        public class CharacteristicCloner : Cloner
        {
            public override void CopyCollection(XPMemberInfo memberInfo, IXPSimpleObject sourceObject,
                IXPSimpleObject targetObject,
                bool aggregated)
            {
                if (memberInfo.MemberType.GenericTypeArguments.Length > 0 && memberInfo.MemberType.GenericTypeArguments[0] == typeof(QuestionGroup))
                {
                    base.CopyCollection(memberInfo, sourceObject, targetObject, aggregated);
                }
            }
        }
        public class QuestionCloner : Cloner
        {
            public override void CopyCollection(XPMemberInfo memberInfo, IXPSimpleObject sourceObject,
                IXPSimpleObject targetObject,
                bool aggregated)
            {

            }
        }
    }
}
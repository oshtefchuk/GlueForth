using BlueNorth.Model;
using DevExpress.ExpressApp;
using DevExpress.ExpressApp.Xpo;
using DevExpress.Xpo;
using System.ComponentModel;
using System.Linq;

namespace BlueNorth.Module.Controllers
{
    // For more typical usage scenarios, be sure to check out https://documentation.devexpress.com/eXpressAppFramework/clsDevExpressExpressAppViewControllertopic.aspx.
    public partial class InitializeNonPersistentListViewController : ViewController
    {
        public InitializeNonPersistentListViewController()
        {
            InitializeComponent();
            // Target required Views (via the TargetXXX properties) and create their Actions.
        }
        protected override void OnActivated()
        {
            base.OnActivated();
            // Perform various tasks depending on the target View.
            Application.ListViewCreating += Application_ListViewCreating;
        }

        private void Application_ListViewCreating(object sender, ListViewCreatingEventArgs e)
        {
            if ((e.CollectionSource.ObjectTypeInfo.Type == typeof(StandardControl)) && (e.CollectionSource.ObjectSpace is NonPersistentObjectSpace))
            {
                ((NonPersistentObjectSpace)e.CollectionSource.ObjectSpace).ObjectsGetting += ObjectSpace_StandardControl_ObjectsGetting;
            }
            if ((e.CollectionSource.ObjectTypeInfo.Type == typeof(UnitResult)) && (e.CollectionSource.ObjectSpace is NonPersistentObjectSpace))
            {
                ((NonPersistentObjectSpace)e.CollectionSource.ObjectSpace).ObjectsGetting += InitializeNonPersistentListViewController_ObjectsGetting;
            }
        }

        public double? GetCharacteristicScore(Characteristic characteristic, Unit unit)
        {
            return unit.CharacteristicScores.FirstOrDefault(x => x.Characteristic.Oid == characteristic.Oid && x.Framework.Oid == unit.PrimaryFramework.Oid)?.Score;
        }

        private void InitializeNonPersistentListViewController_ObjectsGetting(object sender, ObjectsGettingEventArgs e)
        {
            BindingList<UnitResult> objects = new BindingList<UnitResult>();
            var objectSpace = this.Application.CreateObjectSpace();
            var session = ((XPObjectSpace)objectSpace).Session;
            var units = from unit in new XPQuery<Unit>(session) where unit.PrimaryFramework != null
                        select unit;
            foreach (var unit in units)
            {
                var frameworkCharacteristics = unit.PrimaryFramework.Characteristics.ToList();
                var datasetOid = (from dataset in new XPQuery<SPADataSet>(session)
                                  where dataset.Framework.Oid == unit.PrimaryFramework.Oid && dataset.AssessmentType == unit.CurrentAssessmentType
                                  select dataset.Oid).FirstOrDefault();
                foreach (var characteristic in frameworkCharacteristics)
                {
                    var characteristicScore = GetCharacteristicScore(characteristic, unit) ?? 0;
                    var isPrioritised = (from priorCharacteristic in new XPQuery<PriorCharacteristic>(session)
                                         where priorCharacteristic.Characteristic.Oid == characteristic.Oid
                                                          && priorCharacteristic.DataSet.Oid == datasetOid
                                         select priorCharacteristic).Any();
                    objects.Add(new UnitResult() { Unit = unit, Characteristic = characteristic, Framework = unit.PrimaryFramework, AssessmentType = unit.CurrentAssessmentType, Score = characteristicScore, IsPrioritised = isPrioritised });
                }
            }
            e.Objects = objects;
        }

        private void ObjectSpace_StandardControl_ObjectsGetting(object sender, ObjectsGettingEventArgs e)
        {
            BindingList<StandardControl> objects = new BindingList<StandardControl>();
            var objectSpace = this.Application.CreateObjectSpace();
            var session = ((XPObjectSpace)objectSpace).Session;
            var result = from content in new XPQuery<StandardContent>(session)
                         select content;
            foreach (var conent in result)
            {
                foreach (var characteristic in conent.Characteristics)
                {
                    foreach (var question in characteristic.Questions.Where(x => conent.QuestionGroups.Contains(x.Group)))
                    {
                        objects.Add(new StandardControl() { StandardContent = conent, Characteristic = characteristic, Question = question, QuestionGroupRef = question.Group, Standard = conent.StandardChapter.Standard, StandardChapter = conent.StandardChapter });
                    }
                    if (!conent.QuestionGroups.Any())
                    {//995
                        objects.Add(new StandardControl() { StandardContent = conent, Characteristic = characteristic, Standard = conent.StandardChapter.Standard, StandardChapter = conent.StandardChapter });
                    }
                }
            }
            e.Objects = objects;
        }

        protected override void OnDeactivated()
        {
            // Unsubscribe from previously subscribed events and release other references and resources.
            base.OnDeactivated();
            Application.ListViewCreating -= Application_ListViewCreating;
        }
    }
}

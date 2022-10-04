using DevExpress.ExpressApp.DC;
using DevExpress.Persistent.Base;

namespace BlueNorth.Model
{
    [DomainComponent, DefaultClassOptions]
    public class StandardControl
    {
        public Standard Standard { get; set; }
        public StandardChapter StandardChapter { get; set; }
        public StandardContent StandardContent { get; set; }
        public Characteristic Characteristic { get; set; }
        public QuestionGroup QuestionGroupRef { get; set; }
        public Question Question { get; set; }
    }
}
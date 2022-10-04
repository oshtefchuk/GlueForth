using DevExpress.ExpressApp.DC;
using DevExpress.Persistent.Base;

namespace BlueNorth.Model
{
    [DomainComponent, DefaultClassOptions]
    public class UnitResult
    {
        public Unit Unit { get; set; }
        public Framework Framework { get; set; }
        public Characteristic Characteristic { get; set; }
        public AssessmentType AssessmentType { get; set; }
        public bool IsApplicable { get; set; }
        public double Score { get; set; }
        public bool IsPrioritised { get; set; }
    }
}
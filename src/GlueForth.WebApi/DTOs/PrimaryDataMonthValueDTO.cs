using System.Collections.Generic;
using System.Linq;

namespace BlueNorth.WebApi.DTOs
{
    public class PrimaryDataMonthValuesDTO
    {
        public PrimaryDataMonthValuesDTO(PrimaryDataField primaryDataField, int[] valuesOids)
        {
            Name = primaryDataField.Name ?? "";
            Reference = primaryDataField.Reference ?? "";
            Guidance = primaryDataField.GuidanceNotes;
            DefaultUOM = primaryDataField.UnitOfMeasure?.ShortTitle;
            MonthValues = new List<PrimaryDataMonthValueDTO>();
            Periods = new List<ValuePeriodDTO>();
            foreach (var oid in valuesOids)
            {
                var ds = primaryDataField.PrimaryDataValues.First(x => x.OID == oid).IndicatorDataSet;
                Periods.Add(new ValuePeriodDTO() { Name = ds.PeriodFromYear + "/" + ds.PeriodToYear, ValueOid = oid });
            }
            for (int i = 0; i < 12; i++)
            {
                var ds = primaryDataField.PrimaryDataValues.First(x => x.OID == valuesOids.First()).IndicatorDataSet;
                var monthNumber = i + ds.PeriodFromMonth.GetValueOrDefault();
                monthNumber = monthNumber > 12 ? monthNumber - 12 : monthNumber;
                var monthValue = new PrimaryDataMonthValueDTO() { MonthNumber = monthNumber };
                var monthValues = new List<string>();
                foreach (var oid in valuesOids)
                {
                    var pmValue = primaryDataField.PrimaryDataValues.First(x => x.OID == oid);
                    var value = pmValue.PrimaryDataMonthValues.FirstOrDefault(x => x.MonthNumber == monthNumber);
                    monthValues.Add(value == null ? string.Empty : value.Value);
                }
                monthValue.Values = monthValues.ToArray();
                MonthValues.Add(monthValue);
            }
        }

        public int PrimaryDataValueOid { get; set; }

        public string Guidance { get; set; }
        public string Name { get; set; }
        public string DefaultUOM { get; set; }
        public string Reference { get; set; }

        public List<ValuePeriodDTO> Periods { get; set; }
        public List<PrimaryDataMonthValueDTO> MonthValues { get; set; }
    }

    public class PrimaryDataMonthValueDTO
    {
        public string[] Values { get; set; }
        public int MonthNumber { get; set; }
    }

    public class ValuePeriodDTO
    {
        public string Name { get; set; }
        public int ValueOid { get; set; }
    }

}
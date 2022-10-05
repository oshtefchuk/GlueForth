using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GlueForth.WebApi.DTOs
{
    public class CommodityPrimaryDataMonthValuesDTO
    {
        public CommodityPrimaryDataMonthValuesDTO(PrimaryDataField primaryDataField, int primaryDataValueOid, Commodity commodity, int commodityOid)
        {
            Name = primaryDataField.Name ?? "";
            Reference = primaryDataField.Reference ?? "";
            Guidance = primaryDataField.GuidanceNotes;
            DefaultUOM = primaryDataField.UnitOfMeasure?.ShortTitle;
            MonthValues = new List<CommodityPrimaryDataMonthValueDTO>();
            Periods = new List<CommodityValuePeriodDTO>();
            CommodityOid = commodityOid;
            CommodityReference = commodity.Reference;
            var ds = primaryDataField.PrimaryDataValues.First(x => x.OID == primaryDataValueOid).IndicatorDataSet;
            Periods.Add(new CommodityValuePeriodDTO() { Name = ds.PeriodFromYear + "/" + ds.PeriodToYear, ValueOid = primaryDataValueOid });
            for (int i = 0; i < 12; i++)
            {
                var IndicatorDataSet = primaryDataField.PrimaryDataValues.FirstOrDefault(x => x.OID == primaryDataValueOid).IndicatorDataSet;
                var monthNumber = i + IndicatorDataSet.PeriodFromMonth.GetValueOrDefault();
                monthNumber = monthNumber > 12 ? monthNumber - 12 : monthNumber;
                var monthValue = new CommodityPrimaryDataMonthValueDTO() { MonthNumber = monthNumber };
                var monthValues = new List<string>();
                var pmValue = primaryDataField.PrimaryDataValues.First(x => x.OID == primaryDataValueOid);
                var value = pmValue.PrimaryDataMonthValues.FirstOrDefault(x => x.MonthNumber == monthNumber);
                monthValues.Add(value == null ? string.Empty : value.Value);
                monthValue.Values = monthValues.ToArray();
                MonthValues.Add(monthValue);
            }
        }
        public int PrimaryDataValueOid { get; set; }
        public string Guidance { get; set; }
        public string Name { get; set; }
        public string DefaultUOM { get; set; }
        public string Reference { get; set; }
        public List<CommodityValuePeriodDTO> Periods { get; set; }
        public List<CommodityPrimaryDataMonthValueDTO> MonthValues { get; set; }
        public int CommodityOid { get; set; }
        public string CommodityReference { get; set; }
    }
    public class CommodityPrimaryDataMonthValueDTO
    {
        public string[] Values { get; set; }
        public int MonthNumber { get; set; }
    }

    public class CommodityValuePeriodDTO
    {
        public string Name { get; set; }
        public int ValueOid { get; set; }
    }
}
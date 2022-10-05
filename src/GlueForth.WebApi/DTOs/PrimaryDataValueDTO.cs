using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace GlueForth.WebApi.DTOs
{
    public class PrimaryDataValueDTO
    {
        public PrimaryDataValueDTO()
        {
        }

        public PrimaryDataValueDTO(PrimaryDataValue value, PrimaryDataFieldUserEditMode userChoice, List<Commodity> commodities)
        {

            ValueOid = value.OID;
            if (value.DataSet != null) DataSetOid = value.DataSet.Value;
            if (value.PrimaryDataField1.PrimaryDataType1.IsMapArea == true && (userChoice == null || userChoice.AreaSizeMode == 0))
            {
                var size = value.ProductionAreas.Where(x => x.GCRecord == null).Sum(x => x.Size);
                if (value.PrimaryDataField1.UnitOfMeasure?.ShortTitle.ToLower() == "ha")
                {
                    size = size / 10000;
                }
                Value = Math.Round(size.GetValueOrDefault(), 2).ToString(CultureInfo.InvariantCulture);
            }
            else
            {
                if (value.PrimaryDataField1.IsCommodityDependendent == true)
                {//for commodity-dependent - it should be a sum of per-commodity values
                    if (userChoice != null && userChoice.PeriodDataMode == 1)
                    {
                        Value = value.PrimaryDataMonthValues.SelectMany(y => y.CommodityPDMValues).Where(x => x.GCRecord == null && commodities.Contains(x.Commodity1)).Sum(x => x.Value).ToString();
                    }
                    else
                        Value = value.CommodityPDValues.Where(x => x.GCRecord == null && commodities.Contains(x.Commodity1)).Sum(x => x.Value).ToString();
                }
                else if (userChoice != null && userChoice.PeriodDataMode == 1)
                {
                    foreach (var item in value.PrimaryDataMonthValues)
                    {
                        if (double.TryParse(item.Value, out double val))
                        {
                            Value += val;
                        }
                    }
                }
                else Value = value.Value;
            }
        }

        public int? ValueOid { get; set; }
        public int? DataSetOid { get; set; }
        public string Value { get; set; }
    }
}
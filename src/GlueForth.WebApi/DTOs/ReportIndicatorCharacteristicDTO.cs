using System;
using System.Linq;

namespace BlueNorth.WebApi.DTOs
{
    public class ReportIndicatorCharacteristicDTO
    {
        public ReportIndicatorCharacteristicDTO(Indicator indicator, Unit unit, double[] trend)
        {
            Trend = trend;
            if (indicator != null)
            {

                var datafields = indicator.PrimaryDataFieldPrimaryDataFields_IndicatorIndicators.Select(x => x.PrimaryDataField);
                var datasets = unit.IndicatorDataSets.Where(x => x.Unit == unit.Oid && x.Framework == unit.PrimaryFramework).OrderBy(z => z.PeriodFromYear).ToArray();
                Formula = indicator.Formula ?? string.Empty;
                Characteristic = indicator.Title;
                Relevance = indicator.Relevance;
                Markup = indicator.Markup;
                Interpretation = indicator.Interpretaion;
                Results = new string[2, datasets.Count() + 2];
                PrimaryData = new string[datafields.Count() + 1, datasets.Count() + 2];
                Results[0, 0] = "RESULT";
                Results[0, 1] = PrimaryData[0, 1] = "UNIT";
                Results[1, 0] = indicator.Title;
                // Results[1, 1] = indicator.UnitOfMeasure?.ShortTitle;
                PrimaryData[0, 0] = "PRIMARY DATA";
                for (int i = 0; i < datasets.Length; i++)
                {
                    Results[0, i + 2] = PrimaryData[0, i + 2] = datasets[i].PeriodFromYear.ToString();
                    Results[1, i + 2] = Trend[i].ToString();
                }
                for (int i = 0; i < datafields.Count(); i++)
                {
                    var datafield = datafields.ToArray()[i];
                    PrimaryData[i + 1, 0] = datafield.Name;
                    PrimaryData[i + 1, 1] = datafield.UnitOfMeasure.ShortTitle;
                    for (int y = 0; y < datasets.Length; y++)
                    {
                        //var value = datafield.PrimaryDataValues.LastOrDefault(x => x.DataSet == datasets[y].OID);                        
                        var value = datafield.PrimaryDataValues
                            .OrderBy(x => x.Modified)
                            .ThenByDescending(x => x.Created)
                            .LastOrDefault(x => x.DataSet == datasets[y].OID && x.GCRecord == null);

                        //if (value == null)
                        //{                        
                        //    value = datafield.PrimaryDataValues.LastOrDefault(x => x.IndicatorDataSet.Framework == datasets[y].Framework &&
                        //    x.IndicatorDataSet.Unit == unit.Oid && x.IndicatorDataSet.PeriodFromYear <= datasets[y].PeriodFromYear);
                        //}
                        if (value == null || string.IsNullOrEmpty(value.Value))
                        {
                            PrimaryData[i + 1, y + 2] = "N/A";
                        }
                        else
                        if (value.ProductionAreas.Any(x => x.GCRecord == null))
                        {
                            var size = value.ProductionAreas.Where(x => x.GCRecord == null).Sum(x => x.Size);
                            if (value.PrimaryDataField1.UnitOfMeasure?.ShortTitle.ToLower() == "ha")
                            {
                                size = size / 10000;
                            }
                            PrimaryData[i + 1, y + 2] = Math.Round(size.GetValueOrDefault(), 2).ToString();
                        }
                        else PrimaryData[i + 1, y + 2] = value.Value;
                    }
                }
            }
        }
        public string Characteristic { get; set; }
        public string Formula { get; set; }
        public double[] Trend { get; set; }

        public string Relevance { get; set; }
        public string Markup { get; set; }

        public string Interpretation { get; set; }

        public string[,] Results { get; set; }

        public string[,] PrimaryData { get; set; }

    }
}

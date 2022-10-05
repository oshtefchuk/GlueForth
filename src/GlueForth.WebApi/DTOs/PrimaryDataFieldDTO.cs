using System.Collections.Generic;
using System.Linq;

namespace GlueForth.WebApi.DTOs
{
    public class PrimaryDataFieldDTO
    {
        public PrimaryDataFieldDTO(PrimaryDataField dataField, List<int> dataSetsOidList, int notesCount, PrimaryDataFieldUserEditMode userChoice, List<Commodity> commodities)
        {
            PrimaryDataFieldOid = dataField.OID;
            Name = dataField.Name ?? "";
            Reference = dataField.Reference ?? "";
            IndicatorNotesCount = notesCount;
            Guidance = dataField.GuidanceNotes;
            DefaultUOM = dataField.UnitOfMeasure?.ShortTitle;
            IsBoolean = dataField.PrimaryDataType1.IsBoolean.GetValueOrDefault();
            IsMapArea = dataField.PrimaryDataType1.IsMapArea.GetValueOrDefault();
            IsMapManual = userChoice == null ? false : userChoice.AreaSizeMode == 1;
            IsMonthlyDataMode = userChoice == null ? false : userChoice.PeriodDataMode == 1;
            IsMonthlyDataModeAvailable = dataField.IsMonthlyDataModeAvailable.GetValueOrDefault();
            if (dataField.DependendOn.HasValue)
            {
                DependendonPrimaryDataFieldOid = dataField.DependendOn.Value;
            }
            var primaryDataField = dataField.PrimaryDataValues.Where(x => x.GCRecord == null);
            PrimaryDataValue = new List<PrimaryDataValueDTO>(new PrimaryDataValueDTO[dataSetsOidList.Count]);
            var values = primaryDataField?.OrderBy(x => x.DataSet).ToList();
            if (values.Count > 0)
            {
                for (var i = 0; i < dataSetsOidList.Count; i++)
                {
                    var value = values.FirstOrDefault(x => x.DataSet == dataSetsOidList[i]);
                    if (value != null)
                    {
                        PrimaryDataValue[i] = new PrimaryDataValueDTO(value, userChoice, commodities);
                    }
                    else
                    {
                        if (PrimaryDataValue[i] == null)
                            PrimaryDataValue[i] = new PrimaryDataValueDTO { DataSetOid = dataSetsOidList[i] };
                    }
                }
            }
            else
            {

                for (var i = 0; i < dataSetsOidList.Count; i++)
                    if (PrimaryDataValue[i] == null)
                        PrimaryDataValue[i] = new PrimaryDataValueDTO { DataSetOid = dataSetsOidList[i] };
            }
        }

        public PrimaryDataFieldDTO(PrimaryDataField dataField, Commodity commodity, List<int> dataSetsOidList, int notesCount)
        {
            PrimaryDataFieldOid = dataField.OID;
            Name = dataField.Name + " (" + commodity.Title + ")";
            Reference = dataField.Reference ?? "";
            IndicatorNotesCount = notesCount;
            Guidance = dataField.GuidanceNotes;
            DefaultUOM = dataField.UnitOfMeasure?.ShortTitle;
            IsBoolean = dataField.PrimaryDataType1.IsBoolean.GetValueOrDefault();
            IsMapArea = dataField.PrimaryDataType1.IsMapArea.GetValueOrDefault();
            IsMonthlyDataModeAvailable = dataField.IsMonthlyDataModeAvailable.GetValueOrDefault();
            CommodityOid = commodity.OID;
            if (dataField.DependendOn.HasValue)
            {
                DependendonPrimaryDataFieldOid = dataField.DependendOn.Value;
            }
            var primaryDataField = dataField.PrimaryDataValues.Where(x => x.GCRecord == null);
            PrimaryDataValue = new List<PrimaryDataValueDTO>();
            var values = primaryDataField?.OrderBy(x => x.DataSet).ToList();
            foreach (var item in dataSetsOidList)
            {
                var value = values.FirstOrDefault(x => x.DataSet == item);
                var valueDTO = new PrimaryDataValueDTO() { DataSetOid = item };
                var commodityValue = value?.CommodityPDValues.FirstOrDefault(x => x.Commodity == commodity.OID && x.GCRecord == null);
                if (commodityValue != null)
                {
                    valueDTO.ValueOid = commodityValue.OID;
                    valueDTO.Value = IsMapArea && DefaultUOM.ToLower() == "ha" && commodityValue.Value.HasValue ? (commodityValue.Value / 10000).ToString() : commodityValue.Value.ToString(); //TODO replace it using conversion
                }
                PrimaryDataValue.Add(valueDTO);
            }
        }

        public PrimaryDataFieldDTO(PrimaryDataField dataField, Commodity commodity, int notesCount, List<int> dataSetsOidList)
        {
            PrimaryDataFieldOid = dataField.OID;
            Name = dataField.Name + " (" + commodity.Title + ")";
            Reference = dataField.Reference ?? "";
            IndicatorNotesCount = notesCount;
            Guidance = dataField.GuidanceNotes;
            DefaultUOM = dataField.UnitOfMeasure?.ShortTitle;
            IsBoolean = dataField.PrimaryDataType1.IsBoolean.GetValueOrDefault();
            IsMapArea = dataField.PrimaryDataType1.IsMapArea.GetValueOrDefault();
            IsMonthlyDataModeAvailable = dataField.IsMonthlyDataModeAvailable.GetValueOrDefault();
            IsMonthlyDataMode = true;
            CommodityOid = commodity.OID;
            if (dataField.DependendOn.HasValue)
            {
                DependendonPrimaryDataFieldOid = dataField.DependendOn.Value;
            }
            var primaryDataField = dataField.PrimaryDataValues.Where(x => x.GCRecord == null);
            PrimaryDataValue = new List<PrimaryDataValueDTO>();
            var values = primaryDataField?.OrderBy(x => x.DataSet).ToList();
            foreach (var item in dataSetsOidList)
            {
                var value = values.FirstOrDefault(x => x.DataSet == item);
                var valueDTO = new PrimaryDataValueDTO() { DataSetOid = item, ValueOid = value.OID };
                valueDTO.Value = value?.PrimaryDataMonthValues.SelectMany(x=> x.CommodityPDMValues).Where(x => x.Commodity == commodity.OID && x.GCRecord == null).Sum(x=>x.Value).ToString();
                PrimaryDataValue.Add(valueDTO);
            }
        }

        public int PrimaryDataFieldOid { get; set; }

        public int DependendonPrimaryDataFieldOid { get; set; }

        public string Guidance { get; set; }
        public int CommodityOid { get; set; }
        public string Name { get; set; }
        public string DefaultUOM { get; set; }
        public bool IsBoolean { get; set; }
        public bool IsMapArea { get; set; }
        public bool IsMapManual { get; set; }
        public bool IsMonthlyDataMode { get; set; }

        public bool IsMonthlyDataModeAvailable { get; set; }
        public string Reference { get; set; }
        public int IndicatorNotesCount { get; set; }
        public List<PrimaryDataValueDTO> PrimaryDataValue { get; set; }
    }
}
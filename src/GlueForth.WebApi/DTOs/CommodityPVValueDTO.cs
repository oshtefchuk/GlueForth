namespace BlueNorth.WebApi.DTOs
{
    public class CommodityPVValueDTO
    {
        public CommodityPVValueDTO()
        {
        }

        public CommodityPVValueDTO(CommodityPDValue value)
        {
            if (value.PrimaryDataValue != null)
            {
                PrimaryDataFieldOid = value.PrimaryDataValue1.PrimaryDataField.Value;
                DataSetOid = value.PrimaryDataValue1.DataSet.Value;
            }
            if (value.Commodity1 != null) CommodityOid = value.Commodity.Value;
            Value = value.Value ?? 0;
        }

        public int? PrimaryDataFieldOid { get; set; }
        public int? DataSetOid { get; set; }
        public int? CommodityOid { get; set; }
        public double Value { get; set; }
    }
}
using System.Collections.Generic;
using System.Linq;

namespace BlueNorth.WebApi.DTOs
{
    public class MapPrimaryDataFieldDTO
    {
        public MapPrimaryDataFieldDTO(PrimaryDataField primaryDataField)
        {
            PrimaryDataFieldOid = primaryDataField.OID;
            Name = primaryDataField.Name;
            ProductionAreas = new List<ProductionAreaDTO>();
            Color = primaryDataField.Color ?? 0;
            GuidanceNotes = primaryDataField.GuidanceNotes;
        }

        public MapPrimaryDataFieldDTO(PrimaryDataValue primaryDataValue)
        {
            PrimaryDataFieldOid = primaryDataValue.PrimaryDataField.Value;
            Name = primaryDataValue.PrimaryDataField1.Name;
            ProductionAreas = new List<ProductionAreaDTO>();
            primaryDataValue.ProductionAreas.ToList().ForEach(x => ProductionAreas.Add(new ProductionAreaDTO() { OID = x.OID, Name = x.Name, DrawingData = x.DrawingData, Size = x.Size ?? 0 }));
            Color = primaryDataValue.PrimaryDataField1.Color ?? 0;
            GuidanceNotes = primaryDataValue.PrimaryDataField1.GuidanceNotes;
        }

        public int PrimaryDataFieldOid { get; set; }

        public string Name { get; set; }
        public List<ProductionAreaDTO> ProductionAreas { get; set; }
        public int Color { get; set; }

        public string GuidanceNotes { get; set; }
    }

    public class ProductionAreaDTO
    {
        public int OID { get; set; }
        public string Name { get; set; }
        public string DrawingData { get; set; }
        public int PrimaryDataFieldOid { get; set; }
        public int DataSetOid { get; set; }
        public double Size { get; set ; }
    }
}
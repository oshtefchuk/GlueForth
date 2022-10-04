using System.Collections.Generic;

namespace BlueNorth.WebApi.DTOs
{

    public class CategoryIndicatorDatasetsDTO
    {
        public CategoryIndicatorDatasetsDTO()
        {

        }
        public int CategoryOid { get; set; }
        public List<int> DataSetsOidList { get; set; }
    }
}
using System.Collections.Generic;

namespace GlueForth.WebApi.DTOs
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
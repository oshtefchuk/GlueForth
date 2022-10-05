using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GlueForth.WebApi.Helpers
{
    public class PrincipleGroupIndicatorDatasetsDTO
    {
        public PrincipleGroupIndicatorDatasetsDTO()
        {
            
        }
        public int PrincipleGroupOid { get; set; }
        public List<int> DataSetsOidList { get; set; }
    }
}
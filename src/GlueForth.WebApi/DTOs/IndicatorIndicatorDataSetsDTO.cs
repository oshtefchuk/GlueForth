using System.Collections.Generic;

namespace BlueNorth.WebApi.DTOs
{
    public class IndicatorIndicatorDataSetsDTO
    {
        public int IndicatorOid { get; set; }
        public List<int> IndicatorDataSetOidList { get; set; }
    }
}
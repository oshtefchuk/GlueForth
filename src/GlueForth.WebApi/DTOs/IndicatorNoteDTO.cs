using System;
using System.Collections.Generic;

namespace GlueForth.WebApi.DTOs
{
    public class PrimaryDataFieldNoteDTO
    {
        /// <summary>
        /// This class represent Indicator Node model for Indicator and Indicator DataSet
        /// Used in GetPrimaryDataFieldNotesListByIndicator method
        /// </summary>
        public PrimaryDataFieldNoteDTO()
        {
            
        }
        public PrimaryDataFieldNoteDTO(int indicatorOid, IndicatorDataSet dataset, List<PrimaryDataFieldNote> notes)
        {
            IndicatorOid = indicatorOid;

            if (dataset != null)
            {
                IndicatorDataSetOid = dataset.OID;

                PeriodFromYear = dataset.PeriodFromYear != null ? dataset.PeriodFromYear.ToString() : "";
                PeriodToYear = dataset.PeriodToYear != null ? dataset.PeriodToYear.ToString() : "";

                if (dataset.PeriodFromMonth != null)
                {
                    PeriodFromMonth = dataset.PeriodFromMonth.Value < 10
                        ? $"0{dataset.PeriodFromMonth}"
                        : $"{dataset.PeriodFromMonth}";
                }
                else
                {
                    PeriodFromMonth = String.Empty;
                }

                if (dataset.PeriodToMonth != null)
                {
                    PeriodToMonth = dataset.PeriodToMonth.Value < 10
                        ? $"0{dataset.PeriodToMonth}"
                        : $"{dataset.PeriodToMonth}";
                }
                else
                {
                    PeriodToMonth = String.Empty;
                }

                if (dataset.PeriodFromYear != null && dataset.PeriodFromMonth != null)
                    PeriodFrom = dataset.PeriodFromYear.Value * 12 + dataset.PeriodFromMonth.Value;

                FullPeriod = $"{PeriodFromMonth}-{PeriodFromYear}{'/'}{PeriodToMonth}-{PeriodToYear}";
            }
            else
            {
                ErrorMessage = "DataSet not found in database";
            }

            Notes = new List<PrimaryDataFieldNotesDTO>();
            foreach (var note in notes) Notes.Add(new PrimaryDataFieldNotesDTO(note));
        }

        public int IndicatorOid { get; set; }
        public int IndicatorDataSetOid { get; set; }
        public string PeriodFromYear { get; set; }
        public string PeriodToYear { get; set; }
        public string PeriodFromMonth { get; set; }
        public string PeriodToMonth { get; set; }
        public string FullPeriod { get; set; }
        public int PeriodFrom { get; set; }
        public string ErrorMessage { get; set; }
        public List<PrimaryDataFieldNotesDTO> Notes { get; set; }
    }
}
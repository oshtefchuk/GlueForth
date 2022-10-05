using GlueForth.WebApi.DTOs;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Web.Http;

namespace GlueForth.WebApi
{
    public class ImprovementPlanController : ApiController
    {
        private const string GOODPRACTICE_QUESTIONGROUP_REF = "2.1.1";
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: odata/ImprovementPlanItems
        /// <summary>
        /// Returns list of all ImprovementPlanItems. ImprovementPlanItem represented as root element, withoud referenced entities
        /// </summary>
        /// <returns>list of all ImprovementPlanItems</returns>
        public IEnumerable<ImprovementPlanItem> GetImprovementPlanItems()
        {
            return _db.ImprovementPlanItems.Select(CloneImprovementPlanItem).Where(cloned => cloned != null);
        }

        private ImprovementPlanItem CloneImprovementPlanItem(ImprovementPlanItem ImprovementPlanItem)
        {
            if (ImprovementPlanItem.GCRecord != null) return null;
            return (ImprovementPlanItem)_db.Entry(ImprovementPlanItem).CurrentValues.ToObject();
        }

        /// <summary>
        /// Returns prepared counts for MyActions -> Status page (OPEN/COMPLETED/OVERDUE)
        /// </summary>
        /// <returns>array with 3 int values</returns>
        [Authorize]
        public IHttpActionResult GetCountsForReporting()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var result = new int[3];
            var dataSet = _db.SPADataSets.FirstOrDefault(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            if (dataSet == null || dataSet.PriorCharacteristics.Count() <= 0 ) return Ok(result); //1313


            var today = DateTime.Today;
            //Open items count
            result[0] = dataSet.ImprovementPlanItems.Count(x => x.IsDisabled != true && x.IsCompleted == false && x.GCRecord == null);
            //Completed count
            result[1] = dataSet.ImprovementPlanItems.Count(x => x.IsDisabled != true && x.IsCompleted == true && x.GCRecord == null);
            //OverDue items count
            result[2] = dataSet.ImprovementPlanItems.Count(x => x.IsDisabled != true && x.IsCompleted == false && x.GCRecord == null && x.DueDate < DateTime.Today);
            return Ok(result);
        }

        /// <summary>
        /// Returns prepared and filtered data for MyActions->Tasks page - list of <code>ImprovementPlanItem</code>'s (Task's)
        /// </summary>
        /// <param name="filter"><code>ImprovementPlanFilterDTO</code> instance</param>
        /// <returns><code>ImprovementPlanItemDTO</code> list</returns>
        [Authorize]
        [HttpPost]
        public IHttpActionResult GetList(ImprovementPlanFilterDTO filter)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSet = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            var items = dataSet.ImprovementPlanItems.Where(x => x.IsDisabled != true).OrderBy(x => x.Characteristic).ToList();
            if (filter.PrincipleGroupOid > 0)
            {
                items = items.Where(x => x.Characteristic.HasValue && x.Characteristic1.PrincipleGroup.Value == filter.PrincipleGroupOid).ToList();
            }
            if (filter.QuestionGroupOid > 0)
            {
                items = items.Where(x => x.Question.HasValue && x.Question1.Group == filter.QuestionGroupOid).ToList();
            }
            if (filter.CharacteristicOid > 0)
            {
                items = items.Where(x => x.Characteristic.HasValue && x.Characteristic.Value == filter.CharacteristicOid).ToList();
            }
            var result = items.Select(y => new ImprovementPlanItemDTO(y));
            return Ok(result);
        }

        /// <summary>
        /// Returns list of <code>QuestionGroup</code>'s where current User have existed <code>ImprovementPlanItem</code>'s (Task's). For filter at MyActions->Tasks page
        /// </summary>
        /// <returns>Oid->Title pairs list</returns>
        [Authorize]
        public IHttpActionResult GetQuestionGroupsList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSet = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            var result = dataSet.ImprovementPlanItems.Where(x => x.IsDisabled != true && x.Question.HasValue && x.Question1.Group.HasValue).Select(y => y.Question1.QuestionGroup).Distinct().ToList().OrderBy(x=>x.OID).Select(z=> new { z.OID, z.Title });
            return Ok(result);
        }

        /// <summary>
        /// Returns list of <code>Characteristic</code>'s where current User have existed <code>ImprovementPlanItem</code>'s (Task's). For filter at MyActions->Tasks page
        /// </summary>
        /// <returns>Oid->Title pairs list</returns>     
        [Authorize]
        public IHttpActionResult GetCharacteristicsList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSet = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            var result = dataSet.ImprovementPlanItems.Where(x => x.IsDisabled != true).Select(y => y.Characteristic1).Distinct().OrderBy(x => x.OID).Select(z => new { z.OID, z.Title });
            return Ok(result);
        }

        /// <summary>
        /// Returns list of <code>PrincipleGroup</code>'s where current User have existed <code>ImprovementPlanItem</code>'s (Task's). For filter at MyActions->Tasks page
        /// </summary>
        /// <returns>Oid->Title pairs list</returns>    
        [Authorize]
        public IHttpActionResult GetPrincipleGroupsList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSet = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            var result = dataSet.ImprovementPlanItems.Where(x => x.IsDisabled != true).Select(y => y.Characteristic1.PrincipleGroup1).Distinct().OrderBy(x => x.OID).Select(z => new { z.OID, z.Title });
            return Ok(result);
        }

        /// <summary>
        /// Returns prepared data for MyActions->Tasks page - list of <code>ImprovementPlanItem</code>'s (Task's)
        /// </summary>
        /// <returns><code>ImprovementPlanItemDTO</code> list</returns>
        [Authorize]
        public IHttpActionResult GetList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            var dataSet = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            var result = dataSet.ImprovementPlanItems.Where(x => x.IsDisabled != true).OrderBy(x => x.Characteristic).Select(y => new ImprovementPlanItemDTO(y));
            return Ok(result);
        }

        // GET: odata/ImprovementPlanItems(5)
        /// <summary>
        /// Get ImprovementPlanItem by OID
        /// </summary>
        /// <param name="key">OID of ImprovementPlanItem</param>
        /// <returns>ImprovementPlanItem represented as root element, withoud referenced entities</returns>
        [Route("api/ImprovementPlanItems({key})")]
        public ImprovementPlanItem GetImprovementPlanItem(int key)
        {
            return CloneImprovementPlanItem(_db.ImprovementPlanItems.SingleOrDefault(ImprovementPlanItem => ImprovementPlanItem.OID == key));
        }

        /// <summary>
        /// Returns prepared data for MyActions->Capture page for currently selected Characteristic
        /// </summary>
        /// <param name="characteristicOid">Oid of Characteristic</param>
        /// <returns><code>ImprovementPlanDTO</code> list</returns>
        [Route("api/ImprovementPlanItems/GetCharacteristicCaptureList({characteristicOid})")]
        [Authorize]
        public IHttpActionResult GetCaptureList(int characteristicOid)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");
            var questions = _db.QuestionQuestions_CharacteristicCharacteristics
                .Where(x => x.Characteristics == characteristicOid).Select(x => x.Question).OrderBy(z => z.QuestionGroup.ShortTitle).ToList();

            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).OID;
            var characteristic = _db.Characteristics.Find(characteristicOid);
            var improvementItems = new List<ImprovementPlanDTO>();
            try
            {

                foreach (var question in questions)
                {
                    var plan = new ImprovementPlanDTO()
                    {
                        QuestionOid = question.OID,
                        CharacteristicOid = characteristicOid,
                        QuestionGroup = question.QuestionGroup.Title,
                        ImprovementPlanGuidance = question.QuestionGroup.ShortTitle.StartsWith(GOODPRACTICE_QUESTIONGROUP_REF) ? characteristic.GuidanceText : question.ImprovementPlanGuidance,
                        ImprovementPlanQuestion = question.ImprovementPlanQuestion
                    };
                    foreach (var item in question.ImprovementPlanItems.Where(x => x.DataSet == dataSetOid))
                    {
                        var newItem = new ImprovementPlanItemDTO()
                        {
                            QuestionOid = question.OID,
                            CharacteristicOid = characteristicOid,
                            ImprovementPlanItemOid = item.OID,
                            Actions = item.Actions,
                            DueDate = item.DueDate.HasValue ? item.DueDate.Value : DateTime.MinValue,
                            IsCompleted = item.IsCompleted.HasValue ? item.IsCompleted.Value : false,
                            IsDisabled = item.IsDisabled.HasValue ? item.IsDisabled.Value : false,
                            Resposible = item.Resposible,
                            Cost = item.Cost.GetValueOrDefault(),
                            Result = item.Result,
                        };
                        plan.Items.Add(newItem);
                    }
                    plan.State = !plan.Items.Any() ? 0 : plan.Items.Any(x => x.IsDisabled) ? 1 : 2;
                    improvementItems.Add(plan);
                }
            }
            catch (Exception)
            {

                throw;
            }
            return Ok(improvementItems);
        }

        /// <summary>
        /// Returns prepared data for MyActions->Capture page for current Characteristic selector
        /// </summary>
        /// <returns>list of Characteristics represented as { Oid, Title, Count (tasks count) } structures</returns>
        [Route("api/ImprovementPlanItems/GetCharacteristics")]
        [Authorize]
        public IHttpActionResult GetCharacteristics()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.Framework;
            if (currentFramework == null) return BadRequest("Primary Framework is empty or incorrect");

            var dataSet = _db.SPADataSets.First(x => x.Framework.Value == currentFramework.OID && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid);
            return Ok(dataSet.PriorCharacteristics.Select(x => x.Characteristic1).Distinct().Select(x => new { Oid = x.OID, Title = x.ShortTitle, Count = dataSet.ImprovementPlanItems.Count(y => y.Characteristic == x.OID) }).ToList());
        }

        /// <summary>
        /// POST method for <code>ImprovementPlanItem</code> creation/update
        /// </summary>
        /// <param name="item"><code>ImprovementPlanItemDTO</code> instance</param>
        /// <returns>ImprovementPlanItem completion state as string</returns>
        [Route("api/ImprovementPlanItems/CreateOrUpdate")]
        [Authorize]
        public IHttpActionResult CreateOrUpdate(ImprovementPlanItemDTO item)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var dbItem = _db.ImprovementPlanItems.Find(item.ImprovementPlanItemOid);
            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");
            var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).OID;
            if (dbItem == null && item.QuestionOid > 0)
            {//check for existance of "disabled" item
                dbItem = _db.ImprovementPlanItems.FirstOrDefault(x => x.DataSet == dataSetOid && x.Characteristic == item.CharacteristicOid && x.Question == item.QuestionOid && x.IsDisabled == true);
            }
            if (dbItem == null)
            {
                dbItem = new ImprovementPlanItem()
                {
                    Actions = item.Actions,
                    Characteristic = item.CharacteristicOid,
                    DataSet = dataSetOid,
                    DueDate = item.DueDate == DateTime.MinValue ? (DateTime?)null : item.DueDate,
                    IsCompleted = item.IsCompleted,
                    Resposible = item.Resposible,
                    Result = item.Result,
                    IsDisabled = item.IsDisabled,
                    Created = DateTime.Now,
                    Cost = item.Cost
                };
                if (dbItem.IsCompleted == true)
                {
                    dbItem.Completed = DateTime.Now;
                }
                if (item.QuestionOid > 0)
                {
                    dbItem.Question1 = _db.Questions.Find(item.QuestionOid);
                }
                if (item.StandardContentOid > 0)
                {
                    dbItem.StandardContentStandardContents_ImprovementPlanItemImprovementPlanItems.Add(new StandardContentStandardContents_ImprovementPlanItemImprovementPlanItems() { StandardContents = item.StandardContentOid });
                }
                if (item.File != null && item.File.Length > 0)
                {
                    var FileData = new FileData() { Oid = Guid.NewGuid(), Content = item.File, FileName = item.FileName, size = item.File.Length };
                    dbItem.FileData = _db.FileDatas.Add(FileData);
                }
                dbItem = _db.ImprovementPlanItems.Add(dbItem);
            }
            else
            {
                if (item.IsCompleted == true && item.IsCompleted != dbItem.IsCompleted)
                {//it set now to Completed
                    dbItem.Completed = DateTime.Now;
                }
                dbItem.Actions = item.Actions;
                dbItem.Cost = item.Cost;
                dbItem.DueDate = item.DueDate == DateTime.MinValue ? (DateTime?)null : item.DueDate;
                dbItem.IsCompleted = item.IsCompleted;
                dbItem.IsDisabled = item.IsDisabled;
                dbItem.Result = item.Result;
                dbItem.Resposible = item.Resposible;
                if (item.File != null && item.File.Length > 0)
                {
                    if (!dbItem.Attachment.HasValue)
                    {
                        dbItem.FileData = _db.FileDatas.Add(new FileData() { Oid = Guid.NewGuid() });
                    }
                    dbItem.FileData.FileName = item.FileName;
                    dbItem.FileData.Content = item.File;
                    dbItem.FileData.size = item.File.Length;
                }
                else if (dbItem.Attachment.HasValue)
                {//we should remove file
                    _db.FileDatas.Remove(dbItem.FileData);
                    dbItem.Attachment = null;
                }

            }
            _db.SaveChanges();
            item.ImprovementPlanItemOid = dbItem.OID;
            return Ok(item.IsCompleted == true ? "Completed" : item.IsOverDue ? "OverDue" : "Due");
        }

        /// <summary>
        /// POST method for <code>ImprovementPlanItem</code> set creation/update
        /// </summary>
        /// <param name="items"><code>ImprovementPlanItemDTO</code> list</param>
        /// <returns>Ok - if succeeded</returns>
        [Route("api/ImprovementPlanItems/CreateOrUpdateSet")]
        [Authorize]
        public IHttpActionResult CreateOrUpdateSet(ImprovementPlanItemDTO[] items)
        {
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();
            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");

            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var dataSetOid = _db.SPADataSets.First(x => x.Framework.Value == currentFramework && x.AssessmentType == user.Unit.CurrentAssessmentType && x.Unit.Value == user.Unit.Oid).OID;

                _db.Database.BeginTransaction();
                var item = items.First();
                var dbItem = new ImprovementPlanItem()
                {
                    Actions = item.Actions,
                    Characteristic = item.CharacteristicOid,
                    DataSet = dataSetOid,
                    DueDate = item.DueDate == DateTime.MinValue ? (DateTime?)null : item.DueDate,
                    IsCompleted = item.IsCompleted,
                    Resposible = item.Resposible,
                    Result = item.Result,
                    IsDisabled = item.IsDisabled,
                    Cost = item.Cost,
                    Created = DateTime.Now
                };
                if (dbItem.IsCompleted == true)
                {
                    dbItem.Completed = DateTime.Now;
                }
                if (item.QuestionOid > 0)
                {
                    dbItem.Question1 = _db.Questions.Find(item.QuestionOid);
                }
                if (item.StandardContentOid > 0)
                {
                    dbItem.StandardContent1 = _db.StandardContents.Find(item.StandardContentOid);
                }
                if (item.File != null && item.File.Length > 0)
                {
                    var FileData = new FileData() { Oid = Guid.NewGuid(), Content = item.File, FileName = item.FileName, size = item.File.Length };
                    dbItem.FileData = _db.FileDatas.Add(FileData);
                }
                dbItem = _db.ImprovementPlanItems.Add(dbItem);
                _db.SaveChanges();
                foreach (var it in items)
                {
                    dbItem.StandardContentStandardContents_ImprovementPlanItemImprovementPlanItems.Add(new StandardContentStandardContents_ImprovementPlanItemImprovementPlanItems() { StandardContents = it.StandardContentOid, ImprovementPlanItems = dbItem.OID });
                    it.ImprovementPlanItemOid = dbItem.OID;
                }
                _db.Database.CurrentTransaction.Commit();
            }
            catch (Exception ex)
            {
                _db.Database.CurrentTransaction.Rollback();
                return BadRequest(ex.ToString());
            }
            return Ok();
        }

        /// <summary>
        /// Method for downloading of specific <code>ImprovementPlanItem</code>(Task) attachment
        /// </summary>
        /// <param name="improvementPlanItemOid">Oid of <code>ImprovementPlanItem</code></param>
        /// <returns>file stream</returns>
        [HttpGet]
        public HttpResponseMessage DownloadAttachment(int improvementPlanItemOid)
        {
            var stream = new MemoryStream();
            // processing the stream.

            var item = _db.ImprovementPlanItems.Find(improvementPlanItemOid);
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(item.FileData.Content)
            };
            result.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = item.FileData.FileName
                };
            result.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/octet-stream");

            return result;
        }

        /// <summary>
        /// NOT IN USE
        /// Deletes entity by OID
        /// </summary>
        /// <param name="key">ImprovementPlanItem OID</param>
        /// <returns>Ok - if succeded</returns>
        [Route("api/ImprovementPlanItems({key})")]
        public IHttpActionResult Delete(int key)
        {
            var improvementPlanItem = _db.ImprovementPlanItems.Find(key);
            if (improvementPlanItem == null) return NotFound();

            _db.ImprovementPlanItems.Remove(improvementPlanItem);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_db.ImprovementPlanItems.Count(e => e.OID == key) == 0)
                    return NotFound();
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        private static int GetIso8601WeekOfYear(DateTime time)
        {
            // Seriously cheat.  If its Monday, Tuesday or Wednesday, then it'll 
            // be the same week# as whatever Thursday, Friday or Saturday are,
            // and we always get those right
            DayOfWeek day = CultureInfo.InvariantCulture.Calendar.GetDayOfWeek(time);
            if (day >= DayOfWeek.Monday && day <= DayOfWeek.Wednesday)
            {
                time = time.AddDays(3);
            }

            // Return the week of our adjusted day
            return CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(time, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        }
    }
}

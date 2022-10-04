using System.Linq;
using System.Security.Claims;
using System.Web.Http;

namespace BlueNorth.WebApi
{
    public class FrontendMenuItemController : ApiController
    {
        private readonly BlueNorthEntities _db = new BlueNorthEntities();

        // GET: api/FrontendMenuItem/GetDisabledByCurrentFramework
        /// <summary>
        /// Get FrontendMenuItem list for current User->Framework
        /// </summary>
        /// <returns>FrontendMenuItems, represented as AnswerNoteFullDTO's</returns>
        [Authorize]
        [Route("api/FrontendMenuItem/GetDisabledByCurrentFramework")]
        public IHttpActionResult GetList()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userName = ((ClaimsPrincipal)User).Claims.First().Value;
            var user = _db.Users.FirstOrDefault(x =>
                x.PermissionPolicyUser != null && x.PermissionPolicyUser.UserName == userName);

            if (user == null) return Unauthorized();

            var currentFramework = user.Unit.PrimaryFramework;
            if (!currentFramework.HasValue) return BadRequest("Primary Framework is empty or incorrect");
            var disabledMenuItems = _db.FrameworkFrontMenuItems.Where(x => x.Framework == currentFramework && x.FrontMenuItem1.AssessmentType == user.Unit.CurrentAssessmentType && x.GCRecord == null && x.Disabled == true).Select(x=>x.FrontMenuItem1.Route).ToArray();
            return Ok(disabledMenuItems);
        }
    }
}
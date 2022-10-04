using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web.Security;

namespace BlueNorth.WebApi
{
    public class MailingService
    {

        private readonly string sendFrom = ConfigurationManager.AppSettings["EmailAddress"];

        private readonly string senderPassword = ConfigurationManager.AppSettings["EmailPassword"];

        private readonly string smtpHost = ConfigurationManager.AppSettings["SmtpHost"];

        private readonly string smtpPortNumber = ConfigurationManager.AppSettings["SmtpPortNumber"];

        private readonly string supportName = ConfigurationManager.AppSettings["CCTeamForEmail"];

        private readonly string supportMails = ConfigurationManager.AppSettings["SupportEmails"];

        private readonly string adminEmail = ConfigurationManager.AppSettings["AdminEmail"];

        private const string USER_REG_SUBJECT = "SHERPA. New user registration";

        private const string ORG_REG_SUBJECT = "SHERPA. New organisations registration";
        private const string CONFIRM_API_METHOD = "/api/Users/Confirm?token=";

        /// <summary>
        /// Sends notification email about new Organisation registration
        /// </summary>
        /// <param name="user">new user</param>
        public void SendOrgRegistrationEmail(User user, Organisation organization)
        {
            string messageBody = this.GetOrgRegistrationetMailBody(user, organization);
            MailMessage mail = this.CreateMailMessage(adminEmail, messageBody, ORG_REG_SUBJECT);
            this.SendEmail(mail);
        }

        /// <summary>
        /// Sends notification email about new User registration
        /// </summary>
        /// <param name="user">new user</param>
        public void SendUserRegistrationEmail(User user)
        {
            string messageBody = this.GetUserRegistrationetMailBody(user);
            MailMessage mail = this.CreateMailMessage(adminEmail, messageBody, USER_REG_SUBJECT);
            this.SendEmail(mail);
        }

        /// <summary>
        /// Sends email for assigned to unit user
        /// </summary>
        /// <param name="receiverEmail">Whose password should be reset</param>
        /// <param name="emailSubject">Clean and understandable subject</param>
        /// <param name="password">user password</param>
        public void SendAssignUserEmail(string receiverEmail, string emailSubject, string password, string assignerName, string assignerOrganisation, string unitName)
        {
            string messageBody = this.GetAssignUserMailBody(receiverEmail, receiverEmail, password, assignerName, assignerOrganisation, unitName);
            MailMessage mail = this.CreateMailMessage(receiverEmail, messageBody, emailSubject);
            this.SendEmail(mail);
        }

        /// <summary>
        /// Sends email with link for password resetting
        /// </summary>
        /// <param name="receiverEmail">Whose user registered</param>
        /// <param name="emailSubject">Clean and understandable subject</param>
        /// <param name="siteBaseUri">Uri for link in email</param>
        public void SendResetPasswordEmail(string receiverEmail, string emailSubject, string userName, string password)
        {
            string messageBody = this.GetResetPasswordMailBody(receiverEmail, userName, password);
            MailMessage mail = this.CreateMailMessage(receiverEmail, messageBody, emailSubject);
            this.SendEmail(mail);
        }

        /// <summary>
        /// Sends email with link for password resetting
        /// </summary>
        /// <param name="receiverEmail">Whose password should be reset</param>
        /// <param name="passwordResetToken">Security token to confirm that user resets his own password</param>
        /// <param name="emailSubject">Clean and understandable subject</param>
        /// <param name="siteBaseUri">Uri for link in email</param>
        public void SendResetPasswordLinkEmail(string receiverEmail, string emailSubject, string userName, string passwordResetlink)
        {
            string messageBody = this.GetResetPasswordLinkMailBody(receiverEmail, userName, passwordResetlink);
            MailMessage mail = this.CreateMailMessage(receiverEmail, messageBody, emailSubject);
            this.SendEmail(mail);
        }

        /// <summary>
        /// Sends to CC Admin with request to invite new user
        /// </summary>
        /// <param name="adminEmail">'TechnicalSupportEmail' key in Web.config</param>
        /// <param name="inviteeEmail">Who created invitation request</param>
        /// <param name="siteBaseUri">Uri for link in email</param>
        public void SendEmailWithInvitationRequest(string adminEmail, string inviteeEmail, string siteBaseUri)
        {
            string templatePath = ConfigurationManager.AppSettings["InvitationRequestEmailTemplatePath"];
            //TODO SPEC-100 - make root path as parameter to use it for template loading
            string invitationRequestText = string.Empty; // File.ReadAllText(HostingEnvironment.MapPath(templatePath));
            invitationRequestText = invitationRequestText.Replace("_inviteeEmail", inviteeEmail)
                .Replace("_editorLink", siteBaseUri);
            MailMessage mail = this.CreateMailMessage(adminEmail, invitationRequestText, $"Invitation request from {inviteeEmail}");
            this.SendEmail(mail);
        }

        public void SendActivationEmail(User user, string emailSubject, string siteBaseUri)
        {
            var now = DateTime.Now;
            var token = FormsAuthentication.Encrypt(new FormsAuthenticationTicket(1, user.PermissionPolicyUser.UserName, now, now.AddDays(2), false, string.Empty));
            var activationlink = siteBaseUri + CONFIRM_API_METHOD + token;
            string messageBody = this.GetActivationMailBody(user, activationlink);
            MailMessage mail = this.CreateMailMessage(user.Person1.Email, messageBody, emailSubject);
            this.SendEmail(mail);
        }

        public void SendConfirmationEmail(User user, string emailSubject, User assigner, Unit unit)
        {
            var now = DateTime.Now;
            string messageBody = this.GetAssignementConfirmationMailBody(user, assigner, unit.Organization.Name);
            MailMessage mail = this.CreateMailMessage(user.Person1.Email, messageBody, emailSubject);
            this.SendEmail(mail);
        }
             
        private MailMessage CreateMailMessage(string to, string messageText, string messageSubject)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(this.sendFrom, this.supportName);
            mail.To.Add(to);
            if (!string.IsNullOrEmpty(supportMails))
            {
                string[] supportMailsArray = supportMails.Split(';',',');
                foreach (string item in supportMailsArray)
                {
                    mail.Bcc.Add(new MailAddress(item));
                }
            }
            mail.Subject = messageSubject;
            mail.IsBodyHtml = true;
            mail.Body = messageText;
            return mail;
        }       

        private void SendEmail(MailMessage email)
        {
            SmtpClient client = new SmtpClient(this.smtpHost, int.Parse(this.smtpPortNumber));
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Credentials = new NetworkCredential(this.sendFrom, this.senderPassword);
            client.EnableSsl = false;
            client.Send(email);
        }

        private string GetAssignUserMailBody(string email, string userName, string password, string assignerName, string assignerOrganisation, string unitName)
        {
            string resetPasswordTemplateText = $@"<html>
<head>
</head>
<body>
<p>Dear {userName}</p>
<p>You have been assigned as a user on Sherpa by {assignerName} of {assignerOrganisation}, and have access to the <strong>{unitName}</strong> Business Unit</p>
<p>To access Sherpa please log in with the following details:</p>
<p>URL: https://mysherpa.co.za/ </p>
<p>Username: {userName}</p>
<p>Temporary password: {password}</p>
<p>You can change this password on your My Profile page.</p>
<p> </p>
<p>Our support email address is support@mysherpa.co.za or contact us on + 27 63 688 5593 with any queries.</p>
<p> </p>
<p>Kind regards,</p>
<p>The Sherpa Team</p>
  </ body>
</html>";
            return resetPasswordTemplateText;
        }

        private string GetResetPasswordMailBody(string email, string userName, string password)
        {
            string resetPasswordTemplateText = $@"<html>
<head>
</head>
<body>
   <p>Hello, you requested a password reset for {userName}</p>
   <p>Your new password is {password} </p>
</p>You can change this password on your <strong>My Profile</strong> page</p>
</body>
</html>";
            return resetPasswordTemplateText;
        }

        private string GetResetPasswordLinkMailBody(string email, string userName, string passwordResetlink)
        {
            string resetPasswordTemplateText = $@"<html>
<head>
</head>
<body>
    <p>Hello, {userName}.</p>
    <p>Please reset your password by clicking here: <a href=";
            resetPasswordTemplateText += "\"" + passwordResetlink + "\"";
            resetPasswordTemplateText += @">link</a>
</body>
</html>";
            return resetPasswordTemplateText;
        }

        private string GetUserRegistrationetMailBody(User user)
        {
            return $@"<html>
<head>
</head>
<body>
    <p>New User registration submitted</p><p></p>
    <p>Name: <strong>{user.Person1.FirstName}</strong></p>
      <p>Lastname: <strong>{user.Person1.LastName}</strong></p>
     <p> Email: <strong>{user.Person1.Email}</strong></p>
     <p> Country: <strong>{user.Person1.Party?.Address?.Country1?.Name}</strong></p>
     <p> Cell No: <strong>{user.Person1.Party?.PhoneNumbers.ToArray()[1].Number}</strong></p>
     <p> Phone No: <strong>{user.Person1.Party?.PhoneNumbers.ToArray()[0].Number}</strong></br></p>
</body>
</html>";
        }

        private string GetOrgRegistrationetMailBody(User user, Organisation organisation)
        {
            return $@"<html>
<head>
</head>
<body>
    <p>New Organisation registration submitted</p>
    <h3>User</h3>
    <p>Name: <strong>{user.Person1.FirstName}</strong></p>
      <p>Lastname: <strong>{user.Person1.LastName}</strong></p>
      <p>Email: <strong>{user.Person1.Email}</strong></p>
      <p>Country: <strong>{user.Person1.Party?.Address?.Country1?.Name}</strong></p>
      <p>Cell No: <strong>{user.Person1.Party?.PhoneNumbers.ToArray()[1].Number}</strong></p>
     <p> Phone No: <strong>{user.Person1.Party?.PhoneNumbers.ToArray()[0].Number}</strong></p>
    <h3>Organisation</h3>
    <p>Name: <strong>{organisation.Organization.Name}</strong></p>
     <p> Street: <strong>{organisation.Organization.Party.Address.Street}</strong></p>
     <p> City: <strong>{organisation.Organization.Party.Address.City}</strong></p>
     <p> State: <strong>{organisation.Organization.Party.Address.StateProvince}</strong></p></body>
</html>";
        }

        private string GetActivationMailBody(User user, string activationLink)
        {
            return $@"<html>
<head>
</head>
<body>
    <h3>Dear {user.Person1.FirstName} {user.Person1.LastName},</h3>
    <p>Thank you for registering on Sherpa.Please verify your email address by clicking on the link below.</p>
      <p>{activationLink}</p>
      <p>Once verified, you can log into Sherpa at https://mysherpa.co.za/ </p>
      <p>For support, email us at support@mysherpa.co.za or contact us on + 27 63 688 5593 with any queries.</p>
      <p></p>
     <p>Kind regards,</p>
    <p>The Sherpa Team</p>
</html>";
        }

        private string GetAssignementConfirmationMailBody(User user, User assigner, string unitName)
        {
            return $@"<html>
<head>
</head>
<body>
    <h3>Dear {user.Person1.FirstName} {user.Person1.LastName},</h3>
    <p>You have been assigned to the following Business Unit on Sherpa by {assigner.Person1.FirstName} {assigner.Person1.LastName} :<strong>{unitName}</strong>.</p>
      <p>This business unit is listed under your 'Business Units' in Sherpa </p>
      <p>For support, email us at support@mysherpa.co.za or contact us on + 27 63 688 5593 with any queries.</p>
      <p></p>
     <p>Kind regards,</p>
    <p>The Sherpa Team</p>
</html>";
        }
    }
}

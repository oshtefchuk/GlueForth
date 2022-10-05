
namespace GlueForth.WebApi
{
    public interface IMailingService
    {
        void SendResetPasswordEmail(string receiverEmail, string passwordResetToken, string emailSubject, string siteBaseUri);

        void SendActivationEmail(string receiverEmail, string activationToken, string emailSubject, string siteBaseUri);
    }
}
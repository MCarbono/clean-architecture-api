import { User, UserData } from "@/entities";
import { Either, right } from "@/shared";
import { RegisterUserOnMailingList } from "@/useCases/register-user-on-mailing-list";
import { UserRepository } from "@/useCases/register-user-on-mailing-list/ports";
import { InMemoryUserRepository } from "@/useCases/register-user-on-mailing-list/repository";
import { RegisterAndSendEmail } from "@/useCases/registerAndSendEmail";
import { SendEmail } from "@/useCases/send-email";
import { MailServiceError } from "@/useCases/send-email/errors/mailServiceError";
import { EmailOptions, EmailService } from "@/useCases/send-email/ports";


describe('Register and send email to user', () => {
    const attachmentFilePath = '../resources/text.txt';
    const fromName = 'Test';
    const fromEmail = 'from_mail@mail.com';
    const toName = 'any_name';
    const toEmail = 'to_email@mail.com';
    const subject = 'Test e-mail';
    const emailBody = 'Hello World attachment test';
    const emailBodyHtml = '<b>Hello WOrld attachment test</b>';
    const attachment = [{
        filename: attachmentFilePath,
        contentType: 'text/plain'
    }];

const mailOptions: EmailOptions = {
    host: 'test',
    port: 867,
    username: 'test',
    password: 'test',
    from: `fromName ${fromEmail}`,
    to: `toName <${toEmail}>`,
    subject,
    text: emailBody,
    html: emailBodyHtml,
    attachments: attachment
}

class MailServiceMock implements EmailService {
    public timesSendWasCalled = 0;
    async send(emailOptions: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
        this.timesSendWasCalled++;
        return right(emailOptions)
    }
}

    test('Should add user with complete data to mailing list', async () => {
        const users: UserData[] = [];
        const repo: UserRepository = new InMemoryUserRepository(users);
        const registerUseCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const mailServiceMock = new MailServiceMock()
        const sendEmailUseCase: SendEmail = new SendEmail(mailOptions, mailServiceMock)
        const registerAndSendEmailUseCase: RegisterAndSendEmail = 
            new RegisterAndSendEmail(registerUseCase, sendEmailUseCase)
        const name = 'any_name'
        const email = 'any@email.com'
        const response: User = (await registerAndSendEmailUseCase.perform({ name, email })).value as User 
        const user = await repo.findUserByEmail('any@email.com')
        expect(user.name).toBe('any_name')
        expect(response.name.value).toBe('any_name')
        expect(mailServiceMock.timesSendWasCalled).toEqual(1)
        expect(response.name.value).toEqual('any_name')
    })
})
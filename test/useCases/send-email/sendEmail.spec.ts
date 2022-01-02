import { Either, left, right } from "@/shared";
import { EmailOptions, EmailService } from "@/useCases/send-email/ports/emailService";
import { MailServiceError } from "@/useCases/send-email/errors/mailServiceError";
import { SendEmail } from "@/useCases/send-email";
import { User } from "@/entities";

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
    from: `${fromName} ${fromEmail}`,
    to: `${toName} <${toEmail}>`,
    subject,
    text: emailBody,
    html: emailBodyHtml,
    attachments: attachment
}

class MailServiceStub implements EmailService {
    async send(emailOptions: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
        return right(emailOptions)
    }
}

class MailServiceErrorStub implements EmailService {
    async send(emailOptions: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
        return left(new MailServiceError())
    }
}

describe('Send email to user', () => {
    test('Should email user with valid name and email address', async () => {
        const mailServiceStub = new MailServiceStub()
        const useCase = new SendEmail(mailOptions, mailServiceStub)
        const user = User.create({ name: toName, email: toEmail }).value as User;
        const response = (await useCase.perform(user)).value as EmailOptions
        expect(response.to).toEqual(mailOptions.to) 
    })

    test('Should return error when email service fails', async () => {
        const mailServiceErrorStub = new MailServiceErrorStub()
        const useCase = new SendEmail(mailOptions, mailServiceErrorStub)
        const user = User.create({ name: toName, email: toEmail }).value as User;
        const response = await useCase.perform(user)
        expect(response.value).toBeInstanceOf(MailServiceError)

    })
})


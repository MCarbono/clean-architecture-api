import { NodemailerEmailService } from "@/external/mailServices/nodemailerEmailService";
import { MailServiceError } from "@/useCases/send-email/errors/mailServiceError";
import { EmailOptions } from "@/useCases/send-email/ports";

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

jest.mock('nodemailer')
const nodemailer = require('nodemailer')
const sendMailMock = jest.fn().mockReturnValueOnce('ok')
nodemailer.createTransport.mockReturnValue({sendMail: sendMailMock})

describe('Nodemailer mail service adapter', () => {
    beforeEach(() => {
        sendMailMock.mockClear()
        nodemailer.createTransport.mockClear()
    })

    test('Should return ok if email was sent', async () => {
        const nodemailer = new NodemailerEmailService()
        const result = await nodemailer.send(mailOptions)
        expect(result.value).toEqual(mailOptions)
    })

    test('should return error if email was not sent', async () => {
        const nodemailer = new NodemailerEmailService()
        sendMailMock.mockImplementationOnce(() => {
            throw new Error()
        })
        const result = await nodemailer.send(mailOptions)
        expect(result.value).toBeInstanceOf(MailServiceError)
    })
})
const attachmentFilePath = '../resources/text.txt'
const fromName = 'Test'
const fromEmail = 'from_mail@mail.com'
const toName = 'any_name'
const toEmail = 'to_email@mail.com'
const subject = 'Test e-mail'
const emailBody = 'Hello World attachment test'
const emailBodyHtml = '<b>Hello WOrld attachment test</b>'
const attachment = [{
    filename: attachmentFilePath,
    contentType: 'text/plain'
}]
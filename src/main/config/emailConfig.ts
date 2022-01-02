import { EmailOptions } from "@/useCases/send-email/ports";

const attachments = [{
    filename: 'clean-architecture.pdf',
    path: 'https://otaviolemos.github.io/clean-architecture.pdf'
}]

export function getEmailOptions(): EmailOptions{
    const from = 'Teste <teste@gmail.com>'
    const to = ''
    const mailOptions: EmailOptions = {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        username: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD,
        from,
        to,
        subject: 'Mensagem de teste',
        text: 'Texto da mensagem',
        html: '<b> Texto da mensagem </b>',
        attachments
    }

    return mailOptions;
}
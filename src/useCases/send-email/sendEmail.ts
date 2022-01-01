import { User, UserData } from "@/entities";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { Either, left } from "@/shared";
import { UseCase } from "../ports";
import { MailServiceError } from "./errors/mailServiceError";
import { EmailOptions, EmailService } from "./ports";


export class SendEmail implements UseCase{
    private readonly emailOptions: EmailOptions
    private readonly emailService: EmailService

    constructor(emailOptions: EmailOptions, emailService: EmailService){
        this.emailOptions = emailOptions;
        this.emailService = emailService
    }

    async perform(userData: UserData): 
        Promise<Either<MailServiceError, EmailOptions>> {
        const userOrError: Either<InvalidEmailError | InvalidNameError, User> = User.create(userData)
        if(userOrError.isLeft()) return left(userOrError.value);

        const user = userOrError.value;
        
        const greetings = `Olá, <b> ${user.name} </b>, tudo bem?`
        const customizedHtml = `${greetings}<br><br> ${this.emailOptions.html}`

        const emailInfo: EmailOptions = {
            host: this.emailOptions.host,
            port: this.emailOptions.port,
            username: this.emailOptions.username,
            password: this.emailOptions.password,
            from: this.emailOptions.from,
            to: `${user.name} <${user.email}>`,
            subject: this.emailOptions.subject,
            text: this.emailOptions.text,
            html: customizedHtml,
            attachments: this.emailOptions.attachments
        }
        return await this.emailService.send(emailInfo)
    }
}
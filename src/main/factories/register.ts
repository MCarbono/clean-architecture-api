import { RegisterAndSendEmailController } from "@/webControllers";
import { RegisterUserOnMailingList } from "@/useCases/register-user-on-mailing-list";
import { RegisterAndSendEmail } from "@/useCases/registerAndSendEmail"
import { SendEmail } from "@/useCases/send-email";
import { MongodbUserRepository } from "@/external/repositories/mongodb";
import { NodemailerEmailService } from "@/external/mailServices/nodemailerEmailService";
import { getEmailOptions } from "../config/emailConfig";

export const makeRegisterAndSendEmailController = (): RegisterAndSendEmailController => {
    const mongodbUserRepository = new MongodbUserRepository()
    const registerUserOnMailingList = new RegisterUserOnMailingList(mongodbUserRepository)
    const emailService = new NodemailerEmailService()
    const sendEmailUseCase = new SendEmail(getEmailOptions(), emailService)
    const registerAndSendEmailUseCase = new RegisterAndSendEmail(registerUserOnMailingList, sendEmailUseCase)
    const registerAndSendEmailController = new RegisterAndSendEmailController(registerAndSendEmailUseCase)
    return registerAndSendEmailController
}
import { RegisterAndSendEmailController } from "@/webControllers";
import { RegisterUserOnMailingList } from "@/useCases/register-user-on-mailing-list";
import { RegisterAndSendEmail } from "@/useCases/registerAndSendEmail"
import { SendEmail } from "@/useCases/send-email";
import { MongodbUserRepository } from "@/external/repositories/mongodb";

export const makeRegisterUserController = (): RegisterAndSendEmailController => {
    const mongodbUserRepository = new MongodbUserRepository()
    const registerUserOnMailingList = new RegisterUserOnMailingList(mongodbUserRepository)
    //const sendEmail = new SendEmail()
    const registerAndSendEmailController = new RegisterAndSendEmailController(registerUserOnMailingList)
    return registerAndSendEmailController
}
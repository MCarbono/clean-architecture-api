import { User, UserData } from "@/entities";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { Either, left, right } from "@/shared";
import { UseCase } from "../ports";
import { RegisterUserOnMailingList } from "../register-user-on-mailing-list";
import { SendEmail } from "../send-email";
import { MailServiceError } from "../send-email/errors/mailServiceError";

export class RegisterAndSendEmail implements UseCase{
    private registerUserOnMailingList: RegisterUserOnMailingList
    private sendEmail: SendEmail

    constructor(registerUserOnMailingList: RegisterUserOnMailingList, sendEmail: SendEmail){
        this.registerUserOnMailingList = registerUserOnMailingList
        this.sendEmail = sendEmail
    }

    async perform(request: UserData): 
        Promise<Either<InvalidEmailError | InvalidNameError | MailServiceError, UserData>> {
        const userOrError: Either<InvalidEmailError | InvalidNameError, User> = User.create(request)
        if(userOrError.isLeft()) return left(userOrError.value);

        const user: User = userOrError.value;
        
        await this.registerUserOnMailingList.perform(user)
        const result = await this.sendEmail.perform(user)

        if(result.isLeft()) return left(result.value)
        return right({ name: user.name.value, email: user.email.value })
    }
}
import { RegisterUserController } from "@/webControllers";
import { RegisterUserOnMailingList } from "@/useCases/register-user-on-mailing-list";
import { InMemoryUserRepository } from "@/useCases/register-user-on-mailing-list/repository";

export const makeRegisterUserController = (): RegisterUserController => {
    const inMemoryUserRepository = new InMemoryUserRepository([])
    const registerUserOnMailingList = new RegisterUserOnMailingList(inMemoryUserRepository)
    const registerUserController = new RegisterUserController(registerUserOnMailingList)
    return registerUserController
}
import { RegisterUserController } from "@/webControllers";
import { RegisterUserOnMailingList } from "@/useCases/register-user-on-mailing-list";
//import { InMemoryUserRepository } from "@/useCases/register-user-on-mailing-list/repository";
import { MongodbUserRepository } from "@/external/repositories/mongodb";

export const makeRegisterUserController = (): RegisterUserController => {
    //const inMemoryUserRepository = new InMemoryUserRepository([])
    const mongodbUserRepository = new MongodbUserRepository()
    const registerUserOnMailingList = new RegisterUserOnMailingList(mongodbUserRepository)
    const registerUserController = new RegisterUserController(registerUserOnMailingList)
    return registerUserController
}
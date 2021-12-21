import { InvalidEmailError } from "../../entities/errors/invalidEmailError";
import { InvalidNameError } from "../../entities/errors/invalidNameError";
import { User } from "../../entities/user";
import { UserData } from "../../entities/userData";
import { Either, left, right } from "../../shared/either";
import { UserRepository } from "../ports/userRepository";

export class RegisterUserOnMailingList {
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async registerUserOnMailingList(request: UserData): 
        Promise<Either<InvalidEmailError | InvalidNameError, UserData>> {
        const userOrError: Either<InvalidEmailError | InvalidNameError, User> = User.create(request)

        if(userOrError.isLeft()) return left(userOrError.value);

        if(!(await this.userRepository.exists(request))) 
            await this.userRepository.add(request)
        
        return right(request)
    }
}
import { UserData } from "./userData";
import { Either, left, right } from "../shared/either";
import { InvalidEmailError } from "./errors/invalidEmailError";
import { InvalidNameError } from "./errors/invalidNameError";
import { Name } from "./name";
import { Email } from "./email";


export class User {
    public readonly email: Email;
    public readonly name: Name;

    private constructor(name: Name, email: Email){
        this.name = name;
        this.email = email;
    }

    static create(userData: UserData): Either<InvalidEmailError | InvalidNameError, User> {
        const nameOrError = Name.create(userData.name)
        if(nameOrError.isLeft()) return left(new InvalidNameError())

        const emailOrError = Email.create(userData.email)
        if(emailOrError.isLeft()) return left(new InvalidEmailError())

        const name: Name = nameOrError.value as Name
        const email: Email = emailOrError.value as Email;

        return right(new User(name, email))
    }
}


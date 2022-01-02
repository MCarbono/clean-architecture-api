import { User, UserData } from "@/entities";
import { UserRepository } from "@/useCases/register-user-on-mailing-list/ports";
import { UseCase } from "@/useCases/ports";

export class RegisterUserOnMailingList implements UseCase{
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async perform(request: User): Promise<UserData> {
        const userData: UserData = {
            name: request.name.value,
            email: request.email.value
        }

        if(!(await this.userRepository.exists(userData))) 
            await this.userRepository.add(userData)
        
        return userData
    }
}
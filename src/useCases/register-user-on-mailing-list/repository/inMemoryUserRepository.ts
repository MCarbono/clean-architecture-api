import { UserRepository } from "../../ports/userRepository";
import { UserData } from "../userData";

export class InMemoryUserRepository implements UserRepository {

    private repository: UserData[]

    constructor(repository: UserData[]){
        this.repository = repository;
    }

    async add(user: UserData): Promise<void> {
        const exists = await this.exists(user)
        if(!exists) this.repository.push(user)
    }

    async findUserByEmail(email: string): Promise<UserData> {
        const users = await this.repository.filter(user => user.email === email)
        if(users.length) return users[0]
        return null;
    }

    async findAllUsers(): Promise<UserData[]> {
        return this.repository;
    }

    async exists(user: UserData): Promise<boolean> {
        if(await this.findUserByEmail(user.email) === null) return false
        return true;
    }
    
}
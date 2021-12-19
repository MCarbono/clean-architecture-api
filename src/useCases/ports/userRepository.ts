import { UserData } from "../register-user-on-mailing-list/userData";

export interface UserRepository {
    add(user: UserData): Promise<void>
    findUserByEmail(email: string): Promise<UserData>
    findAllUsers(): Promise<UserData[]>
    exists(user: UserData): Promise<boolean>
}
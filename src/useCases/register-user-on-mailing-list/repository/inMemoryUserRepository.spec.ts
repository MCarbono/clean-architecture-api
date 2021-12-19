import { UserData } from "../userData"
import { InMemoryUserRepository } from './inMemoryUserRepository'

describe('In memony user Repository', () => {
    test('Should returns null if user is not found', async () => {
        const users: UserData[] = []
        const userRepo = new InMemoryUserRepository(users)
        const user = await userRepo.findUserByEmail('any@email.com')
        expect(user).toBeNull()
    })

    test('Should return user if it is found in the repository', async () => {
        const users: UserData[] = []
        const name = 'any_name'
        const email = 'any@email.com'
        const userRepo = new InMemoryUserRepository(users)
        await userRepo.add({ name, email })
        const user = await userRepo.findUserByEmail(email)
        expect(user.name).toBe(name)
        expect(user.email).toBe(email)
    })

    test('Should return all users in the repository', async () => {
        const users: UserData[] = [
            { name: 'any_name', email: 'any@email.com '}, 
            { name: 'second_name', email: 'second@email.com'}
        ]
        const userRepo  = new InMemoryUserRepository(users)
        const returnedUsers = userRepo.findAllUsers()
        expect((await returnedUsers).length).toBe(2)
    })
})
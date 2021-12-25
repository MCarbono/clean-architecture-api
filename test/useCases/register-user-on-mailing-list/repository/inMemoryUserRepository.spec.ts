import { UserData } from "@/entities"
import { InMemoryUserRepository } from '@test/useCases/register-user-on-mailing-list/repository'

describe('In memony user Repository', () => {
    test('Should returns null if user is not found', async () => {
        const users: UserData[] = []
        const sut = new InMemoryUserRepository(users)
        const user = await sut.findUserByEmail('any@email.com')
        expect(user).toBeNull()
    })

    test('Should return user if it is found in the repository', async () => {
        const users: UserData[] = []
        const name = 'any_name'
        const email = 'any@email.com'
        const sut = new InMemoryUserRepository(users)
        await sut.add({ name, email })
        const user = await sut.findUserByEmail(email)
        expect(user.name).toBe(name)
        expect(user.email).toBe(email)
    })

    test('Should return all users in the repository', async () => {
        const users: UserData[] = [
            { name: 'any_name', email: 'any@email.com '}, 
            { name: 'second_name', email: 'second@email.com'}
        ]
        const sut = new InMemoryUserRepository(users)
        const returnedUsers = sut.findAllUsers()
        expect((await returnedUsers).length).toBe(2)
    })
})
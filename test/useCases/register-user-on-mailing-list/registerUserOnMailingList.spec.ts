import { UserData } from '@/entities'
import { UserRepository } from '@/useCases/register-user-on-mailing-list/ports';
import { RegisterUserOnMailingList } from '@/useCases/register-user-on-mailing-list';
import { InMemoryUserRepository } from '@/useCases/register-user-on-mailing-list/repository';

describe('Register user on mailing list use case', () => {
    test('Should add user with complete data to mailing list', async () => {
        const users: UserData[] = [];
        const repo: UserRepository = new InMemoryUserRepository(users);
        const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const name = 'any_name'
        const email = 'any@email.com'
        const response = await useCase.perform({ name, email }) 
        const user = await repo.findUserByEmail('any@email.com')
        expect(user.name).toBe('any_name')
        expect(response.value.name).toBe('any_name')
    })

    test('Should not add user with invalid email to mailing list', async () => {
        const users: UserData[] = [];
        const repo: UserRepository = new InMemoryUserRepository(users);
        const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const name = 'any_name'
        const invalidEmail = 'invalid_email'
        const response = (await useCase.perform({ name, email: invalidEmail })).value as Error 
        const user = await repo.findUserByEmail('invalid_email')
        expect(user).toBeNull()
        expect(response.name).toEqual('InvalidEmailError')
    })

    test('Should not add user with invalid name to mailing list', async () => {
        const users: UserData[] = [];
        const repo: UserRepository = new InMemoryUserRepository(users);
        const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const invalidName = 'a'
        const email = 'email@email.com'
        const response = (await useCase.perform({ name: invalidName, email })).value as Error 
        const user = await repo.findUserByEmail('email@email.com')
        expect(user).toBeNull()
        expect(response.name).toEqual('InvalidNameError')
    })
})
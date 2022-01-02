import { User, UserData } from '@/entities'
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
        const user = User.create({ name, email }).value as User;
        const response = await useCase.perform(user) 
        const addedUser = await repo.findUserByEmail('any@email.com')
        expect(addedUser.name).toBe('any_name')
        expect(response.name).toBe('any_name')
    })
})

/**
 * test('Should not try to email with invalid email address', async () => {
        const mailServiceStub = new MailServiceStub()
        const useCase = new SendEmail(mailOptions, mailServiceStub)
        const invalidEmail = 'invalid_email'
        const response = await useCase.perform({ name: toName, email: invalidEmail})
        expect(response).toBeInstanceOf(Left)
    })
 */
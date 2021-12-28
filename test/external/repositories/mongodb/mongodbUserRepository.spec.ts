import { MongoHelper } from "@/external/repositories/mongodb/helper/";
import { MongodbUserRepository } from "@/external/repositories/mongodb/";

describe('Mongodb User repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })
    afterAll(async () => {
        await MongoHelper.disconnect()
    })
    beforeEach(async () => {
        MongoHelper.clearCollection('users');
    })

    test('When user is added, it should exist', async () => {
        const userRepository = new MongodbUserRepository()
        const user = {
            name: 'any_name',
            email: 'any@email.com'
        }
        await userRepository.add(user)
        expect(await userRepository.exists(user)).toBeTruthy()
    })

    test('find all user should return all added user', async () => {
        const userRepository = new MongodbUserRepository();
        await userRepository.add({
            name: 'any_name',
            email: 'any@email.com'
        })
        await userRepository.add({
            name: 'teste',
            email: 'teste@email.com'
        })
        const users = await userRepository.findAllUsers()
        expect(users[0].name).toEqual('any_name')
        expect(users[1].name).toEqual('teste')
    })
})
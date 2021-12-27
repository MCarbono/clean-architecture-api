import { UserData } from "@/entities";
import { InvalidEmailError, InvalidNameError } from "@/entities/errors";
import { UserRepository } from "@/useCases/register-user-on-mailing-list/ports";
import { RegisterUserOnMailingList } from "@/useCases/register-user-on-mailing-list";
import { MissingParamError } from "@/webControllers/errors/missingParamError";
import { HttpRequest, HttpResponse } from "@/webControllers/ports"
import { RegisterUserController } from "@/webControllers/registerUserController";
import { InMemoryUserRepository } from "@/useCases/register-user-on-mailing-list/repository";
import { UseCase } from "@/useCases/ports";

describe('Register user web controller', () => {
    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const useCase: UseCase = new RegisterUserOnMailingList(repo)
    const controller: RegisterUserController = new RegisterUserController(useCase)

    class ErrorThrowingUseCaseStub implements UseCase {
        perform(request: any): Promise<void>{
            throw Error()
        }
    }

    const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

    test('Should return status code 201 when request contains valid user data', async () => {
        const request: HttpRequest = {
            body: {
                email: 'any@email.com',
                name: 'any name'
            }
        }
        const response: HttpResponse = await controller.handle(request)
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual(request.body)
    })

    test('Should return status code 400 when request contains invalid name', async () => {
        const requestWithInvalidName: HttpRequest = {
            body: {
                email: 'any@email.com',
                name: 'A'
            }
        }
        const response: HttpResponse = await controller.handle(requestWithInvalidName)
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeInstanceOf(InvalidNameError)
    })

    test('Should return status code 400 when request contains invalid email', async () => {
        const requestWithInvalidEmail: HttpRequest = {
            body: {
                email: 'invalid_email.com',
                name: 'ABC'
            }
        }
        const response: HttpResponse = await controller.handle(requestWithInvalidEmail)
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeInstanceOf(InvalidEmailError)
    })

    test('Should return status code 400 when request is missing user name', async () => {
        const request: HttpRequest = {
            body: {
                email: 'invalid_email.com',
            }
        }
        const response: HttpResponse = await controller.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeInstanceOf(MissingParamError)
        expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
    })

    test('Should return status code 400 when request is missing user email', async () => {
        const request: HttpRequest = {
            body: {
                name: 'any',
            }
        }
        const response: HttpResponse = await controller.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeInstanceOf(MissingParamError)
        expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
    })

    test('Should return status code 400 when request is missing user name and email', async () => {
        const request: HttpRequest = {
            body: {}
        }
        const response: HttpResponse = await controller.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toBeInstanceOf(MissingParamError)
        expect((response.body as Error).message).toEqual('Missing parameter from request: name email.')
    })

    test('Should return status code 500 when internal server error', async () => {
        const request: HttpRequest = {
            body: {
                email: 'any@email.com',
                name: 'any name'
            }
        }
        const controller: RegisterUserController = new RegisterUserController(errorThrowingUseCaseStub)
        const response: HttpResponse = await controller.handle(request)
        expect(response.statusCode).toBe(500)
        expect(response.body).toBeInstanceOf(Error)
    })
})
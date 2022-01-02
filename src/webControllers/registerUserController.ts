import { UserData } from "@/entities";
import { UseCase } from "@/useCases/ports";
import { MissingParamError } from "./errors/missingParamError";
import { HttpRequest, HttpResponse } from "./ports";
import { badRequest, created, serverError } from "./util";

export class RegisterAndSendEmailController {
    private readonly useCase: UseCase

    constructor(useCase: UseCase){
        this.useCase = useCase;
    }

    async handle(request: HttpRequest): Promise<HttpResponse>{
        try {
            if(!request.body.name || !request.body.email) {
                let missing = !(request.body.name) ? 'name ' : ''
                missing += !(request.body.email) ? 'email' : ''
                return badRequest(new MissingParamError(missing.trim()))
            }
    
            const userData: UserData = request.body;
            const response = await this.useCase.perform(userData)
            
            if(response.isLeft()) return badRequest(response.value)
            return created(response.value)
        } catch(error){
            return serverError(error)
        }
    }
}
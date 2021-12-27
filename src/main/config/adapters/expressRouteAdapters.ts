import { RegisterUserController } from '@/webControllers/'
import { Request, Response } from 'express';
import { HttpRequest, HttpResponse } from '@/webControllers/ports';

export const adaptRoute = (controller: RegisterUserController) => {
    return async(req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body
        }
        const httpResponse: HttpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}
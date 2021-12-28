export class MissingParamError extends Error {
    public name = 'MissingParamError'

    constructor(param: string){
        super(`Missing parameter from request: ${param}.`)
        this.name = `Missing parameter from request: ${param}.`
    }
}
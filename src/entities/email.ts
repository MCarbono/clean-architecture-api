import { Either, right, left } from "@/shared";
import { InvalidEmailError } from "@/entities/errors";

export class Email {
    static TOTAL_EMAIL_LENGTH: number = 320;
    static LOCAL_EMAIL_LENGTH: number = 64;
    static DOMAIN_EMAIL_LENGTH: number = 255;
    static DOMAIN_PART_LENGTH: number = 63;

    public readonly value: string;

    private constructor(email: string) {
        this.value = email
    }

    static validate(email: string) {
        if(!email) return false;

        if(email.length > this.TOTAL_EMAIL_LENGTH) return false;

        const emailRegex = 
        /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
        if(!emailRegex.test(email)) return false
        
        const [local,domain] = email.split('@')

        if(local.length > this.LOCAL_EMAIL_LENGTH || !local.length) return false
        if(domain.length > this.DOMAIN_EMAIL_LENGTH || !domain.length) return false

        const domainParts = domain.split('.')
        if(domainParts.some((part) => part.length > this.DOMAIN_PART_LENGTH)) return false;

        return true;
    }

    static create(email: string): Either<InvalidEmailError, Email>  {
        if(Email.validate(email)) return right(new Email(email))
        return left(new InvalidEmailError(email))
    }
}
import { Email } from "./email";

describe('Email validation', () => {
    test('Should not accept null strings', () => {
        const email: string = null;
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should not accept empty strings', () => {
        const email: string = '';
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should accept valid email', () => {
        const email: string = 'any@email.com'
        expect(Email.validate(email)).toBeTruthy();
    })

    test('Should not accept strings larger than 320 chars', () => {
        const email: string = 'c'.repeat(64) + '@' + 'c'.repeat(128) + '.' + 'd'.repeat(127);
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should not accept domain part larger than 255 characters', () => {
        const email: string = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should not accept local part larger than 64 characters', () => {
        const email: string = 'l'.repeat(65) + '@email.com';
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should not accept empty local part', () => {
        const email: string = '@email.com';
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should not accept empty domain part', () => {
        const email: string = 'anylocalValid@';
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should not accept domain with a part larger than 63 chars', () => {
        const email: string = 'any@' + 'd'.repeat(64) + '.com';
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should not accept local part with invalid char', () => {
        const email: string = 'any email@email.com';
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should not accept local part with two dots', () => {
        const email: string = 'any..email@email.com';
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should not accept local part with an ending dot', () => {
        const email: string = 'any.@email.com';
        expect(Email.validate(email)).toBeFalsy();
    })

    test('Should not accept email without an at-sign', () => {
        const email: string = 'anyemail.com';
        expect(Email.validate(email)).toBeFalsy();
    })
})
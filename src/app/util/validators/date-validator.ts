export class DateValidator {

    public static isBirthDate(birthdate: Date): boolean {
        let today = new Date();           
        return birthdate <= today;
    }

}
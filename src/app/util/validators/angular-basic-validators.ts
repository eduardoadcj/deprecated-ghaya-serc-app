import { FormControl } from '@angular/forms';
import { CpfValidator } from './cpf-validator';
import { DateValidator } from './date-validator';
import { DateOperator } from '../operators/date-operator';

export class AngularBasicValidators {

    public static cpf(cpf: FormControl) {
        return CpfValidator.isCpf(cpf.value) ? null : { cpfValidation: 'invalid' };
    }

    public static birthdate(birthdate: FormControl) {
        let dateOperator: DateOperator = new DateOperator();
        let date = new Date(dateOperator.getDateByString(dateOperator.formatDate(birthdate.value)));
        if (date.toString() == 'Invalid Date')
            return { dateValidation: 'invalid date' };
        return DateValidator.isBirthDate(date) ? null : { dateValidation: 'invalid birthdate' };
    }

}

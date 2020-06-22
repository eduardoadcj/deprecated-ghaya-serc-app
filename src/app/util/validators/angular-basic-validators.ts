import { FormControl } from '@angular/forms';
import { CpfValidator } from './cpf-validator';

export class AngularBasicValidators {
    public static cpf(cpf: FormControl) {
        return CpfValidator.isCpf(cpf.value) ? null : { cpfValidation: 'invalid' };
    }
}

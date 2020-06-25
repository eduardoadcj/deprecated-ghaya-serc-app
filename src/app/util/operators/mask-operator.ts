export class MaskOperator {
    
    formatCpf(cpf: string): string {
        return cpf.substring(0, 3) 
            + '.' + cpf.substring(3, 6) 
            + '.' + cpf.substring(6, 9) 
            + '-' + cpf.substring(9);
    }

    formatPhone(phone: string): string {
        return '(' + phone.substring(0, 2) + ') ' 
            + phone.substring(2, 7) + '-' 
            + phone.substring(7);
    }

}
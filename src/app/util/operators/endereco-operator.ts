import { Endereco } from 'src/app/model/endereco';

export class EnderecoOperator {

    print(endereco: Endereco): string {
        if(!endereco){
            return '';
        }
        let output: string = endereco.rua + ', ' + endereco.numero + ' - ' + endereco.cidade + ' - ' + endereco.estado;
        if (endereco.cep) {
            output += ' | ' + endereco.cep.substring(0, 5) + '-' + endereco.cep.substring(5);
        }
        if (endereco.complemento) {
            output += ' | ' + endereco.complemento;
        }
        return output;
    }

}
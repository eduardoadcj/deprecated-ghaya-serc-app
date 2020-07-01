import { Endereco } from './endereco';

export class Cliente{
    id: number;
    nome: string;
    email: string;
    whatsapp: string;
    numeroCalcado: string;
    numeroJeans: string;
    cpf: string;
    nascimento: Date;
    dataRegistro: Date;
    enderecos: Endereco[];
}
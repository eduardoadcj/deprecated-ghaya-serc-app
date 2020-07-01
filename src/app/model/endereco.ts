import { Cliente } from './cliente';

export class Endereco {
    id: number;
    titulo: string;
    numero: string;
    bairro: string;
    rua: string;
    cep: string;
    cidade: string;
    estado: string;
    complemento: string;
    cliente: Cliente;
}
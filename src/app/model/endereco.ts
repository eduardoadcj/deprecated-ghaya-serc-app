import { Cliente } from './cliente';

export class Endereco {
    id: number;
    titulo: string;
    numero: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    estadoUf: string;
    complemento: string;
    cliente: Cliente;
}
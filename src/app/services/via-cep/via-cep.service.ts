import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViaEndereco } from './model/via-endereco';
import { take } from 'rxjs/operators';

@Injectable()
export class ViaCepService {

  private readonly URL: string = "https://viacep.com.br/ws/";

  constructor(private http: HttpClient) { }

  getEnderecoByCep(cep: string) {
    return this.http.get<ViaEndereco>(this.URL + cep + "/json")
      .pipe(take(1));
  }

}

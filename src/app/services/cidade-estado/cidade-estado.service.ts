import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from './model/estado';
import { take } from 'rxjs/operators';
import { Cidade } from './model/cidade';

@Injectable()
export class CidadeEstadoService {

  private readonly URL = "http://eacjserver.ddns.net:8450/bce/";

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get<Estado[]>(this.URL + "estados")
      .pipe(take(1));
  }

  getCidadesByUf(uf: string) {
    return this.http.get<Cidade[]>(this.URL + "cidades/" + uf)
      .pipe(take(1));
  }

}

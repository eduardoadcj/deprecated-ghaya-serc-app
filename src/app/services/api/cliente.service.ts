import { Injectable } from '@angular/core';
import { SecurityService } from 'src/app/core/security/security.service';
import { Cliente } from 'src/app/model/cliente';
import { Endereco } from 'src/app/model/endereco';
import { api } from '../../app.config';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { EnderecoService } from './endereco.service';

@Injectable()
export class ClienteService {

  private readonly URL: string = api.url + 'clientes';

  constructor(private security: SecurityService,
    private http: HttpClient,
    private enderecoService: EnderecoService) { }

  save(cliente: Cliente, onComplete): void {

    this.security.getToken(token => {

      let enderecos = cliente.enderecos;
      cliente.enderecos = null;

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      this.http.post<Cliente>(this.URL, cliente, { headers: headers })
        .pipe(take(1))
        .subscribe(
          data => {

            if (!data) {
              onComplete({ error: 'null data' });
              return;
            }

            //trecho de código mal estruturado
            let enderecoCasa = enderecos[0];
            enderecoCasa.cliente = data;
            this.enderecoService.save(enderecoCasa, err => {
              if (err) {
                onComplete(err);
              }
              if (enderecos.length === 2) {
                let enderecoTrabalho = enderecos[1];
                enderecoTrabalho.cliente = data;
                this.enderecoService.save(enderecoTrabalho, err => {
                  if (err) {
                    onComplete(err);
                  } else {
                    onComplete();
                  }
                })
              } else {
                onComplete();
              }
            });

          },
          err => {
            if (err.error.error === 'invalid_token') {
              this.security.logout();
              cliente.enderecos = enderecos;
              this.save(cliente, onComplete);
            } else {
              onComplete(err);
            }
          }
        );

    });

  }

  get(page: number, onComplete) {
    this.security.getToken(token => {

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      this.http.get<Cliente[]>(this.URL+"?page="+page, { observe: 'response', headers: headers })
        .pipe(take(1))
        .subscribe(
          data => {
            onComplete({
              data: data.body,
              xTotalCount: data.headers.get('X-Total-Count')
            });
          },
          err => {
            if (err.error.error === 'invalid_token') {
              this.security.logout();
              this.get(page, onComplete);
            }else{
              onComplete({error: err});
            }
          });

    })
  }

}

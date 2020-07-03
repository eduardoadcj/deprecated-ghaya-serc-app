import { Injectable } from '@angular/core';
import { SecurityService } from 'src/app/core/security/security.service';
import { Cliente } from 'src/app/model/cliente';
import { api } from '../../app.config';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { EnderecoService } from './endereco.service';

interface Query {
  nome: string;
  numeroCalcado: string;
  numeroJeans: string;
}

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
            if (err.error && err.error.error === 'invalid_token') {
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

  update(cliente: Cliente, onComplete) {
    this.security.getToken(token => {

      let enderecos = cliente.enderecos;
      cliente.enderecos = null;

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      this.http.put<Cliente>(this.URL + '/' + cliente.id, cliente, { headers: headers })
        .pipe(take(1))
        .subscribe(
          data => {

            let enderecoCasa = enderecos[0];
            enderecoCasa.cliente = cliente;
            this.enderecoService.update(enderecoCasa, err => {
              if (err) {
                onComplete(err);
              }
              if (enderecos.length === 2) {
                let enderecoTrabalho = enderecos[1];
                enderecoTrabalho.cliente = cliente;
                
                if(enderecoTrabalho.id){
                  this.enderecoService.update(enderecoTrabalho, err => {
                    if (err) {
                      onComplete(err);
                    } else {
                      onComplete();
                    }
                  });
                }else{
                  this.enderecoService.save(enderecoTrabalho, err => {
                    if (err) {
                      onComplete(err);
                    } else {
                      onComplete();
                    }
                  });
                }
                
              } else {
                onComplete();
              }
            });

          },
          err => {
            if (err.error && err.error.error === 'invalid_token') {
              this.security.logout();
              this.update(cliente, onComplete);
            } else {
              onComplete(err);
            }
          }
        );

    })
  }

  delete(id: number, onComplete) {
    this.security.getToken(token => {
      
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      this.http.delete(this.URL + "/" + id, { headers: headers })
        .pipe(take(1))
        .subscribe(
          data => {
            onComplete();
          },
          err => {
            if (err.error && err.error.error === 'invalid_token') {
              this.security.logout();
              this.delete(id, onComplete);
            } else {
              onComplete(err);
            }
          }
        )

    });
  }

  get(page: number, onComplete) {
    this.security.getToken(token => {

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      let params = new HttpParams().set('page', String(page));

      this.http.get<Cliente[]>(this.URL, { observe: 'response', headers: headers, params: params })
        .pipe(take(1))
        .subscribe(
          data => {
            onComplete({
              data: data.body,
              xTotalCount: data.headers.get('X-Total-Count')
            });
          },
          err => {
            if (err.error && err.error.error === 'invalid_token') {
              this.security.logout();
              this.get(page, onComplete);
            } else {
              onComplete({ error: err });
            }
          });

    });
  }

  getConsulta(page: number, query: Query, onComplete): void {
    this.security.getToken(token => {

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      let params = new HttpParams();
      params = params.set('page', String(page));
      params = params.set('nome', query.nome)
      params = params.set('numeroCalcado', query.numeroCalcado);
      params = params.set('numeroJeans', query.numeroJeans);

      this.http.get<Cliente[]>(this.URL + '/consulta', { observe: 'response', headers: headers, params: params })
        .pipe(take(1))
        .subscribe(
          data => {
            onComplete({
              data: data.body,
              xTotalCount: data.headers.get('X-Total-Count')
            });
          },
          err => {
            if (err.error && err.error.error === 'invalid_token') {
              this.security.logout();
              this.get(page, onComplete);
            } else {
              onComplete({ error: err });
            }
          });

    });
  }

  getById(id: number, onComplete) {
    this.security.getToken(token => {

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      this.http.get<Cliente[]>(this.URL + "/id/" + id, { headers: headers })
        .pipe(take(1))
        .subscribe(
          data => {
            onComplete({ data: data })
          },
          err => {
            if (err.error && err.error.error === 'invalid_token') {
              this.security.logout();
              this.getById(id, onComplete);
            } else {
              onComplete({ error: err });
            }
          }
        )

    });
  }

}

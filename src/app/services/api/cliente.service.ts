import { Injectable } from '@angular/core';
import { SecurityService } from 'src/app/core/security/security.service';
import { Cliente } from 'src/app/model/cliente';
import { Endereco } from 'src/app/model/endereco';
import { api } from '../../app.config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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
            
            if(!data){
              onComplete('null response');
              return;
            }
            
            enderecos.forEach( endereco => {
              endereco.cliente_id = data.id;
              this.enderecoService.save(endereco, () => {});
            });

            onComplete();

          },
          err => {
            onComplete(err);
          }
        );

    });

  }

}

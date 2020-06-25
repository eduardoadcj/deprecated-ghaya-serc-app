import { Injectable } from '@angular/core';
import { api } from 'src/app/app.config';
import { SecurityService } from 'src/app/core/security/security.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endereco } from 'src/app/model/endereco';
import { take } from 'rxjs/operators';

@Injectable()
export class EnderecoService {
  
  private readonly URL: string = api.url + 'enderecos';

  constructor(private security: SecurityService,
    private http: HttpClient) { }

  save(endereco: Endereco, onComplete): void {

    this.security.getToken(token => {

      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });

      this.http.post<Endereco>(this.URL, endereco, { headers: headers })
        .pipe(take(1))
        .subscribe(
          data => {
            onComplete();
          },
          err => {
            onComplete(err)
          }
        );

    });

  }

}

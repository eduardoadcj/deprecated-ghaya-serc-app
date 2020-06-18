import { Injectable } from '@angular/core';
import { api, user } from '../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

interface Token {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

@Injectable()
export class SecurityService {

  constructor(private http: HttpClient) { }

  login(onComplete) {

    let params = new URLSearchParams();
    params.append('grant_type', user.grant_type);
    params.append('username', user.username);
    params.append('password', user.password);

    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(api.client_id + ':' + api.client_secret)
    });

    this.http.post(api.url + "oauth/token",
      params.toString(), { headers: headers })
      .subscribe(
        (data: Token) => {
          let expireDate = new Date().getTime() + (1000 * data.expires_in);
          Cookie.set("access_token", data.access_token, expireDate);
          onComplete();
        },
        err => onComplete(err)
      );

  }

  getToken() {
    return Cookie.get('access_token');
  }

  logout(){
    Cookie.delete('access_token');
  }

}

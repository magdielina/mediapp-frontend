import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private url: string = `${environment.HOST}/oauth/token`
  //Keycloak
  // private url: string = `${environment.UAA_HOST}/auth/realms/mediapp/protocol/openid-connect/token` //KeyCloak Wildfly
  private url: string = `${environment.UAA_HOST}/realms/mediapp/protocol/openid-connect/token`  //KeyCloak Quarkus
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string){
    /*const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });*/
    //KeyCloak
    const body = `client_id=mediapp-backend&grant_type=password&username=${username}&password=${password}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    });
  }

  isLogged(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  /*logout(){
    // sessionStorage.clear();
    // this.router.navigate(['login']);

    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    this.http.get(`${environment.HOST}/tokens/anulate/${token}`).subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    });
  }*/
    //Keycloak
    logout() {
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
  
      if (token) {
        const helper = new JwtHelperService();
  
        const decodedToken = helper.decodeToken(token);
        this.http.post(`${environment.HOST}/login/logout`, decodedToken.preferred_username).subscribe(() => {
            sessionStorage.clear();
            this.router.navigate(['login']);
          });
      }else{
        sessionStorage.clear();
        this.router.navigate(['login']);
      }
  
    }

  ///send mail from backend
  sendMail(username: string) {
    return this.http.post<number>(`${environment.HOST}/login/sendMail`, username, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

  checkTokenReset(token: string) {
    return this.http.get<number>(`${environment.HOST}/login/reset/check/${token}`);
  }

  reset(token: string, clave: string) {
    return this.http.post(`${environment.HOST}/login/reset/${token}`, clave, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface IUsuario {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor(private http: HttpClient) { }

  addUser(usu: string, cons: string) {
    let obj:IUsuario = { username: usu, password: cons };
    return this.http.post(`${environment.HOST}/tokens/user/add`, obj);
  }
}

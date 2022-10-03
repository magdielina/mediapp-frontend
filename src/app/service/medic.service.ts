import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medic } from '../model/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  private url: string = `${environment.HOST}/medics`;
  private medicChange = new Subject<Medic[]>;
  private messageChange = new Subject<string>;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Medic[]>(this.url);
  }

  findById(id: number) {
    return this.http.get<Medic>(`${this.url}/${id}`);
  }

  save(medic: Medic) {
    return this.http.post(this.url, medic);
  }

  update(medic: Medic) {
    return this.http.put(this.url, medic);
  }

  delete(id: number) {
    return this.http.delete<Medic>(`${this.url}/${id}`);
  }

  /***** Getters & Setters *****/

  setMedicChange(data: Medic[]){
    this.medicChange.next(data);
  }

  getMedicChange(){
    return this.medicChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}

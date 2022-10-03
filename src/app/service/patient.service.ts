import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/patient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private url: string = `${environment.HOST}/patients`;
  private patientChange = new Subject<Patient[]>;

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Patient[]>(this.url);
  }

  findById(id: number) {
    return this.http.get<Patient>(`${this.url}/${id}`);
  }

  save(patient: Patient) {
    return this.http.post(this.url, patient);
  }

  update(patient: Patient) {
    return this.http.put(this.url, patient);
  }

  /***** Getters & Setters *****/

  setPatientChange(data: Patient[]){
    this.patientChange.next(data);
  }

  getPatientChange(){
    return this.patientChange.asObservable();
  }

  delete(id: number) {
    return this.http.delete<Patient>(`${this.url}/${id}`);
  }
}

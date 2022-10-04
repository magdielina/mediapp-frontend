import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConsultListExamDTO } from '../dto/consultListExamDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  private url: string = `${environment.HOST}/consults`;

  constructor(
    private http: HttpClient
  ) { }

  saveTransaction(consultListExam: ConsultListExamDTO){
    return this.http.post(this.url, consultListExam);
  }
}

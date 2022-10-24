import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConsultListExamDTO } from '../dto/consultListExamDTO';
import { FilterConsultDTO } from '../dto/filterConsultDTO';
import { Consult } from '../model/consult';

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

  searchOthers(filterConsultDTO: FilterConsultDTO){
    return this.http.post<Consult[]>(`${this.url}/search/others`, filterConsultDTO);
  }

  searchByDates(date1: string, date2: string){
    return this.http.get<Consult[]>(`${this.url}/search/date?date1=${date1}&date2=${date2}`);

    // let params: HttpParams = new HttpParams();
    // params.set('date1', date1);
    // params.set('date2', date2)
    // return this.http.get<Consult[]>(`${this.url}/search/date`, {
    //   params: params
    // });
  }

  getExamsByConsultId(consultId: number){
    // return this.http.get<ConsultListExamDTO[]>(`${environment.HOST}/consultexams/${consultId}`);
    return this.http.get<any[]>(`${environment.HOST}/consultexams/${consultId}`);
  }

  callProcedureOrFunction(){
    return this.http.get<any[]>(`${this.url}/callProcedure`);
  }

  //PDF
  generateReport(){
    return this.http.get(`${this.url}/generatereport`, {responseType: 'blob'});
  }

  //Image
  saveFile(data: File){
    let formData: FormData = new FormData();
    formData.append('file', data);
    return this.http.post(`${this.url}/saveFile`, formData)
  }
  
}



import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';

@Component({
  selector: 'app-consult-autocomplete',
  templateUrl: './consult-autocomplete.component.html',
  styleUrls: ['./consult-autocomplete.component.css']
})
export class ConsultAutocompleteComponent implements OnInit {

  form: FormGroup;
  patientControl: FormControl = new FormControl();
  medicControl: FormControl = new FormControl();

  patients: Patient[];
  medics: Medic[];
  specialties: Specialty[];
  exams: Exam[];
  patientsFiltered$: Observable<Patient[]>;
  medicsFiltered$: Observable<Medic[]>;

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private examService: ExamService,
    private specialtyService: SpecialtyService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'patient': this.patientControl,
      'medic': this.medicControl
    });

    this.loadInitialData();

    this.patientsFiltered$ = this.patientControl.valueChanges.pipe(map(val => this.filterPatients(val)));
    this.medicsFiltered$ = this.medicControl.valueChanges.pipe(map(val => this.filterMedics(val)));

  }

  loadInitialData(){
    this.patientService.findAll().subscribe(data => this.patients = data);
    this.medicService.findAll().subscribe(data => this.medics = data);
    this.examService.findAll().subscribe(data => this.exams = data);
    this.specialtyService.findAll().subscribe(data => this.specialties = data);
  }

  filterPatients(val: any){
    if(val?.patientId > 0){
      return this.patients.filter(el =>
        el.firstName.toLocaleLowerCase().includes(val.firstName.toLocaleLowerCase()) ||
        el.lastName.toLocaleLowerCase().includes(val.lastName.toLocaleLowerCase()) ||
        el.dni.toLocaleLowerCase().includes(val.dni)      
        );
    } else {
      return this.patients.filter(el =>
        el.firstName.toLocaleLowerCase().includes(val?.toLocaleLowerCase()) ||
        el.lastName.toLocaleLowerCase().includes(val?.toLocaleLowerCase()) ||
        el.dni.toLocaleLowerCase().includes(val)      
        );
    }
  }

  showPatient(val: any){
    return val ? `${val.firstName} ${val.lastName}` : val
  }

  filterMedics(val: any){
    if(val?.medicId > 0){
      return this.medics.filter(el =>
        el.firstName.toLocaleLowerCase().includes(val.firstName.toLocaleLowerCase()) ||
        el.lastName.toLocaleLowerCase().includes(val.lastName.toLocaleLowerCase()) ||
        el.cmp.toLocaleLowerCase().includes(val.cmp)      
        );
    } else {
      return this.medics.filter(el =>
        el.firstName.toLocaleLowerCase().includes(val?.toLocaleLowerCase()) ||
        el.lastName.toLocaleLowerCase().includes(val?.toLocaleLowerCase()) ||
        el.cmp.toLocaleLowerCase().includes(val)      
        );
    }
  }

  showMedic(val: any){
    return val ? `${val.firstName} ${val.lastName}` : val
  }


  save(){
    
  }


}

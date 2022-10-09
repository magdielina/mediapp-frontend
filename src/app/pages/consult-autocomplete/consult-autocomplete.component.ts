import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { Consult } from 'src/app/model/consult';
import { ConsultDetail } from 'src/app/model/consultDetail';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import * as moment from 'moment';
import { ConsultListExamDTO } from 'src/app/dto/consultListExamDTO';
import { ConsultService } from 'src/app/service/consult.service';

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

  maxDate: Date = new Date();
  specialtySelected: Specialty;
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  diagnosis: string;
  treatment: string;

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private examService: ExamService,
    private specialtyService: SpecialtyService,
    private consultService: ConsultService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'patient': this.patientControl,
      'medic': this.medicControl,
      'specialty': new FormControl(),
      'exam': new FormControl(),
      'consultDate': new FormControl(),
      'diagnosis': new FormControl(),
      'treatment': new FormControl()
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

  addDetail(){
    let det = new ConsultDetail();
    det.diagnosis = this.form.value['diagnosis'];
    det.treatment = this.form.value['treatment'];

    this.details.push(det);
  }

  removeDetail(index: number){
    this.details.splice(index, 1);
  }

  addExam(){
    if(this.form.value['exam'] != null){
      this.examsSelected.push(this.form.value['exam'])
    } else {
      this.snackBar.open('Please select an exam', 'Info', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'})
    }
  }

  save(){
    let consult = new Consult();
    consult.patient = this.form.value['patient'];
    consult.medic = this.form.value['medic'];
    consult.specialty = this.form.value['specialty'];
    consult.numConsult = "C1";
    consult.details = this.details;
    consult.consultDate = moment(this.form.value['consultDate']).format('YYYY-MM-DDTHH:MM:SS')

    let dto = new ConsultListExamDTO();
    dto.consult = consult;
    dto.lstExam = this.examsSelected;

    this.consultService.saveTransaction(dto).subscribe(() => {
      this.snackBar.open('Consult Created', 'Info', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'})
      setTimeout(() => {
        this.cleanControls();
      }, 2000);
    });
  }

  cleanControls(){
    this.form.reset();
    this.patientControl.reset();
    this.medicControl.reset();
    this.details = [];
    this.examsSelected = [];
  }


}

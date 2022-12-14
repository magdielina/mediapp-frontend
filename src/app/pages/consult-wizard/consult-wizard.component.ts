import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Consult } from 'src/app/model/consult';
import { ConsultDetail } from 'src/app/model/consultDetail';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ConsultService } from 'src/app/service/consult.service';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import * as moment from 'moment';
import { ConsultListExamDTO } from 'src/app/dto/consultListExamDTO';

@Component({
  selector: 'app-consult-wizard',
  templateUrl: './consult-wizard.component.html',
  styleUrls: ['./consult-wizard.component.css']
})
export class ConsultWizardComponent implements OnInit {

  isLinear: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  patients: Patient[];
  medics: Medic[];
  specialties: Specialty[];
  exams: Exam[];

  maxDate: Date = new Date();
  details: ConsultDetail[] = [];
  medicSelected: Medic;
  examsSelected: Exam[] = [];
  consults: number[] = [];  //Numero de consultorio
  consultSelected: number; //Consultorio seleccionado

  @ViewChild('stepper') stepper: MatStepper


  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private medicService: MedicService,
    private examService: ExamService,
    private specialtyService: SpecialtyService,
    private consultService: ConsultService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      'patient': [new FormControl(), Validators.required],
      'medic': [new FormControl(), Validators.required],
      'specialty': [new FormControl(), Validators.required],
      'exam': [new FormControl(), Validators.required],
      'consultDate': [new FormControl(new Date()), Validators.required],
      'diagnosis': new FormControl(),
      'treatment': new FormControl(),
    });

    this.secondFormGroup = this.formBuilder.group({});

    this.loadInitialData();
  }

  loadInitialData(){
    this.patientService.findAll().subscribe(data => this.patients = data);
    this.medicService.findAll().subscribe(data => this.medics = data);
    this.examService.findAll().subscribe(data => this.exams = data);
    this.specialtyService.findAll().subscribe(data => this.specialties = data);
  
    for (let i = 1; i <= 100; i++) {
      this.consults.push(i);
    }
  }

  addDetail(){
    let det = new ConsultDetail();
    det.diagnosis = this.firstFormGroup.value['diagnosis'];
    det.treatment = this.firstFormGroup.value['treatment'];

    this.details.push(det);
  }

  removeDetail(index: number){
    this.details.splice(index, 1);
  }

  addExam(){
    if (this.firstFormGroup.value['exam'] != null){
      this.examsSelected.push(this.firstFormGroup.value['exam']);
    } else {
      this.snackBar.open('Please select an exam', 'Info', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    }
  }

  selectMedic(medic: Medic){
    this.medicSelected = medic;
  }

  selectConsult(consultNumber: number) {
    this.consultSelected = consultNumber;
  }

  nextManualStep() {
    if (this.consultSelected > 0) {
      this.stepper.next();
    } else {
      this.snackBar.open('Please asign a consulting room', 'Info', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    }
  }

  get f(){
    return this.firstFormGroup.controls;
  }

  save(){
    let consult = new Consult();
    consult.patient = this.firstFormGroup.value['patient'];
    consult.medic = this.medicSelected;
    consult.specialty = this.firstFormGroup.value['specialty'];;
    consult.numConsult = `C${this.consultSelected}`;
    consult.details = this.details;
    consult.consultDate = moment(this.firstFormGroup.value['consultDate']).format('YYYY-MM-DDTHH:mm:ss');

    let dto = new ConsultListExamDTO();
    dto.consult = consult;
    dto.lstExam = this.examsSelected;
    this.consultService.saveTransaction(dto).subscribe(() => {
      this.snackBar.open('SUCCESSFULL', 'INFO', { duration: 2000 });

      setTimeout(() => {
        this.cleanControls();
      }, 2000);
      
    });
  }

  cleanControls() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.stepper.reset();    
    this.details = [];
    this.examsSelected = [];
    this.consultSelected = 0;
    this.medicSelected = null;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  examsSelected: Exam[] = [];
  medicSelected: Exam[] = [];
  consults: Exam[] = [];  //Numero de consultorio
  consultSelected: Exam[] = []; //Consultorio seleccionado




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
      this.snackBar.open('Please select an exam', 'Info', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'})
    }
  }

}

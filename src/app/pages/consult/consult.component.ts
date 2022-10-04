import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Consult } from 'src/app/model/consult';
import { ConsultDetail } from 'src/app/model/consultDetail';
import { ConsultListExamDTO } from 'src/app/dto/consultListExamDTO';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import * as moment from 'moment';
import { ConsultService } from 'src/app/service/consult.service';
// import { ConsultListExamDTOI } from 'src/app/dto/consultListExamDTOI';

// interface ConsultListExamDTOI{
//   consult: Consult;
//   lstExam: Exam[];
// }

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {

  patients$: Observable<Patient[]>;
  medics$: Observable<Medic[]>;
  specialties$: Observable<Specialty[]>;
  exams$: Observable<Exam[]>;
  patientIdSelected: number;
  medicIdSelected: number;
  specialtyIdSelected: number;
  examSelected: Exam;
  maxDate: Date = new Date();
  dateSelected: Date;

  treatment: string;
  diagnosis: string;
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private examService: ExamService,
    private specialtyService: SpecialtyService,
    private consultService: ConsultService,
    private snackBar: MatSnackBar,
  ) { }

  

  ngOnInit(): void {
    this.getPatients();
    this.getMedics();
    this.getExams();
    this.getSpecialties();
  }

  addDetail(){
    let det = new ConsultDetail();
    det.diagnosis = this.diagnosis;
    det.treatment = this.treatment;

    this.details.push(det);
  }

  removeDetail(index: number){
    this.details.splice(index, 1);
  }

  addExam(){
    if((this.examSelected != null) && (this.examSelected.examId > 0)){
      this.examsSelected.push(this.examSelected)
    }else{
      this.snackBar.open('Please select an exam', 'Info', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'})
    }
  }

  save(){
    let patient = new Patient();
    patient.patientId = this.patientIdSelected;

    let medic = new Medic();
    medic.medicId = this.medicIdSelected;

    let specialty = new Specialty();
    specialty.specialtyId = this.specialtyIdSelected;

    let consult = new Consult();
    consult.patient = patient;
    consult.medic = medic;
    consult.specialty = specialty;
    consult.numConsult = "C1";
    consult.details = this.details;

    // let tzoffset = (new Date()).getTimezoneOffset() * 6000;
    // let localISOTime = (new Date(this.dateSelected.getTime() - tzoffset).toISOString());
    // console.log(localISOTime);
    // consult.consultDate = localISOTime;
    consult.consultDate = moment(this.dateSelected).format('YYYY-MM-DDTHH:MM:SS')

    // let dtoi : ConsultListExamDTOI = {
    //   consult : consult,
    //   lstExam : this.examsSelected
    // };

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
    this.patientIdSelected = 0;
    this.medicIdSelected = 0;
    this.specialtyIdSelected = 0;
    this.dateSelected = null;
    this.diagnosis = null;
    this.treatment = null;
    this.examSelected = null;
    this.details = [];
    this.examsSelected = [];
  }

  getPatients(){
    this.patients$ = this.patientService.findAll();
  }

  getMedics(){
    this.medics$ = this.medicService.findAll();
  }

  getExams(){
    this.exams$ = this.examService.findAll();
  }

  getSpecialties(){
    this.specialties$ = this.specialtyService.findAll();
  }


}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';

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
  maxDate: Date = new Date();
  dateSelected: Date;

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private examService: ExamService,
    private specialtyService: SpecialtyService,

  ) { }

  ngOnInit(): void {
    this.getPatients();
    this.getMedics();
    this.getExams();
    this.getSpecialties();
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

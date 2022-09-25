import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.findAll();
  }

}

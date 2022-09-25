import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  // patients: Patient[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni', 'actions']
  dataSource: MatTableDataSource<Patient>;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    
  }

}

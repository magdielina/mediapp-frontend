import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni', 'actions']
  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalElements: number;

  constructor(
    private patientService: PatientService,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.patientService.getPatientChange().subscribe(data => {
      this.createTable(data);
    });

    this.patientService.getMessageChange().subscribe(data => {
      this.snackBar.open('Info', data, {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    })

    // this.patientService.findAll().subscribe(data => {
    //   this.createTable(data);
    // });
    this.patientService.listPageable(0,5).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.totalElements = data.totalElements;
    });
  }

  createTable(patients: Patient[]){
    this.dataSource = new MatTableDataSource(patients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(e: any ) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  delete(patientId: number){
    this.patientService.delete(patientId).pipe(switchMap(() => {
      return this.patientService.findAll();
    }))
    .subscribe(data => {
      this.patientService.setPatientChange(data);
      this.patientService.setMessageChange('Patient has been deleted');
    });
  }

  showMore(e: any){
    this.patientService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.totalElements = data.totalElements;
    });
  }

}

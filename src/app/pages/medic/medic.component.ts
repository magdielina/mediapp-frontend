import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Medic } from 'src/app/model/medic';
import { MedicService } from 'src/app/service/medic.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'cmp', 'actions'];
  dataSource: MatTableDataSource<Medic>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private medicService: MedicService
  ) { }

  ngOnInit(): void {
    this.medicService.findAll().subscribe((data) => {
      this.createTable(data);
    });
  }

  createTable(medics: Medic[]){
    this.medicService.findAll().subscribe(data => {
    this.dataSource = new MatTableDataSource(medics);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  openDialog(medic: Medic){

  }

  applyFilter(e: any ) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  delete(medicId: number){
    this.medicService.delete(medicId).pipe(switchMap(() => {
      return this.medicService.findAll();
    }))
    .subscribe(data => {
      this.medicService.setMedicChange(data);
      this.medicService.setMessageChange('Medic has been deleted');
    });
  }

}

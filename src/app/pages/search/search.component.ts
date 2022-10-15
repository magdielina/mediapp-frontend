import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { FilterConsultDTO } from 'src/app/dto/filterConsultDTO';
import * as moment from 'moment';
import { ConsultService } from 'src/app/service/consult.service';
import { Consult } from 'src/app/model/consult';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  dataSource: MatTableDataSource<Consult>;
  displayedColumns: string[] = ['patient', 'medic', 'specialty', 'date', 'actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  form: FormGroup;
  maxEnd: Date = new Date();

  @ViewChild('tab') tabGroup: MatTabGroup

  constructor(
    private consultService: ConsultService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'dni': new FormControl(),
      'fullName': new FormControl(),
      'startDate': new FormControl(),
      'endDate': new FormControl(),
    })
  }

  search(){
    if (this.tabGroup.selectedIndex == 0){
      let dni = this.form.value['dni'];
      let fullName = this.form.value['fullName'];

      let dto = new FilterConsultDTO(dni, fullName);

      if(dto.dni == null){
        delete dto.dni;
      }
      if(dto.fullName == null){
        delete dto.fullName;
      }

      this.consultService.searchOthers(dto).subscribe(data => this.createTable(data));
    } else {

      let date1 = moment(this.form.value['startDate']).format('YYYY-MM-DDTHH:mm:ss');
      let date2 = moment(this.form.value['endDate']).format('YYYY-MM-DDTHH:mm:ss');

      this.consultService.searchByDates(date1, date2).subscribe(data => this.createTable(data));
    }
  }

  createTable(data: Consult[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  viewDetails(consult: Consult){
    this.dialog.open(SearchDialogComponent, {
      width: '750px',
      data: consult
    });
  }

}

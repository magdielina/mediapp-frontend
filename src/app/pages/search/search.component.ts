import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { FilterConsultDTO } from 'src/app/dto/filterConsultDTO';
import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  maxEnd: Date = new Date();

  @ViewChild('tab') tabGroup: MatTabGroup

  constructor() { }

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
      console.log(dto);

      
    } else {

      let date1 = moment(this.form.value['startDate']).format('YYYY-MM-DDTHH:mm:ss');
      let date2 = moment(this.form.value['endDate']).format('YYYY-MM-DDTHH:mm:ss');


      console.log(date1);
      console.log(date2);

    }
  }

}

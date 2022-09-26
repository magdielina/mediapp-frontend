import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  form: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'patientId' : new FormControl(0),
      'firstName' : new FormControl(''),
      'lastName' : new FormControl(''),
      'dni' : new FormControl(''),
      'address' : new FormControl(''),
      'phone' : new FormControl(''),
      'email' : new FormControl('')
    }
    )
  }

  operate() {
    console.log('Save');
  }

}

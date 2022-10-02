import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      'firstName' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'lastName' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'dni' : new FormControl('', [Validators.required, Validators.minLength(8)]),
      'address' : new FormControl('', [Validators.required]),
      'phone' : new FormControl('', [Validators.required, Validators.minLength(9)]),
      'email' : new FormControl('', [Validators.required, Validators.email])
    }
    )
  }

  operate() {
    console.log('Save');
  }

  get f() {
    return this.form.controls;
  }

}

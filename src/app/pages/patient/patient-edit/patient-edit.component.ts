import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  form: FormGroup;
  
  constructor(private patientService: PatientService) { }

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
    if(this.form.invalid){
      return;
    }
      let patient = new Patient();
      patient.firstName = this.form.value['firstName'];
      patient.lastName = this.form.value['lastName'];
      patient.patientId = this.form.value['patientId'];
      patient.dni = this.form.value['dni'];
      patient.address = this.form.value['address'];
      patient.phone = this.form.value['phone'];
      patient.email = this.form.value['email'];
      this.patientService.save(patient).subscribe(data => console.log(data));
  }

  get f() {
    return this.form.controls;
  }

}

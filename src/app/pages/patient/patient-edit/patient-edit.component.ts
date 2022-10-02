import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  id: number;
  isEdit: boolean;
  form: FormGroup;
  
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'patientId' : new FormControl(0),
      'firstName' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'lastName' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'dni' : new FormControl('', [Validators.required, Validators.minLength(8)]),
      'address' : new FormControl('', [Validators.required]),
      'phone' : new FormControl('', [Validators.required, Validators.minLength(9)]),
      'email' : new FormControl('', [Validators.required, Validators.email])
    });
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = this.id != null;
      this.initForm();
    });
  }

  initForm(){
    if(this.isEdit){
      this.patientService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          'patientId' : new FormControl(data.patientId),
          'firstName' : new FormControl(data.firstName, [Validators.required, Validators.minLength(3)]),
          'lastName' : new FormControl(data.lastName, [Validators.required, Validators.minLength(3)]),
          'dni' : new FormControl(data.dni, [Validators.required, Validators.minLength(8)]),
          'address' : new FormControl(data.address, [Validators.required]),
          'phone' : new FormControl(data.phone, [Validators.required, Validators.minLength(9)]),
          'email' : new FormControl(data.email, [Validators.required, Validators.email])
        });
      })
    }
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

      if(this.isEdit) {
        this.patientService.update(patient).subscribe(data => console.log(data));
      } else{
        this.patientService.save(patient).subscribe(data => console.log(data));
      }
  }

  get f() {
    return this.form.controls;
  }

}

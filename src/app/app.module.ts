import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicDialogComponent } from './pages/medic/medic-dialog/medic-dialog.component';
import { SpecialtyComponent } from './pages/specialty/specialty.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ExamEditComponent } from './pages/exam/exam-edit/exam-edit.component';
import { SpecialtyEditComponent } from './pages/specialty/specialty-edit/specialty-edit.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { ConsultAutocompleteComponent } from './pages/consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './pages/consult-wizard/consult-wizard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    MedicComponent,
    PatientEditComponent,
    MedicDialogComponent,
    SpecialtyComponent,
    ExamComponent,
    ExamEditComponent,
    SpecialtyEditComponent,
    ConsultComponent,
    ConsultAutocompleteComponent,
    ConsultWizardComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

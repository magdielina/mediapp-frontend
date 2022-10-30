import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './consult-wizard/consult-wizard.component';
import { ConsultComponent } from './consult/consult.component';
import { ExamEditComponent } from './exam/exam-edit/exam-edit.component';
import { ExamComponent } from './exam/exam.component';
import { MedicComponent } from './medic/medic.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { PatientComponent } from './patient/patient.component';
import { ReportComponent } from './report/report.component';
import { SearchComponent } from './search/search.component';
import { SpecialtyEditComponent } from './specialty/specialty-edit/specialty-edit.component';
import { SpecialtyComponent } from './specialty/specialty.component';

export const routes: Routes = [
    { 
        path: 'patient', component: PatientComponent, children: [
          { path: 'new', component: PatientEditComponent},
          { path: 'edit/:id', component: PatientEditComponent}
        ]  
      },
      { 
        path: 'exam', component: ExamComponent, children: [
          { path: 'new', component: ExamEditComponent},
          { path: 'edit/:id', component: ExamEditComponent}
        ]  
      },
      { 
        path: 'specialty', component: SpecialtyComponent, children: [
          { path: 'new', component: SpecialtyEditComponent},
          { path: 'edit/:id', component: SpecialtyEditComponent}
        ]  
      },
      { path: 'medic', component: MedicComponent },
      { path: 'consult', component: ConsultComponent },
      { path: 'consult-autocomplete', component: ConsultAutocompleteComponent },
      { path: 'consult-wizard', component: ConsultWizardComponent },
      { path: 'search', component: SearchComponent },
      { path: 'report', component: ReportComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
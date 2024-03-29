import { NgModule } from '@angular/core';

import { PatientComponent } from './patient/patient.component';
import { MedicComponent } from './medic/medic.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { MedicDialogComponent } from './medic/medic-dialog/medic-dialog.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { ExamComponent } from './exam/exam.component';
import { ExamEditComponent } from './exam/exam-edit/exam-edit.component';
import { SpecialtyEditComponent } from './specialty/specialty-edit/specialty-edit.component';
import { ConsultComponent } from './consult/consult.component';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './consult-wizard/consult-wizard.component';
import { SearchComponent } from './search/search.component';
import { SearchDialogComponent } from './search/search-dialog/search-dialog.component';
import { ReportComponent } from './report/report.component';
import { LayoutComponent } from './layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MaterialModule } from '../material/material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
        FlexLayoutModule,
        PdfViewerModule,
        ReactiveFormsModule,
        FormsModule,
        PagesRoutingModule
    ],
    exports: [],
    declarations: [    
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
        SearchComponent,
        SearchDialogComponent,
        ReportComponent,
        LayoutComponent,
        DashboardComponent,
        Not403Component,
        Not404Component
    ],
    providers: [],
})
export class PagesModule { }

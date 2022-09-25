import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatMenuModule,
    // MatToolbarModule,    
    // MatSidenavModule,
    // MatDividerModule
  ]
})
export class MaterialModule { }

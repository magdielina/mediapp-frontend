import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ForgotComponent } from './pages/login/forgot/forgot.component';
import { TokenComponent } from './pages/login/forgot/token/token.component';
import { LoginComponent } from './pages/login/login.component';
import { Not404Component } from './pages/not404/not404.component';
import { NewUserComponent } from './pages/login/new-user/new-user.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'forgot', component: ForgotComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { //Keycloak
    path: 'new-user',
    component: NewUserComponent
  },
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  { path: 'not-404', component: Not404Component },
  { path: '**', redirectTo: 'not-404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

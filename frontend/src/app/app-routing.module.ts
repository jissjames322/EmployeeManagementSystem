import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { AuthenticationComponent } from './auth/authentication.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  //lazy loading
  {
    path: 'employees',
    component: EmployeesComponent,
    loadChildren: () =>
      import('./employees/employees.module').then((x) => x.EmployeesModule),
  },

  //auth route
  {
    path: 'auth',
    component: AuthenticationComponent,
    loadChildren: () => import('./auth/auth.module').then((x) => x.AuthModule),
  },
  //wildcard route
  {
    path: '**',
    redirectTo: 'auth/notfound',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

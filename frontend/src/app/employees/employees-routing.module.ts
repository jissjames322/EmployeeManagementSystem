import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  //example : https:/localhost:4200/employees/list 
 //employee-add 
 {path: 'add', component: EmployeeAddComponent}, 
  //employee-edit 
 {path: 'edit/:id', component:EmployeeEditComponent}, 
 //employee-list 
 {path: 'list', component: EmployeeListComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }

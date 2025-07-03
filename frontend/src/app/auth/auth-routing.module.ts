import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';

const routes: Routes = [

{ path: 'login', component: LoginComponent },
{ path: 'notfound', component: NotfoundComponent },
{ path: 'admin', component: AdmindashboardComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

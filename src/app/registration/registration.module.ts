import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';


import { RegistrationComponent } from './registration.component';

const AuthoappRoutes: Routes = [
  { path: 'registration', component: RegistrationComponent },
];


@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(AuthoappRoutes), MatTooltipModule],
  declarations: [RegistrationComponent],
  exports: [RouterModule, RegistrationComponent],
})
export class RegistrationModule { }
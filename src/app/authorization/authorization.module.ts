import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';


import { RegistrationComponent } from './registration.component';
import { AuthorizationComponent } from './authorization.component';

const AuthoappRoutes: Routes = [
    { path: 'authorization', component: AuthorizationComponent  },
    { path: '', component: AuthorizationComponent },
    { path: 'registration', component: RegistrationComponent },
];


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(AuthoappRoutes), MatTooltipModule],
    declarations: [RegistrationComponent, AuthorizationComponent],
    exports: [RouterModule, RegistrationComponent, AuthorizationComponent],
})
export class AuthorizationModule { }
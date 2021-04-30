import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';


import { AuthorizationComponent } from './authorization.component';

const AuthoappRoutes: Routes = [
    { path: 'authorization', component: AuthorizationComponent },
    { path: '', component: AuthorizationComponent },
];


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(AuthoappRoutes), MatTooltipModule],
    declarations: [AuthorizationComponent],
    exports: [RouterModule, AuthorizationComponent],
})
export class AuthorizationModule { }
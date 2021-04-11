import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import {Routes, RouterModule} from '@angular/router';
import { AuthorizationGuard }   from './authorization.guard';

import { RegistrationComponent}   from './registration.component';
import { AuthorizationComponent }   from './authorization.component';

const AuthoappRoutes: Routes =[
    {path: 'authorization', component: AuthorizationComponent, canActivate: [AuthorizationGuard]},
    {path: '', component: AuthorizationComponent},
    { path: 'registration', component: RegistrationComponent},
];


@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(AuthoappRoutes)],
    declarations: [RegistrationComponent, AuthorizationComponent],
    exports:[RouterModule, RegistrationComponent, AuthorizationComponent],
    providers:    [AuthorizationGuard]
})
export class AuthorizationModule { }
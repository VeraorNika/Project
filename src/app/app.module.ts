import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent }   from './app.component';
import { RegistrationComponent}   from './registration.component';
import { AuthorizationComponent }   from './authorization.component';

import { StudentComponent }   from './student_main_page.component';
import { StudentNavigationComponent }   from './student_navigation.component';
import { StudentHomeWorkDetailsComponent }   from './student_homework_details.component';
import { StudentTeacherComponent }   from './student_teacher.component';
import { StudentTeachersComponent }   from './student_teachers.component';

import { TeacherComponent }   from './teacher_main_page.component';
import {TeacherNavigationComponent} from './teacher_navigation.component';
import {TeacherHomeworksComponent} from './teacher_homeworks.component';
import {TeacherHomeworkDetailComponent} from './teacher_homeworks_details.component';


import { NotFoundComponent }   from './not-found.component';


const appRoutes: Routes =[
    { path: '', component: AuthorizationComponent},
    {path: 'authorization', component: AuthorizationComponent},
    { path: 'registration', component: RegistrationComponent},
    { path: 'student_main_page', component: StudentComponent},
    { path: 'student_main_page/teachers', component: StudentTeachersComponent},
    { path: 'teacher_main_page', component: TeacherComponent},
    { path: 'teacher_main_page/teacher_homeworks', component: TeacherHomeworksComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(appRoutes) ],
    declarations: [ AppComponent, RegistrationComponent, AuthorizationComponent, StudentComponent, StudentNavigationComponent, StudentHomeWorkDetailsComponent, StudentTeacherComponent, StudentTeachersComponent, TeacherComponent, TeacherNavigationComponent, TeacherHomeworksComponent, TeacherHomeworkDetailComponent,  NotFoundComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
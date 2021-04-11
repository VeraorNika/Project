import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';

import {MatDialogModule} from '@angular/material/dialog';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';

import {AuthorizationModule} from './authorization/authorization.module';
import {StudentModule} from './student/student.module';
import {TeacherModule} from './teacher/teacher.module';
import {ProblemsModule} from './problems/problems.module'

import {StudentService} from './services/student.service';
import {HomeworkService} from './services/homework.service';

import { AppComponent }   from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, AuthorizationModule, StudentModule, TeacherModule, ProblemsModule, BrowserAnimationsModule, ],
    declarations: [ AppComponent],
    bootstrap:    [ AppComponent ],
    providers:  [StudentService, HomeworkService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]
})
export class AppModule { }
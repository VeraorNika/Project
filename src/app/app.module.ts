
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// import firebase from 'firebase/app';
import { environment } from './../environments/environment';

import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AuthorizationModule } from './authorization/authorization.module';
import {RegistrationModule} from './registration/registration.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ProblemsModule } from './problems/problems.module'

import { StudentService } from './services/student.service';
import { HomeworkService } from './services/homework.service';
import { TeacherService } from './services/teacher.service';
import { AuthorizationService } from './services/authorization.service';
import { RegistrationService } from './services/registration.service';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// На крайний случай запихиваем это в аргумент AngularFireModule.initializeApp
const firebaseConfig = {
  apiKey: "AIzaSyCjuPaBu3_Q3fS0uKoNLaLJTEImLKIzQQM",
  authDomain: "homeworkapp-9ec5a.firebaseapp.com",
  databaseURL: "https://homeworkapp-9ec5a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "homeworkapp-9ec5a",
  storageBucket: "homeworkapp-9ec5a.appspot.com",
  messagingSenderId: "497893064455",
  appId: "1:497893064455:web:66ef031420a60c70ba8fa2"
};

@NgModule({
  imports: [AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule, BrowserModule, FormsModule, HttpClientModule, AuthorizationModule, RegistrationModule, StudentModule, TeacherModule, ProblemsModule, BrowserAnimationsModule,],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [StudentService, HomeworkService, TeacherService, AuthorizationService, RegistrationService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }]
})
export class AppModule { }
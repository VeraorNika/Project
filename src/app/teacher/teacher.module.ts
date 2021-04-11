import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

// Для всплывающего окна
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TeacherNewHomeworkComponent} from './teacher_newhomework.component';
 
import {TeacherComponent}   from './teacher_main_page.component';
import {TeacherNavigationComponent} from './teacher_navigation.component';
import {TeacherHomeworksComponent} from './teacher_homeworks.component';
import {TeacherHomeworkDetailComponent} from './teacher_homeworks_details.component'; 

const TeachappRoutes: Routes =[
    { path: 'teacher_main_page', component: TeacherComponent},
    { path: 'teacher_main_page/teacher_homeworks', component: TeacherHomeworksComponent},
];


@NgModule({
    imports:      [ BrowserModule, FormsModule,ReactiveFormsModule, MatDialogModule, RouterModule.forRoot(TeachappRoutes)],
    declarations: [TeacherComponent, TeacherNavigationComponent, TeacherHomeworksComponent, TeacherHomeworkDetailComponent, TeacherNewHomeworkComponent],
    entryComponents:[TeacherNewHomeworkComponent],
    exports: [RouterModule, TeacherComponent, TeacherNavigationComponent, TeacherHomeworksComponent, TeacherHomeworkDetailComponent],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
      ]
    
})
export class TeacherModule { }
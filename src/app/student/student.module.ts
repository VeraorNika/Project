import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

//Всплывающее окно
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StudentHomeworkDetailsComponent} from './student_homework_details.component';


import { StudentComponent }   from './student_main_page.component';
import { StudentNavigationComponent }   from './student_navigation.component';
import { StudentTeacherComponent }   from './student_teacher.component';
import { StudentTeachersComponent }   from './student_teachers.component';


const StudappRoutes: Routes =[
    { path: 'student_main_page', component: StudentComponent},
    { path: 'student_main_page/teachers', component: StudentTeachersComponent},
    { path: 'student_main_page/teachers/teacher', component: StudentTeacherComponent},
     {path: 'student_main_page/homework_details', component:StudentHomeworkDetailsComponent},
    { path: 'student_main_page/teacher', component: StudentTeacherComponent},
    
];  


@NgModule({
    imports:      [ BrowserModule, FormsModule, MatDialogModule, RouterModule.forRoot(StudappRoutes)],
    declarations: [StudentComponent, StudentNavigationComponent, StudentHomeworkDetailsComponent, StudentTeacherComponent, StudentTeachersComponent],
    exports:[RouterModule, StudentComponent, StudentNavigationComponent, StudentHomeworkDetailsComponent, StudentTeacherComponent, StudentTeachersComponent],
    entryComponents:[StudentHomeworkDetailsComponent],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
      ]
})
export class  StudentModule { }
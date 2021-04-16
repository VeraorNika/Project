import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

//Всплывающее окно
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { HomeworkDetailsComponent } from './student_homework_details.component';

import { StudentComponent } from './student_main_page.component';
import { StudentNavigationComponent } from './student_navigation.component';
import {TeacherComponent } from './student_teacher.component';
import {TeachersComponent } from './student_teachers.component';


const StudappRoutes: Routes = [
    { path: 'student-main-page', component: StudentComponent },
    { path: 'student-main-page/teachers', component: TeachersComponent },
    { path: 'student-main-page/teachers/teacher', component: TeacherComponent },
    { path: 'student-main-page/homework-details', component: HomeworkDetailsComponent },
    { path: 'student-main-page/teacher', component: TeacherComponent },

];


@NgModule({
    imports: [BrowserModule, FormsModule, MatDialogModule, RouterModule.forRoot(StudappRoutes), CommonModule, DragDropModule, MatTooltipModule, MatTableModule, MatSortModule],
    declarations: [StudentComponent, StudentNavigationComponent, HomeworkDetailsComponent, TeacherComponent, TeachersComponent],
    exports: [RouterModule, StudentComponent, StudentNavigationComponent, HomeworkDetailsComponent, TeacherComponent, TeachersComponent],
    entryComponents: [HomeworkDetailsComponent],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
    ]
})
export class StudentModule { }
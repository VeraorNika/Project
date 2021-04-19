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

import { StudentComponent } from './student_main_page.component';
import { StudentNavigationComponent } from './student_navigation.component';
import {TeachersComponent } from './student_teachers.component';

import {CommonStudentService} from '../services/common.student.service';


const StudappRoutes: Routes = [
    { path: 'student-main-page', component: StudentComponent },
    { path: 'student-main-page/teachers', component: TeachersComponent },
    
];


@NgModule({
    imports: [BrowserModule, FormsModule, MatDialogModule, RouterModule.forRoot(StudappRoutes), CommonModule, DragDropModule, MatTooltipModule, MatTableModule, MatSortModule],
    declarations: [StudentComponent, StudentNavigationComponent, TeachersComponent],
    exports: [RouterModule, StudentComponent, StudentNavigationComponent, TeachersComponent],
    // entryComponents: [HomeworkDetailsComponent],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }]
})
export class StudentModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

// Для всплывающего окна
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewHomeworkComponent } from './teacher_newhomework.component';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { TeacherComponent } from './teacher_main_page.component';
import { NavigationComponent } from './teacher_navigation.component';
import { HomeworksComponent } from './teacher_homeworks.component';
import { HomeworkDetailsComponent } from './teacher_homeworks_details.component';

const TeachappRoutes: Routes = [
    { path: 'teacher-main-page', component: TeacherComponent },
    { path: 'teacher-main-page/teacher-homeworks', component: HomeworksComponent },
    { path: 'teacher-main-page/teacher-homeworks/teacher-homework-details', component: HomeworkDetailsComponent }
];


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, MatDialogModule, RouterModule.forRoot(TeachappRoutes), MatTooltipModule, CommonModule, DragDropModule, MatTableModule, MatSortModule],
    declarations: [TeacherComponent, NavigationComponent, HomeworksComponent, HomeworkDetailsComponent, NewHomeworkComponent],
    entryComponents: [NewHomeworkComponent],
    exports: [RouterModule, TeacherComponent, NavigationComponent, HomeworksComponent, HomeworkDetailsComponent],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
    ]

})
export class TeacherModule { }
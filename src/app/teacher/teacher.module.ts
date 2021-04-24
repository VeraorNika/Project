import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TeacherGuard} from './teacher.guard';
// Таблица
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

// Для всплывающего окна
import { NewHomeworkComponent } from './teacher_newhomework.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DragDropModule } from "@angular/cdk/drag-drop";

// Свои компоненты
import { TeacherComponent } from './teacher_main_page.component';
import { NavigationComponent } from './teacher_navigation.component';
import { HomeworksComponent } from './teacher_homeworks.component';
import { HomeworkDetailsComponent } from './teacher_homeworks_details.component';

const TeachappRoutes: Routes = [
    { path: 'teacher-main-page', component: TeacherComponent, canActivate:[TeacherGuard] },
    { path: 'teacher-main-page/teacher-homeworks', component: HomeworksComponent, canActivate:[TeacherGuard]  },
    { path: 'teacher-main-page/teacher-homeworks/teacher-homework-details', component: HomeworkDetailsComponent, canActivate:[TeacherGuard]  }
];


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, MatDialogModule, RouterModule.forRoot(TeachappRoutes), MatTooltipModule, MatInputModule, CommonModule, DragDropModule, MatTableModule, MatSortModule, MatFormFieldModule],
    declarations: [TeacherComponent, NavigationComponent, HomeworksComponent, HomeworkDetailsComponent, NewHomeworkComponent],
    entryComponents: [NewHomeworkComponent],
    exports: [RouterModule, TeacherComponent, NavigationComponent, HomeworksComponent, HomeworkDetailsComponent],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false },  }, TeacherGuard
    ]

})
export class TeacherModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Таблица
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

//Всплывающее окно
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DragDropModule } from "@angular/cdk/drag-drop";

//Внутренние модули
import { MainPageModule } from './main page/mainPage.module';
import { TeacherModule } from './teacher/teacher.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentNavigationModule } from './navigation/navigation.module';

@NgModule({
    imports: [MainPageModule, TeacherModule, TeachersModule, StudentNavigationModule, BrowserModule, FormsModule, MatDialogModule, CommonModule, DragDropModule, MatTooltipModule, MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule,],
    declarations: [],
    exports: [RouterModule],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }]
})
export class StudentModule { }
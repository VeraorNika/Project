import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import{StudentGuard} from './student.guard';

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

//Свои компоненты
import { StudentComponent } from './student_main_page.component';
import { StudentNavigationComponent } from './student_navigation.component';
import { TeachersComponent } from './student_teachers.component';
import { TeacherComponent } from './student_teacher.component';


const StudappRoutes: Routes = [
    { path: 'student-main-page', component: StudentComponent, canActivate:[StudentGuard] },
    { path: 'student-main-page/teachers', component: TeachersComponent, canActivate:[StudentGuard] },
    { path: 'student-main-page/teachers/teacher', component: TeacherComponent, canActivate:[StudentGuard] },

];


@NgModule({
    imports: [BrowserModule, FormsModule, MatDialogModule, RouterModule.forRoot(StudappRoutes), CommonModule, DragDropModule, MatTooltipModule, MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule],
    declarations: [StudentComponent, StudentNavigationComponent, TeachersComponent, TeacherComponent],
    exports: [RouterModule, StudentComponent, StudentNavigationComponent, TeachersComponent, TeacherComponent],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }, StudentGuard]
})
export class StudentModule { }
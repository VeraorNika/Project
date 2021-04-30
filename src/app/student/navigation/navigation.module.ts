import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StudentGuard } from '../student.guard';
//Свои компоненты
import { StudentNavigationComponent } from './navigation.component';

//Роутинг
import { StudentComponent } from '../main page/main_page.component';
import { TeachersComponent } from '../teachers/teachers.component';
import { TeacherComponent } from '../teacher/teacher.component';

const StudappRoutes: Routes = [
    { path: 'student-main-page', component: StudentComponent, canActivate: [StudentGuard] },
    { path: 'student-main-page/teachers', component: TeachersComponent, canActivate: [StudentGuard] },
    { path: 'student-main-page/teachers/teacher', component: TeacherComponent, canActivate: [StudentGuard] },

];

@NgModule({
    imports: [BrowserModule, CommonModule, RouterModule.forRoot(StudappRoutes)],
    declarations: [StudentNavigationComponent],
    exports: [RouterModule, StudentNavigationComponent],
})
export class StudentNavigationModule { }
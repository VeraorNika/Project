import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TeacherNavigationComponent } from './navigation.component';
import { Routes, RouterModule } from '@angular/router';
import { TeacherGuard } from '../teacher.guard';

//Роутинг
import { TeacherComponent } from '../main page/main_page.component';
import { HomeworksComponent } from '../homeworks/homeworks.component';
import { HomeworkDetailsComponent } from '../details/details.component';
const TeachappRoutes: Routes = [
    { path: 'teacher-main-page', component: TeacherComponent, canActivate: [TeacherGuard] },
    { path: 'teacher-main-page/teacher-homeworks', component: HomeworksComponent, canActivate: [TeacherGuard] },
    { path: 'teacher-main-page/teacher-homeworks/teacher-homework-details', component: HomeworkDetailsComponent, canActivate: [TeacherGuard] }
];


@NgModule({
    imports: [BrowserModule, CommonModule, RouterModule.forRoot(TeachappRoutes),],
    declarations: [TeacherNavigationComponent],
    exports: [TeacherNavigationComponent],
    providers: [TeacherGuard]

})
export class TeacherNavigationModule { }
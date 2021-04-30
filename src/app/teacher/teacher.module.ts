import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


// Внутренние модули
import { DetailsModule } from './details/details.module';
import { MainPageModule } from './main page/main_page.module';
import { NewHomeworkModule } from './newhomework/newhomework.module';
import { HomeworksModule } from './homeworks/homeworks.module';
import { TeacherNavigationModule } from './navigation/navigation.module';



@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule, DetailsModule, MainPageModule, NewHomeworkModule, HomeworksModule, TeacherNavigationModule],
    declarations: [],
    exports: [],
    providers: []

})
export class TeacherModule { }
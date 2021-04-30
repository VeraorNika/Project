import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// Таблица
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


//Свои компоненты
import { TeacherComponent } from './teacher.component';
import { StudentNavigationModule } from '../navigation/navigation.module';


@NgModule({
    imports: [BrowserModule, CommonModule, MatTooltipModule, MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, StudentNavigationModule],
    declarations: [TeacherComponent],
    exports: [TeacherComponent],
    providers: []
})
export class TeacherModule { }
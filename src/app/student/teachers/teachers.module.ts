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
import { TeachersComponent } from './teachers.component';
import { StudentNavigationModule } from '../navigation/navigation.module';



@NgModule({
    imports: [BrowserModule, CommonModule, MatTooltipModule, MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, StudentNavigationModule],
    declarations: [TeachersComponent],
    exports: [TeachersComponent],
    providers: []
})
export class TeachersModule { }
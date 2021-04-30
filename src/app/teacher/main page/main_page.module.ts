import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Таблица
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


// Свои компоненты
import { TeacherComponent } from './main_page.component';
import { TeacherNavigationModule } from '../navigation/navigation.module';



@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, MatTooltipModule, MatInputModule, CommonModule, MatTableModule, MatSortModule, MatFormFieldModule, TeacherNavigationModule],
    declarations: [TeacherComponent,],
    exports: [RouterModule, TeacherComponent],
    providers: []

})
export class MainPageModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

// Свои компоненты
import { TeacherNavigationModule } from '../navigation/navigation.module';
import { HomeworkDetailsComponent } from './details.component';



@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule, TeacherNavigationModule, MatInputModule, MatTooltipModule],
    declarations: [HomeworkDetailsComponent],
    exports: [RouterModule, HomeworkDetailsComponent],
    providers: []

})
export class DetailsModule { }

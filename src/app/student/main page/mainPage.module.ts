import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {StudentGuard} from '../student.guard';

// Таблица
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

//Свои компоненты
import { StudentComponent } from './main_page.component';
import {StudentNavigationModule} from '../navigation/navigation.module';

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, MatTooltipModule, MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, StudentNavigationModule],
    declarations: [StudentComponent],
    exports: [RouterModule, StudentComponent],
    providers: [StudentGuard]
})
export class MainPageModule { }
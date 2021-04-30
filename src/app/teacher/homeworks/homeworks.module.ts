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


// Для всплывающего окна
import { NewHomeworkComponent } from '../newhomework/newhomework.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DragDropModule } from "@angular/cdk/drag-drop";

//Для редактирования ДЗ


// Свои компоненты
import { TeacherNavigationModule } from '../navigation/navigation.module';
import { HomeworksComponent } from './homeworks.component';


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatTooltipModule, MatInputModule, CommonModule, DragDropModule, MatTableModule, MatSortModule, MatFormFieldModule, TeacherNavigationModule],
    declarations: [HomeworksComponent],
    entryComponents: [NewHomeworkComponent],
    exports: [RouterModule, HomeworksComponent,],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false }, },
    ]

})
export class HomeworksModule { }
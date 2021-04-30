import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Для всплывающего окна
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewHomeworkComponent } from './newhomework.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, MatDialogModule, CommonModule, DragDropModule, MatTooltipModule, MatInputModule, MatFormFieldModule],
    declarations: [NewHomeworkComponent],
    exports: [RouterModule, NewHomeworkComponent],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false }, },]

})
export class NewHomeworkModule { }
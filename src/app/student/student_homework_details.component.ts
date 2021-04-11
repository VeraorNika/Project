import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';



@Component({
    selector: 'student_homework_details',
    template: `<p>Детали домашней работы</p>
    <h4>Предмет: <h4> <br>
    <h4>Дата начала:<h4> <br>
    <h4>Срок сдачи:<h4> <br>
    <h4>Описание: <h4> <br>
    <h4>Пожелания:<h4> <br>
    <button mat-button (click)="dialogRef.close()">Понятно</button>  
    `
})
export class StudentHomeworkDetailsComponent { 
    constructor(public dialogRef: MatDialogRef<StudentHomeworkDetailsComponent>) {};

}
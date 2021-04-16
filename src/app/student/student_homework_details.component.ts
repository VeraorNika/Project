import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';



@Component({
    selector: 'homework-details',
    styleUrls:['../../assets/styles/Popup.css'],
    template: `<div class="main_container" cdkDrag cdkDragRootElement=".cdk-overlay-pane"   cdkDragHandle>
        <h3>Детали домашней работы</h3>
        <h4>Предмет: </h4> <br>
        <h4>Дата начала:</h4> <br>
        <h4>Срок сдачи:</h4> <br>
        <h4>Описание: </h4> <br>
        <h4>Пожелания:</h4> <br>
        <button mat-button (click)="dialogRef.close()">Понятно</button>
        </div>
    `
})
export class HomeworkDetailsComponent { 
    constructor(public dialogRef: MatDialogRef<HomeworkDetailsComponent>) {};

}
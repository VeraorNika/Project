import { Component } from '@angular/core';
import { Teacher, Student } from '../classes/classes';
import { Homework } from '../classes/Homework_class';
import { HomeworkService } from '../services/homework.service'

import {TeacherNewHomeworkComponent} from './teacher_newhomework.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'teacher_homeworks',
    template: `
    <teacher_navigation> </teacher_navigation>
    <button (click)="addHomework()"> Добавить домашнее задание</button>
    <p>Домашние задания: </p>
    <table>
        <thead>
            <tr>
                 <th>Предмет</th> 
                 <th>Домашнее задание</th>
                 <th>Дата начала</th> 
                 <th>Дата окончания</th>
            </tr>
        </thead>
            <tr *ngFor="let homework of homeworks">
                <th>{{homework.subject}} </th>
                <th>{{homework.name}} </th>
                <th>{{homework.startDate}} </th>
                <th>{{homework.deadlineDate}} </th>
            </tr>
   </table>
    
    
    
    `,
    providers: [HomeworkService]
})
export class TeacherHomeworksComponent {
    teacher: Teacher = new Teacher();
    constructor(private homeworkService: HomeworkService, public dialog: MatDialog) { };
    homeworks: Homework[] = [];
    ngOnInit(): void {
        this.homeworkService.getHomeworks().subscribe(data => this.homeworks = data["HomeworksList"]);
        console.log(this.homeworks);

    }
    addHomework(){
        let dialog=this.dialog.open(TeacherNewHomeworkComponent);
        dialog.afterClosed().subscribe(str=> console.log(str));
    }

}
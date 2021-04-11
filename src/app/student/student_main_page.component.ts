import { Component } from '@angular/core';
import {Homework} from '../classes/Homework_class';
import {Teacher, Student} from '../classes/classes';
import {HomeworkService} from '../services/homework.service';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {StudentHomeworkDetailsComponent} from './student_homework_details.component';
@Component({
    selector: 'student',
    template: `<student_navigation> </student_navigation>
    <h3> Мои домашние задания</h3>

    <table>
        <thead>
            <tr>
                <th>Предмет</th> 
                <th>Домашнее задание</th> 
                <th>Срок сдачи </th> 
                <th>Преподаватель </th>
                <th>Статус </th>
               
            </tr>
        </thead>
            <tr *ngFor="let homework of homeworks" (dblclick)="showHomeworkDetails()">
                <th>{{homework.subject}} </th>
                <th>{{homework.name}} </th>
                <th>{{homework.deadlineDate.toLocaleDateString("ru")}}  </th>
                <th>{{homework.teacher}} </th>
                <th title="Нажмите для подтверждения" (click)="changeStatus(homework)">{{homework.status}} </th> <!-- при загрузке определять для каждого дз статус, сравнивая даты и состояния-->
                
            </tr>
   </table>
`,
providers:[HomeworkService]
})
export class StudentComponent { 
    student:Student=new Student();
    constructor(private homeworkService:HomeworkService, public dialog: MatDialog ){}
    homeworks:Homework[]=[];
    ngOnInit(): void {
       let homework:Homework=new Homework();
       homework.name="Дз по матанализу от 19 ноября";
       homework.teacher="Иванов Иван Иванович";
       homework.startDate=new Date(Date.parse("2021-11-04"));
       homework.deadlineDate=new Date(Date.parse("2021-11-15"));
       homework.subject="Math";
       homework.status="Задано";
       homework.isExpired=false;
       this.homeworks.push(homework);
       this.homeworkService.getHomeworks().subscribe(data=> this.homeworks=data["HomeworksList"]);
       console.log(this.homeworks);
    }
    
    showHomeworkDetails(){
        let dialog=this.dialog.open(StudentHomeworkDetailsComponent);
    }
    changeStatus(homework:Homework){
        if (!homework.isExpired){
            if(homework.status=="Задано") {homework.isDone=true; homework.status="Сделано";}
            else {homework.isDone=false; homework.status="Задано";}}
        else alert('Срок сдачи истек. Вы не можете изменить статус задания');
    }

}

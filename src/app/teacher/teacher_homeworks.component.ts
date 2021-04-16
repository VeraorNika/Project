import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Teacher, Student } from '../classes/classes';
import { Homework } from '../classes/Homework_class';
import { HomeworkService } from '../services/homework.service'

import {NewHomeworkComponent} from './teacher_newhomework.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'homeworks',
    styleUrls:['../../assets/styles/MainPage.css'],
    templateUrl:'../../assets/html/teacher/Teacher_homeworks.html',
    providers: [HomeworkService]
})
export class HomeworksComponent {
    
    teacher: Teacher;
    constructor(private homeworkService: HomeworkService, public dialog: MatDialog) { };
    homeworks: Homework[] = [];
    SortedHomeworks = new MatTableDataSource(this.homeworks);

    ngOnInit(): void {
        let homework:Homework=new Homework();
        homework.subject="Math";
        homework.name="ДЗ по матанализу от 19 ноября";
        homework.startDate=new Date(Date.parse("2021-11-04"));
        homework.deadlineDate=new Date(Date.parse("2021-11-15"));
        this.homeworks.push(homework);

        let homework2:Homework=new Homework();
        homework2.subject="Algebra";
        homework2.name="ДЗ по алгебре от 19 ноября";
        homework2.startDate=new Date(Date.parse("2020-11-04"));
        homework2.deadlineDate=new Date(Date.parse("2020-11-15"));
        this.homeworks.push(homework2);
        // this.homeworkService.getHomeworks().subscribe(data => this.homeworks = data["HomeworksList"]);
        console.log(this.homeworks);

    }
    displayedColumns: string[] = ['subject', 'name', 'startDate', 'deadlineDate'];

    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.SortedHomeworks.sort = this.sort;
    }

    addHomework(){
        let dialog=this.dialog.open(NewHomeworkComponent);
        dialog.afterClosed().subscribe(str=> console.log(str));
    }
}
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {map} from 'rxjs/operators';

// Таблица
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

// Необходимые классы
import { Teacher, Student, Homework } from '../classes/classes';

// Сервисы
import { CommonStudentService } from '../services/common.student.service';
import { HomeworkService } from '../services/homework.service';

// firebase
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
    selector: 'student',
    styleUrls: ['./../common_styles/MainPage.css'],
    templateUrl: './Student_main_page.html',
    animations:[trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),],
    providers: [HomeworkService]
})
export class StudentComponent implements AfterViewInit {
    student: Student = new Student();
    
    homeworks: Homework[] = [];
    SortedHomeworks = new MatTableDataSource(this.homeworks);
    
    constructor(private homeworkService: HomeworkService, db: AngularFireDatabase, commonStudentService: CommonStudentService) {
        this.student = commonStudentService.student;
        console.log(this.student);

        this.retrieveHomeworks();
        this.SortedHomeworks=new MatTableDataSource(this.homeworks);
        console.log(this.homeworks);
        
    }
    
    retrieveHomeworks(){
        this.homeworkService.getHomeworks().snapshotChanges().pipe(
            map(changes=>changes.map(c=>({key:c.payload.key, ...c.payload.val()})))

        ).subscribe(data=>{
                data.forEach(item=>{
                // let homework=new Homework();
                // for (let property in item) homework[property]=item[property];
                // this.homeworks.push(homework); 
                this.homeworks.push(item as Homework); 

            })
        });
    }//end of function

    ngOnInit(): void {
        let currentDate: number = new Date().getTime();
        for (let homework of this.homeworks) {
            let deadlineDate: number = new Date(homework.deadlineDate).getTime();
            if (currentDate - deadlineDate > 0 && homework.status == "Задано") {
                homework.status = "Просрочено";
                homework.isExpired = true;
                homework.isDone = false;
            }
        }
    }

    displayedColumns: string[] = ['subject', 'name', 'deadlineDate', 'teacher', 'status'];
    expandedElement: Homework |null;

    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.SortedHomeworks.sort = this.sort;
    }
    showHomeworkDetails() {
        
    }
    changeStatus(homework: Homework) {
        if (new Date().getTime() - new Date(homework.deadlineDate).getTime() > 0) {
            alert('Срок сдачи истёк. Вы не можете изменить статус задания');
        }
        else if (homework.isDone) {
            homework.isDone = false;
            homework.status = "Задано";
        }
        else {
            homework.isDone = true;
            homework.status = "Cделано";
        }
    }

}

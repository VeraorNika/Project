import { AfterViewInit, Component, ViewChild } from '@angular/core';

// Сортировка в таблицах
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Необходимые классы
import { Homework } from '../classes/Homework_class';
import { Teacher, Student } from '../classes/classes';
import { HomeworkService } from '../services/homework.service';

// Всплывающее окно
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeworkDetailsComponent } from './student_homework_details.component';


// firebase
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
    selector: 'student',
    styleUrls: ['../../assets/styles/MainPage.css'],
    templateUrl:'../../assets/html/student/Student_main_page.html',
    providers: [HomeworkService]
})
export class StudentComponent implements AfterViewInit {
    student: Student;
   
    constructor(private homeworkService: HomeworkService, public dialog: MatDialog, db:AngularFireDatabase) {}
    homeworks: Homework[] = [];
    SortedHomeworks = new MatTableDataSource(this.homeworks);
    ngOnInit(): void {
        let homework: Homework = new Homework();
        homework.name = "Дз по матанализу от 19 ноября";
        homework.teacher = "Иванов Иван Иванович";
        homework.startDate = new Date(Date.parse("2021-11-04"));
        homework.deadlineDate = new Date(Date.parse("2021-11-15"));
        homework.subject = "Math";
        homework.status = "Задано";
        homework.isExpired = false;
        
        let homework2: Homework = new Homework();
        homework2.name = "Дз по алгебре от 19 ноября";
        homework2.teacher = "Петров Петр Петрович";
        homework2.startDate = new Date(Date.parse("2020-11-04"));
        homework2.deadlineDate = new Date(Date.parse("2020-11-15"));
        homework2.subject = "Algebra";
        homework2.status = "Сделано";
        homework2.isExpired = true;
        
        this.homeworks.push(homework2);
        this.homeworks.push(homework);

    }

    displayedColumns: string[] = ['subject', 'name', 'deadlineDate', 'teacher', 'status'];

    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.SortedHomeworks.sort = this.sort;
    }
    showHomeworkDetails() {
        let dialog = this.dialog.open(HomeworkDetailsComponent);
    }
    changeStatus(homework: Homework) {
        if (!homework.isExpired) {
            if (homework.status == "Задано") { homework.isDone = true; homework.status = "Сделано"; }
            else { homework.isDone = false; homework.status = "Задано"; }
        }
        else alert('Срок сдачи истек. Вы не можете изменить статус задания');
    }

}

import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
// Таблица
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

// Необходимые классы
import { Student, Homework } from '../../classes/classes';

// Сервисы
import { HomeworkService } from '../../services/homework.service';



@Component({
    selector: 'student',
    styleUrls: ['./../../common_styles/MainPage.css'],
    templateUrl: './main_page.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    providers: [HomeworkService]
})
export class StudentComponent implements OnDestroy {

    student: Student = new Student();
    homeworks: Homework[] = [];
    ObservableHomeworks: Observable<Homework[]>;
    subscription: Subscription;
    @ViewChild(MatSort) sort: MatSort;

    SortedHomeworks: MatTableDataSource<Homework>;
    displayedColumns: string[] = ['subject', 'name', 'deadlineDate', 'teacher', 'status'];
    expandedElement: Homework | null;

    constructor(private homeworkService: HomeworkService) {
        this.student = <Student>JSON.parse(localStorage.getItem('currentStudent'));

        this.ObservableHomeworks = homeworkService.getStudentsHomeworks(this.student.homeworkskey).pipe(
            map(homeworks => homeworks.map(h => ({ key: h.payload.key, ...h.payload.val() }))));

        this.subscription = this.ObservableHomeworks.subscribe(homeworks => {
            this.homeworks = <Homework[]>homeworks;
            for (let homework of this.homeworks) {
                let deadlineDate: number = new Date(homework.deadlineDate).getTime();
                if (new Date().getTime() - deadlineDate > 0 && homework.status == "Задано") {
                    homework.status = "Просрочено";
                    homework.isExpired = true;
                    homework.isDone = false;
                    this.homeworkService.updateStudentHomeworks(this.student.homeworkskey, homework.stud_key, { status: homework.status, isDone: homework.isDone, isExpired: homework.isExpired });
                }
            }
            this.SortedHomeworks = new MatTableDataSource(this.homeworks);
            this.SortedHomeworks.sort = this.sort;
        });
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
        this.homeworkService.updateStudentHomeworks(this.student.homeworkskey, homework.stud_key, { status: homework.status, isDone: homework.isDone, isExpired: homework.isExpired });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.SortedHomeworks.filter = filterValue.trim().toLowerCase();
    }

    // уничтожение подписки
    ngOnDestroy(): void {
        if (this.subscription) { this.subscription.unsubscribe(); }
    }

}

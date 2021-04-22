import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Таблица
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

// Необходимые классы
import { Student, Homework } from '../classes/classes';

// Сервисы
import { HomeworkService } from '../services/homework.service';



@Component({
    selector: 'student',
    styleUrls: ['./../common_styles/MainPage.css'],
    templateUrl: './Student_main_page.html',
    animations: [trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0' })),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),],
    providers: [HomeworkService]
})
export class StudentComponent {
    student: Student = new Student();

    homeworks: Homework[] = [];
    ObservableHomeworks: Observable<Homework[]>;
    SortedHomeworks: MatTableDataSource<Homework>;
    displayedColumns: string[] = ['subject', 'name', 'deadlineDate', 'teacher', 'status'];

    constructor(private homeworkService: HomeworkService) {
        this.student = <Student>JSON.parse(localStorage.getItem('currentStudent'));
        console.log(this.student);
        this.ObservableHomeworks = homeworkService.getHomeworks().pipe(
            map(homeworks => homeworks.map(h => ({ key: h.payload.key, ...h.payload.val() }))));
        this.ObservableHomeworks.subscribe(homeworks => {
            this.homeworks = homeworks;
            for (let homework of this.homeworks) {
                let deadlineDate: number = new Date(homework.deadlineDate).getTime();
                if (new Date().getTime() - deadlineDate > 0 && homework.status == "Задано") {
                    homework.status = "Просрочено";
                    homework.isExpired = true;
                    homework.isDone = false;
                }
            }
            this.SortedHomeworks = new MatTableDataSource(this.homeworks);
             this.SortedHomeworks.sort = this.sort;
        });
    }

    @ViewChild(MatSort) sort: MatSort;
    // ngAfterViewInit(): void { this.SortedHomeworks.sort = this.sort; }

    showHomeworkDetails() { }

    changeStatus(homework: Homework) {
        if (new Date().getTime() - new Date(homework.deadlineDate).getTime() > 75600000) {
            let deadline: Date = new Date(new Date(homework.deadlineDate).getTime());
            console.log("Current time:", new Date());
            console.log("deadline", deadline);
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
        this.homeworkService.update(homework.key, { status: homework.status, isDone: homework.isDone, isExpired: homework.isExpired });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.SortedHomeworks.filter = filterValue.trim().toLowerCase();
    }







}

import { Component, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewHomeworkComponent } from '../newhomework/newhomework.component';
import { map } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';

// Таблица
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Необходимые классы
import { Teacher, Homework } from '../../classes/classes';

//Сервисы
import { HomeworkService } from '../../services/homework.service';


@Component({
    selector: 'homeworks',
    styleUrls: ['./../../common_styles/MainPage.css'],
    templateUrl: './homeworks.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    providers: [HomeworkService]
})
export class HomeworksComponent implements OnDestroy {

    homework:Homework=new Homework();
    teacher: Teacher = new Teacher();
    subscribtion: Subscription;
    homeworks: Homework[] = [];
    expandedElement: Homework | null;
    ObservableHomeworks: Observable<Homework[]>;

    SortedHomeworks: MatTableDataSource<Homework>;
    displayedColumns: string[] = ['subject', 'group', 'name', 'startDate', 'deadlineDate', 'delete'];
    @ViewChild(MatSort) sort: MatSort;

    constructor(private homeworkService: HomeworkService, public dialog: MatDialog, private router: Router) {
        this.homework.group=439;
        this.homework.deadlineDate="";
        this.teacher = JSON.parse(localStorage.getItem('currentTeacher'));
        this.ObservableHomeworks = homeworkService.getMyHomeworks(this.teacher.login).pipe(map(homeworks => homeworks.map(h => ({ key: h.payload.key, ...h.payload.val() }))));

        // создание подписки
        this.subscribtion = this.ObservableHomeworks.subscribe(homeworks => {
            this.homeworks = homeworks;
            this.SortedHomeworks = new MatTableDataSource(this.homeworks);
            this.SortedHomeworks.sort = this.sort;
        });
    }

    updateHomework(homework: Homework) {
        localStorage.setItem('currentHomework', JSON.stringify(homework));
        this.router.navigate(['teacher-main-page/teacher-homeworks/teacher-homework-details']);
    }

    addHomework() {
        let dialog = this.dialog.open(NewHomeworkComponent, {
            height: '650px',
            width: '700px'
        });
    }

    deleteHomework(homework: Homework) {
        if (confirm("Вы уверены, что хотите удалить задание?"))
            this.homeworkService.deleteHomework(homework);
    }

    reuseHomework(homework: Homework, group: number, deadlineDate: string) {
        let homework2 = new Homework();
        for (let property in homework) { homework2[property] = homework[property]; }
        delete homework2["key"];
        homework2.group = group;
        homework2.deadlineDate = deadlineDate;
        this.homeworkService.create(homework2);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.SortedHomeworks.filter = filterValue.trim().toLowerCase();
    }

    // уничтожение подписки
    ngOnDestroy() {
        if (this.subscribtion) { this.subscribtion.unsubscribe() }
    }


}

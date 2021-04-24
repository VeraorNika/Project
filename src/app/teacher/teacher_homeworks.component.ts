import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { NewHomeworkComponent } from './teacher_newhomework.component';
import { map } from 'rxjs/operators';

// Таблица
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Необходимые классы
import { Teacher, Homework } from '../classes/classes';

//Сервисы
import { HomeworkService } from '../services/homework.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'homeworks',
    styleUrls: ['./../common_styles/MainPage.css'],
    templateUrl: './Teacher_homeworks.html',
    providers: [HomeworkService]
})
export class HomeworksComponent  implements OnDestroy{

    teacher: Teacher=new Teacher();
    subscribtion;
    homeworks: Homework[]=[];
    ObservableHomeworks:Observable<Homework[]>;
    SortedHomeworks:MatTableDataSource<Homework>;
    displayedColumns: string[] = ['subject', 'name', 'startDate', 'deadlineDate'];
    @ViewChild(MatSort) sort: MatSort;

    constructor(private homeworkService: HomeworkService, public dialog: MatDialog, private router:Router) {
        this.teacher=JSON.parse(localStorage.getItem('currentTeacher'));
        this.ObservableHomeworks=homeworkService.getHomeworks(this.teacher.login).pipe( map(homeworks => homeworks.map(h => ({ key: h.payload.key, ...h.payload.val() }))));
        // создание подписки
        this.subscribtion=this.ObservableHomeworks.subscribe(homeworks => {
            this.homeworks = homeworks;
            this.SortedHomeworks = new MatTableDataSource(this.homeworks);
            this.SortedHomeworks.sort = this.sort;
            });
     }

    
    updateHomework(homework:Homework){
        localStorage.setItem('currentHomework', JSON.stringify(homework));
        this.router.navigate(['teacher-main-page/teacher-homeworks/teacher-homework-details']);
    }

    addHomework() {
        let dialog = this.dialog.open(NewHomeworkComponent, {

            height:'650px',
            width:'700px'
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.SortedHomeworks.filter = filterValue.trim().toLowerCase();
    }
    // уничтожение подписки
    ngOnDestroy(){
        if(this.subscribtion){this.subscribtion.unsubscribe()}
    }
}

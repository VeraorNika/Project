import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Таблица
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Необходимые классы
import { Teacher, Student } from '../classes/classes';

// Сервисы
import { TeacherService } from '../services/teacher.service';

@Component({
    selector: 'teachers',
    styleUrls: ['./../common_styles/MainPage.css'],
    templateUrl: './Student_teachers.html',
    providers: [TeacherService]
})
export class TeachersComponent implements OnDestroy, OnInit {

    student: Student = new Student();
    subscription;
    teachers: Teacher[] = [];
    dataSource = new MatTableDataSource<Teacher>();
    ObservableTeachers: Observable<Teacher[]>;
    displayedColumns: string[] = ['fullName', 'degree'];

    constructor(private teacherService: TeacherService) {
        this.student = JSON.parse(localStorage.getItem('currentStudent'));
        this.ObservableTeachers = teacherService.getAllTeachers();
        // создание подписки
        this.subscription = this.ObservableTeachers.subscribe(data => this.teachers = data);
    }

    @ViewChild(MatSort) sort: MatSort;
    ngOnInit(): void {
        this.ObservableTeachers.subscribe(teachers => {
            this.dataSource.data = teachers;
            this.dataSource.sort = this.sort;
        })

    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnDestroy(): void {
        if (this.subscription) { this.subscription.unsubscribe();}
    }

}
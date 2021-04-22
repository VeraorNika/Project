import { Component, ViewChild } from '@angular/core';
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
export class TeachersComponent {

    student: Student = new Student();

    teachers: Teacher[] = [];
    dataSource = new MatTableDataSource<Teacher>();
    ObservableTeachers: Observable<Teacher[]>;
    displayedColumns: string[] = ['fullName', 'degree'];

    constructor(private teacherService: TeacherService) {
        this.student = JSON.parse(localStorage.getItem('currentStudent'));
        console.log(this.student);
        this.ObservableTeachers = teacherService.getAllTeachers();
        this.ObservableTeachers.subscribe(data => this.teachers = data);
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

}
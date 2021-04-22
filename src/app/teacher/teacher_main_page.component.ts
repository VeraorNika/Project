import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

//Таблица
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Необходимые классы
import { Teacher, Student } from '../classes/classes';

// firebase и сервисы
import { StudentService } from '../services/student.service';

@Component({
    selector: 'teacher',
    styleUrls: ['./../common_styles/MainPage.css'],
    templateUrl: './Teacher_main_page.html',
    providers: [StudentService]
})
export class TeacherComponent {

    teacher: Teacher = new Teacher();

    students: Student[] = [];
    ObservableStudents: Observable<Student[]>;
    SortedStudents: MatTableDataSource<Student>;
    displayedColumns: string[] = ['fullName', 'group'];
    @ViewChild(MatSort) sort: MatSort;
    constructor(private studentService: StudentService) {

        this.teacher = JSON.parse(localStorage.getItem('currentTeacher'));
        console.log(this.teacher);
        this.ObservableStudents = studentService.getAllStudents();
        this.ObservableStudents.subscribe(data => {
            this.students = data;
            this.SortedStudents = new MatTableDataSource(this.students);
            this.SortedStudents.sort = this.sort;
        });
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.SortedStudents.filter = filterValue.trim().toLowerCase();
    }

}


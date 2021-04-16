import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Teacher, Student } from '../classes/classes';
import { StudentService } from '../services/student.service';

// firebase
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
    selector: 'teacher',
    styleUrls: ['../../assets/styles/MainPage.css'],
    templateUrl: '../../assets/html/teacher/Teacher_main_page.html',
    providers: [StudentService]
})
export class TeacherComponent implements OnInit {
    teacher: Teacher = new Teacher();

    constructor(private studentService: StudentService) { }
    students: Student[] = [];
    SortedStudents: any;

    ngOnInit(): void {
        this.students = this.studentService.getStudents();
        this.SortedStudents = new MatTableDataSource(this.students);
        console.log("В компоненте: ", this.students);

    }

    displayedColumns: string[] = ['fullName', 'group'];

    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.SortedStudents.sort = this.sort;
    }
}


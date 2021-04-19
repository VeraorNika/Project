import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Teacher, Student } from '../classes/classes';


// firebase и сервисы
import { StudentService } from '../services/student.service';
import { CommonTeacherService } from '../services/common.teacher.service';
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
    selector: 'teacher',
    styleUrls: ['./../common_styles/MainPage.css'],
    templateUrl: './Teacher_main_page.html',
    providers: [StudentService]
})
export class TeacherComponent implements OnInit {
    teacher: Teacher = new Teacher();
    
    constructor(private studentService: StudentService, commonTeacherService: CommonTeacherService) {
      this.teacher=commonTeacherService.teacher;
      console.log(this.teacher);
    }
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


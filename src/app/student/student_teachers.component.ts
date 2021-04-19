import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {Teacher, Student} from '../classes/classes';

// Сервисы
import {TeacherService} from '../services/teacher.service';
import {CommonStudentService} from '../services/common.student.service';

import  * as moment from 'moment';
@Component({
    selector: 'teachers',
    styleUrls:['./../common_styles/MainPage.css'],
    templateUrl:'./Student_teachers.html',
     providers:[TeacherService]
})
export class TeachersComponent { 
    student:Student=new Student();

    constructor(private teacherService: TeacherService, commonStudentService:CommonStudentService ){
        this.student=commonStudentService.student;
        console.log(this.student);
    }
    teachers:Teacher[]=[];
    SortedTeachers:any; 
    
    ngOnInit(): void {
        
        this.teachers=this.teacherService.getTeachers();
        this.SortedTeachers=new MatTableDataSource(this.teachers);

        // console.log("В компоненте:", this.teachers);  
    }
    
    displayedColumns: string[] = ['fullName', 'degree'];

        @ViewChild(MatSort) sort: MatSort;

        ngAfterViewInit() {
            this.SortedTeachers.sort = this.sort;
        }



}
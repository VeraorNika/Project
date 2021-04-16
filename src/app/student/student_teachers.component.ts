import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Teacher, Student} from '../classes/classes';
import {TeacherService} from '../services/teacher.service';

@Component({
    selector: 'teachers',
    styleUrls:['../../assets/styles/MainPage.css'],
    templateUrl:'../../assets/html/student/Student_teachers.html',
     providers:[TeacherService]
})
export class TeachersComponent { 
    student:Student=new Student();

    constructor(private teacherService: TeacherService ){}
    teachers:Teacher[]=[];
    SortedTeachers:any; 
    
    ngOnInit(): void {
        // let teacher:Teacher={fullName:"Сидоров Сидор"};
        // this.teachers.push(teacher);
        // let teacher2:Teacher={fullName:"Иванов Иван"};
        // this.teachers.push(teacher2);
        this.teachers=this.teacherService.getTeachers();
        this.SortedTeachers=new MatTableDataSource(this.teachers);
        console.log("В компоненте:", this.teachers);  
    }
    
    displayedColumns: string[] = ['fullName'];

        @ViewChild(MatSort) sort: MatSort;

        ngAfterViewInit() {
            this.SortedTeachers.sort = this.sort;
        }



}
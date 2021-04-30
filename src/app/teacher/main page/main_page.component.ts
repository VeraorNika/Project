import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

//Таблица
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Необходимые классы
import { Teacher } from '../../classes/classes';
import { HomeworksOfStudents } from '../../classes/interfaces';

// firebase и сервисы
import { HomeworkService } from '../../services/homework.service';

interface OneHomework {
    fullName: string;
    group: number;
    subject: string;
    status: string;
    isDone: boolean;
    isExpired: boolean;
    name: string;
}

@Component({
    selector: 'teacher',
    styleUrls: ['./../../common_styles/MainPage.css'],
    templateUrl: './main_page.html',
    providers: [HomeworkService]
})
export class TeacherComponent implements OnDestroy, OnInit {

    teacher: Teacher = new Teacher();
    subscription: Subscription;

    studentsandhomeworks: OneHomework[] = [];
    ObservableStudents: Observable<HomeworksOfStudents[]>;

    SortedStudents: MatTableDataSource<OneHomework>;
    displayedColumns: string[] = ['group', 'fullName', 'subject', 'homework', 'status'];
    @ViewChild(MatSort) sort: MatSort;

    constructor(private homeworkService: HomeworkService) {

        this.teacher = <Teacher>JSON.parse(localStorage.getItem('currentTeacher'));
        this.ObservableStudents = this.homeworkService.getAllHomeworks();
        this.subscription = this.ObservableStudents.subscribe(students => {
            for (let student of students) {
                for (let item in student.homeworks) {
                    if (student.homeworks[item].teacher_login === this.teacher.login) {
                        let currentDate:number = new Date().getTime();
                        let deadline:number = new Date(student.homeworks[item].deadlineDate).getTime();
                        if ((currentDate > deadline) && (student.homeworks[item].status == "Задано")) {
                            student.homeworks[item].status = "Просрочено";
                            student.homeworks[item].isDone = false;
                            student.homeworks[item].isExpired = true;
                        }
                        this.studentsandhomeworks.push({ fullName: student.fullName, group: student.group, subject: student.homeworks[item].subject, isDone: student.homeworks[item].isDone, isExpired: student.homeworks[item].isExpired, name: student.homeworks[item].name, status: student.homeworks[item].status, });
                    }
                }
            }
            this.SortedStudents = new MatTableDataSource(this.studentsandhomeworks);
            this.SortedStudents.sort = this.sort;
        })

        // this.ObservableStudents=this.homeworkService.getAllStudentsHomeworks();
        // this.subscription=this.ObservableStudents.pipe(take(1)).subscribe(data=>{//data[i] -объект студента с его домашками
        //     for (let i=0; i<data.length; i++){
        //         for (let item in data[i]["homeworks"])//item - объект домашки из "массива" домашек (который перестал быть массивом и стал просто объектом)
        //         {
        //             if(data[i].homeworks[item].teacher_login==this.teacher.login){
        //                 let currentDate=new Date().getTime();
        //                 let deadline= new Date(data[i].homeworks[item].deadlineDate).getTime();
        //                 if ((currentDate > deadline) && (data[i].homeworks[item].status=="Задано") ){  data[i].homeworks[item].status="Просрочено"; data[i].homeworks[item].isDone=false; data[i].homeworks[item].isExpired=true;};
        //                  this.studentsandhomeworks.push({fullName:data[i].fullName, group: data[i].group, subject:data[i].homeworks[item].subject, homework: data[i].homeworks[item].name, status:data[i].homeworks[item].status, isExpired:data[i].homeworks[item].isExpired, isDone: data[i].homeworks[item].isDone});
        //             }

        //         }    
        //     }
        //     this.SortedStudents = new MatTableDataSource(this.studentsandhomeworks);
        //     this.SortedStudents.sort = this.sort;

        // })

    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.SortedStudents.filter = filterValue.trim().toLowerCase();
    }
    ngOnInit(): void {

    }
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}


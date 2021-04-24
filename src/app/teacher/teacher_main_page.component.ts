import { Component, ViewChild, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

//Таблица
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Необходимые классы
import { Teacher} from '../classes/classes';

// firebase и сервисы
import { HomeworkService } from '../services/homework.service';

@Component({
    selector: 'teacher',
    styleUrls: ['./../common_styles/MainPage.css'],
    templateUrl: './Teacher_main_page.html',
    providers: [HomeworkService]
})
export class TeacherComponent implements OnDestroy, OnInit{

    teacher: Teacher = new Teacher();
    subscription;
    studentsandhomeworks = [];
    ObservableStudents: Observable<any[]>;
    SortedStudents: MatTableDataSource<any>;
    displayedColumns: string[] = ['group','fullName', 'subject', 'homework', 'status'];
    @ViewChild(MatSort) sort: MatSort;
    constructor(private homeworkService: HomeworkService) {

        this.teacher = <Teacher>JSON.parse(localStorage.getItem('currentTeacher'));

        this.ObservableStudents=this.homeworkService.getAllStudentsHomeworks();
        this.subscription=this.ObservableStudents.pipe(take(1)).subscribe(data=>{//data[i] -объект студента с его домашками
            for (let i=0; i<data.length; i++){
                for (let item in data[i]["homeworks"])//item - объект домашки из "массива" домашек (который перестал быть массивом и стал просто объектом)
                {
                    if(data[i].homeworks[item].teacher_login==this.teacher.login){
                        let currentDate=new Date().getTime();
                        let deadline= new Date(data[i].homeworks[item].deadlineDate).getTime();
                        if ((currentDate > deadline) && (data[i].homeworks[item].status=="Задано") ){  data[i].homeworks[item].status="Просрочено"; data[i].homeworks[item].isDone=false; data[i].homeworks[item].isExpired=true;};
                         this.studentsandhomeworks.push({fullName:data[i].fullName, group: data[i].group, subject:data[i].homeworks[item].subject, homework: data[i].homeworks[item].name, status:data[i].homeworks[item].status, isExpired:data[i].homeworks[item].isExpired, isDone: data[i].homeworks[item].isDone});
                    }
                    
                }    
            }
            this.SortedStudents = new MatTableDataSource(this.studentsandhomeworks);
            this.SortedStudents.sort = this.sort;

        })

    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.SortedStudents.filter = filterValue.trim().toLowerCase();
    }
    ngOnInit(): void {
        
    }
    ngOnDestroy(): void {
        if (this.subscription){
            this.subscription.unsubscribe();
        }
    }

}


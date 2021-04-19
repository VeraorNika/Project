import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Teacher, Homework } from '../classes/classes';
import {Router} from '@angular/router';
import { NewHomeworkComponent } from './teacher_newhomework.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
//Сервисы
import { CommonTeacherService } from '../services/common.teacher.service';
import { HomeworkService } from '../services/homework.service';
@Component({
    selector: 'homeworks',
    styleUrls: ['./../common_styles/MainPage.css'],
    templateUrl: './Teacher_homeworks.html',
    providers: [HomeworkService]
})
export class HomeworksComponent implements AfterViewInit {

    teacher: Teacher=new Teacher();
    homeworks?: Homework[]=[];
    SortedHomeworks = new MatTableDataSource(this.homeworks);
    constructor(private homeworkService: HomeworkService, public dialog: MatDialog, private commonTeacherService: CommonTeacherService, private router:Router) {
        this.teacher=commonTeacherService.teacher;
        this.retrieveHomeworks();
        this.SortedHomeworks=new MatTableDataSource(this.homeworks);
        console.log("После вызова конструктора", this.homeworks);
     };

     retrieveHomeworks(){
        this.homeworkService.getHomeworks().snapshotChanges().forEach(homeworksSnapshot=>{
            homeworksSnapshot.forEach(homeworkSnapshot=>{
                let item:any =homeworkSnapshot.payload.toJSON();
                item.key=homeworkSnapshot.key;
                let homework=new Homework();
                // Изменение! Было по-другому! мы просто помещали аргумент item as Homework, а homework не создавался
                for (let property in item){homework[property]=item[property]}
                this.homeworks.push(homework);
            })

        })
    }
    
    ngOnInit(): void {
        
    }
    SortedHomeworks = new MatTableDataSource(this.homeworks);
    updateHomework(element:Homework){
        this.commonTeacherService.setHomework(element);
        this.router.navigate(['teacher-main-page/teacher-homeworks/teacher-homework-details'])
    }
    displayedColumns: string[] = ['subject', 'name', 'startDate', 'deadlineDate'];

    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.SortedHomeworks.sort = this.sort;
    }

    addHomework() {
        let dialog = this.dialog.open(NewHomeworkComponent);
        dialog.afterClosed().subscribe(str => console.log(str));
    }
}

// retrieveHomeworks(): void {
    //     this.homeworkService.getHomeworks().snapshotChanges().pipe(
    //         map(changes =>
    //             changes.map(c =>
    //                 ({ key: c.payload.key, ...c.payload.val() })))
    //     ).subscribe(data => { this.homeworks = data; });

    // }

    // getCategories(){
    //     this.aflCategories = this.db.list('/categories', category => category.orderByChild('name'));
    //     return this.aflCategories
    //     .snapshotChanges()
    //     .pipe(map(changes => changes
    //     .map(c => ({ key: c.payload.key, ...c.payload.val() }))));
    //   }

    // retrieveHomeworks(): void {
    //     this.homeworkService.getHomeworks().snapshotChanges().subscribe(
    //         list => {
    //             this.homeworks = list.map(item => {
    //                 return {
    //                     key: item.key, ...item.payload.val()
    //                 };
    //             });

    //         }
    //     )
    // }
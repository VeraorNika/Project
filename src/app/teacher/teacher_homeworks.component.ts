import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Teacher, Homework } from '../classes/classes';
import { HomeworkService } from '../services/homework.service'
import { map } from 'rxjs/operators';
import { NewHomeworkComponent } from './teacher_newhomework.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'homeworks',
    styleUrls: ['../../assets/styles/MainPage.css'],
    templateUrl: '../../assets/html/teacher/Teacher_homeworks.html',
    providers: [HomeworkService]
})
export class HomeworksComponent implements AfterViewInit {

    teacher: Teacher;
    homeworks?: Homework[]=[];
    SortedHomeworks = new MatTableDataSource(this.homeworks);
    constructor(private homeworkService: HomeworkService, public dialog: MatDialog) {
        this.retrieveHomeworks();
        this.SortedHomeworks=new MatTableDataSource(this.homeworks);
        console.log("После вызова конструктора", this.homeworks);
        
     };

     retrieveHomeworks(){
        this.homeworkService.getHomeworks().snapshotChanges().forEach(homeworksSnapshot=>{
            homeworksSnapshot.forEach(homeworkSnapshot=>{
                let homework:any =homeworkSnapshot.payload.toJSON();
                homework.key=homeworkSnapshot.key;
                this.homeworks.push(homework as Homework);
            })

        })
    }
    
    ngOnInit(): void {
        
    }
    SortedHomeworks = new MatTableDataSource(this.homeworks);
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
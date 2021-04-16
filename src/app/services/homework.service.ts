import { Homework } from '../classes/classes';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeworkService {

    // Путь к массиву домашек   
    private dbPath = '/homeworks';
    homeworksRef: AngularFireList<Homework>;
    constructor(private db: AngularFireDatabase) {
        this.homeworksRef = db.list(this.dbPath);
    }

    getHomeworks(): AngularFireList<Homework> {
        return this.homeworksRef;
    }

    create(homework: Homework): any {
        return this.homeworksRef.push(homework);
    }
    //  Обновляет не все данные, а только несколько ключей
    update(key: string, value: any): Promise<void> {
        return this.homeworksRef.update(key, value);
    }
}



// getHomeworks() : Observable<Homework[]> {
    //         return this.http.get('./homeworks.json').pipe(map(data=>{
    //             let HomeworksList = data["HomeworksList"];
    //             return HomeworksList.map(function(homework:any) 
    //             {
    //                 let newHomework=new Homework();
    //                 newHomework.name=homework.name;
    //                 newHomework.description=homework.description; 
    //                 newHomework.teacher=homework.teacher; 
    //                 newHomework.startDate=homework.startDate; 
    //                 newHomework.deadlineDate=homework.deadlineDate;
    //                 newHomework.subject=homework.subject;
    //                 return newHomework;   


    //             });
    //         }));

    // }
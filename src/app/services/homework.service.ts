import { Homework } from '../classes/classes';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Injectable()
export class HomeworkService {

    // Путь к массиву домашек   
    private dbPath = '/homeworks';
    homeworksRef: AngularFireList<Homework>;
    constructor(private db: AngularFireDatabase) {
        // Изменения: <Homework > не было
        this.homeworksRef = db.list<Homework>(this.dbPath);
    }

    
    getHomeworks(){
        return this.homeworksRef.snapshotChanges();
    }
   
    create(homework: Homework): any {
        return this.homeworksRef.push(homework);
    }
    update(key: string, value: any) {
        return this.homeworksRef.update(key, value);
    }
}

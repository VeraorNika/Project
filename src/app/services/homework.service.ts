import { Homework } from '../classes/classes';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import  * as moment from 'moment';
@Injectable()
export class HomeworkService {

    // Путь к массиву домашек   
    private dbPath = '/homeworks';
    homeworksRef: AngularFireList<Homework>;
    constructor(private db: AngularFireDatabase) {
        // Изменения: <Homework не было>
        this.homeworksRef = db.list<Homework>(this.dbPath);
    }

    getHomeworks(): AngularFireList<Homework> {
        return this.homeworksRef;
    }

    create(homework: Homework): any {
        return this.homeworksRef.push(homework);
    }
    //  Обновляет не все данные, а только несколько ключей
    update(key: string, value: any) {
        return this.homeworksRef.update(key, value);
    }
}

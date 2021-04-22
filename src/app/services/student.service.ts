import { Student } from '../classes/classes';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import * as moment from 'moment';
@Injectable()
export class StudentService {

    studentsRef: AngularFireList<Student>;
    constructor(private db: AngularFireDatabase) { this.studentsRef = db.list('students'); }

     // Доп. обработка в компоненте.  Так как изменения не планируются, snapshotchanges не нужен
    getAllStudents() { return this.studentsRef.valueChanges(); }




}
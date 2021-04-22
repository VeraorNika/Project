import { Teacher } from '../classes/classes';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import * as moment from 'moment';
@Injectable()
export class TeacherService {

    teachersRef: AngularFireList<Teacher>;
    constructor(private db: AngularFireDatabase) { this.teachersRef = db.list('teachers'); }
    
    // Доп. обработка в компоненте.  Так как изменения не планируются, snapshotchanges не нужен
    getAllTeachers() { return this.teachersRef.valueChanges(); }


}
import { Teacher } from '../classes/classes';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Injectable()
export class TeacherService {

    teachersRef: AngularFireList<Teacher>;
    constructor(private db: AngularFireDatabase) { this.teachersRef = db.list('teachers'); }
    
    getAllTeachers() { return this.teachersRef.valueChanges(); }

}
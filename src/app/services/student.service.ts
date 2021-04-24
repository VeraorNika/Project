import { Student } from '../classes/classes';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Injectable()
export class StudentService {

    studentsRef: AngularFireList<Student>;
    constructor(private db: AngularFireDatabase) { this.studentsRef = db.list('students'); }

    getAllStudents() { return this.studentsRef.valueChanges(); }

}
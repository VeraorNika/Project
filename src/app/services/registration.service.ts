import { Teacher, Student } from '../classes/classes';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import {AuthorizationService} from './authorization.service';
import { Observable } from 'rxjs';
@Injectable()
export class RegistrationService {

    teachersRef: AngularFireList<Teacher>;
    studentsRef: AngularFireList<Student>;
    constructor(private db: AngularFireDatabase, private authorizationService: AuthorizationService) {
    }

    // Метод внутри работает асинхронно, поэтому возвращается всегда ноль. Исправть
    getStudentsbyLogin(login:string): Observable<any>{
         return this.db.list('/students', ref => ref.orderByChild('login').equalTo(login)).valueChanges();
    };
    getTeachersbyLogin(login:string): Observable<any>{
         return this.db.list('/teachers', ref => ref.orderByChild('login').equalTo(login)).valueChanges();
    };


    createStudent(student: Student): any {
        this.studentsRef = this.db.list('/students');
        this.studentsRef.push(student);
        this.authorizationService.enterStudent(student.login, student.password);

    }

    createTeacher(teacher: Teacher): any {
        this.teachersRef = this.db.list('/teachers');
        this.teachersRef.push(teacher);
        this.authorizationService.enterTeacher(teacher.login, teacher.password);
    }

}



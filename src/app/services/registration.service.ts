import { Teacher, Student } from '../classes/classes';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import {AuthorizationService} from './authorization.service';
@Injectable()
export class RegistrationService {

    teachersRef: AngularFireList<Teacher>;
    studentsRef: AngularFireList<Student>;
    constructor(private db: AngularFireDatabase, private authorizationService: AuthorizationService) {
    }

    // Метод внутри работает асинхронно, поэтому возвращается всегда ноль. Исправть
    ifLoginExists(login: string, isStudent: boolean): number {
        let counter: number = 0;
        let studentsRef: AngularFireList<Student> = this.db.list('/students', ref => ref.orderByChild('login').equalTo(login));
        studentsRef.snapshotChanges().subscribe(item => { item.forEach(element => { counter++; console.log("В процессе проверки ", counter); }); });
        console.log("После проверки ", counter);
        return counter;
    }//end of ifLoginexists


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



import { Teacher, Student, Homework } from '../classes/classes';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import {AuthorizationService} from './authorization.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class RegistrationService {

    teachersRef: AngularFireList<Teacher>;
    studentsRef: AngularFireList<Student>;
    homeworksOfStudentsRef;
    homeworksRef:AngularFireList<Homework>;
    subscription;

    constructor(private db: AngularFireDatabase, private authorizationService: AuthorizationService) {}

    getStudentsbyLogin(login:string): Observable<any>{
         return this.db.list('/students', ref => ref.orderByChild('login').equalTo(login)).valueChanges();
    };
    getTeachersbyLogin(login:string): Observable<any>{
         return this.db.list('/teachers', ref => ref.orderByChild('login').equalTo(login)).valueChanges();
    };


    createStudent(student: Student): any {

        this.studentsRef = this.db.list('/students');

        // Создание локальных копий всех домашек студента группы
        this.homeworksOfStudentsRef=this.db.list('/homeworksOfStudents');
        this.homeworksRef=this.db.list('/homeworks', ref=> ref.orderByChild('group').equalTo(student.group));
        // создание подписки
        this.subscription= this.homeworksRef.snapshotChanges().pipe(map(homeworks => homeworks.map(h => ({ key: h.payload.key, ...h.payload.val() })))).subscribe(serverhomeworks=>{
            let newRef=this.homeworksOfStudentsRef.push({fullName: student.fullName, group:student.group});
            this.homeworksOfStudentsRef.update(newRef.key, {student_key:newRef.key});
            let temporaryhomeworksRef=this.db.list(`homeworksOfStudents/${newRef.key}/homeworks`);
            for (let i=0; i<serverhomeworks.length; i++){
                let uniquekey =temporaryhomeworksRef.push(serverhomeworks[i]).key;
                temporaryhomeworksRef.update(uniquekey, {stud_key:uniquekey});
                }
            student.homeworkskey=newRef.key;
            this.studentsRef.push(student);
            this.authorizationService.enterStudent(student.login, student.password); 
        });
    }

    createTeacher(teacher: Teacher): any {
        this.teachersRef = this.db.list('/teachers');
        this.teachersRef.push(teacher);
        this.authorizationService.enterTeacher(teacher.login, teacher.password);
    }
    // уничтожение подписки
    ngOnDestroy(): void {
        if (this.subscription){this.subscription.unsubscribe();}
    }

}



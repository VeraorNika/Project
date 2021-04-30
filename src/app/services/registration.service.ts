import { Teacher, Student, Homework } from '../classes/classes';
import { HomeworksOfStudents } from '../classes/interfaces';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AuthorizationService } from './authorization.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class RegistrationService {

    teachersRef: AngularFireList<Teacher>;
    studentsRef: AngularFireList<Student>;
    homeworksOfStudentsRef: AngularFireList<HomeworksOfStudents>;
    homeworksRef: AngularFireList<Homework>;
    subscription: Subscription;

    constructor(private db: AngularFireDatabase, private authorizationService: AuthorizationService) { }

    getStudentsbyLogin(login: string): Observable<Student[]> {
        return this.db.list<Student>('/students', ref => ref.orderByChild('login').equalTo(login)).valueChanges();
    };
    getTeachersbyLogin(login: string): Observable<Teacher[]> {
        return this.db.list<Teacher>('/teachers', ref => ref.orderByChild('login').equalTo(login)).valueChanges();
    };


    createStudent(student: Student): any {

        this.studentsRef = this.db.list('/students');


        this.homeworksOfStudentsRef = this.db.list<HomeworksOfStudents>('/homeworksOfStudents');
        this.homeworksRef = this.db.list<Homework>('/homeworks', ref => ref.orderByChild('group').equalTo(student.group));

        // создание подписки
        this.subscription = this.homeworksRef.snapshotChanges().pipe(map(homeworks => homeworks.map(h => ({ key: h.payload.key, ...h.payload.val() })))).subscribe(serverhomeworks => {
            let newRef = this.homeworksOfStudentsRef.push({ fullName: student.fullName, group: student.group });
            this.homeworksOfStudentsRef.update(newRef.key, { student_key: newRef.key });
            let temporaryhomeworksRef: AngularFireList<Homework> = this.db.list<Homework>(`homeworksOfStudents/${newRef.key}/homeworks`);
            for (let i = 0; i < serverhomeworks.length; i++) {
                let uniquekey: string = temporaryhomeworksRef.push(serverhomeworks[i]).key;
                temporaryhomeworksRef.update(uniquekey, { stud_key: uniquekey });
            }
            student.homeworkskey = newRef.key;
            this.studentsRef.push(student);
            this.authorizationService.enterStudent(student.login, student.password);
        });
    }

    createTeacher(teacher: Teacher): any {
        this.teachersRef = this.db.list<Teacher>('/teachers');
        this.teachersRef.push(teacher);
        this.authorizationService.enterTeacher(teacher.login, teacher.password);
    }
    // уничтожение подписки
    ngOnDestroy(): void {
        if (this.subscription) { this.subscription.unsubscribe(); }
    }

}



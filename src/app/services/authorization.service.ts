import { Teacher, Student } from '../classes/classes';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthorizationService implements OnDestroy {
    
    teachersRef: AngularFireList<Teacher>;
    teachers: Teacher[] = [];
    subscription;
    constructor(private db: AngularFireDatabase, private router: Router) { }

    enterStudent(login: string, password: string): void {
        let studentsRef: AngularFireList<Student> = this.db.list('/students', ref => ref.orderByChild('login').equalTo(login));

        // подписка на изменения
        this.subscription = studentsRef.snapshotChanges().pipe(map(students => students.map(s => ({ key: s.payload.key, ...s.payload.val() })))).subscribe(students => {
            if (students.length == 0) { alert('Такого пользователя не существует!'); }
            else {
                    // let student:Student=<Student>students[0]; //Сделать копию или оставить так, как ниже?
                    let student: Student = <Student>JSON.parse(JSON.stringify(students[0]));
                    if (student.password != password) { alert('Неправильный пароль'); }
                    else {
                        localStorage.setItem('currentStudent', JSON.stringify(student));
                        localStorage.setItem('isStudentLogged', 'true');
                        this.router.navigate(['/student-main-page/']);
                        }
                 }
        })//subscribe
    }//end of enterStudent

    enterTeacher(login: string, password: string): void {
        let teachersRef: AngularFireList<Teacher> = this.db.list('/teachers', ref => ref.orderByChild('login').equalTo(login));

        this.subscription = teachersRef.snapshotChanges().pipe(map(teachers => teachers.map(t => ({ key: t.payload.key, ...t.payload.val() })))).subscribe(teachers => {
            if (teachers.length == 0) { alert('Такого пользователя не существует!'); }
            else {
                    // let teacher:Teacher=<Teacher>teachers[0]; //Сделать копию или оставить так,  как ниже
                    let teacher: Teacher = <Teacher>JSON.parse(JSON.stringify(teachers[0]));
                    if (teacher.password != password) { alert('Неправильный пароль'); }
                    else {
                        localStorage.setItem('currentTeacher', JSON.stringify(teacher));
                        localStorage.setItem('isTeacherLogged', 'true');
                        this.router.navigate(['/teacher-main-page/']);
                    }
                }
        })//subscribe
    }//end of enterTeacher

    // отписка от изменений
    ngOnDestroy(): void {
        if (this.subscription) { this.subscription.unsubscribe(); }
    }

}//end of class

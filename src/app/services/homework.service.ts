import { Homework } from '../classes/classes';
import { HomeworksOfStudents } from '../classes/interfaces';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable()
export class HomeworkService implements OnDestroy {

    private dbPath: string = '/homeworks';
    homeworksRef: AngularFireList<Homework>;
    studenthomeworksRef: AngularFireList<Homework>;
    allStudentsHomeworksRef: AngularFireList<HomeworksOfStudents>;
    subscription: Subscription;
    subscription2: Subscription;
    subscription3: Subscription;
    subscription4: Subscription;

    constructor(private db: AngularFireDatabase, private router: Router) {
        this.homeworksRef = db.list<Homework>(this.dbPath);
    }

    // Функционал преподавателя

    // Домашки, созданные преподавателем
    getMyHomeworks(login: string) {
        return this.db.list<Homework>(`/homeworks`, ref => ref.orderByChild('teacher_login').equalTo(login)).snapshotChanges();
    }

    // Создать домашку (и ее локальные копии для всех студентов группы)
    create(homework: Homework) {
        let hkey = this.homeworksRef.push(homework);
        this.homeworksRef.update(hkey.key, { key: hkey.key });
        homework.key = hkey.key;
        let temporaryRef: AngularFireList<HomeworksOfStudents> = this.db.list('/homeworksOfStudents', ref => ref.orderByChild('group').equalTo(homework.group));
        this.subscription = temporaryRef.valueChanges().pipe(take(1)).subscribe(data => {
            for (let i = 0; i < data.length; i++) {
                let newRef = this.db.list(`/homeworksOfStudents/${data[i].student_key}/homeworks`).push(homework);
                this.db.list(`/homeworksOfStudents/${data[i].student_key}/homeworks`).update(newRef.key, { stud_key: newRef.key });
            }
        });
    }
    // Обновить домашку и ее локальные копии для всех студентов группы
    update(key: string, group: number, value: any) {
        this.homeworksRef.update(key, value);
        let temporaryhomeworksRef: AngularFireList<HomeworksOfStudents> = this.db.list('/homeworksOfStudents', ref => ref.orderByChild('group').equalTo(group)); //выбрали всех студентов с той же группой
        this.subscription = temporaryhomeworksRef.valueChanges().pipe(take(1)).subscribe(data => {//это массив всех студентов
            for (let i = 0; i < data.length; i++) {
                let temporaryRef: AngularFireList<Homework> = this.db.list(`/homeworksOfStudents/${data[i].student_key}/homeworks`, ref => ref.orderByChild('key').equalTo(key));
                this.subscription2 = temporaryRef.valueChanges().pipe(take(1)).subscribe(data2 => {
                    let homework: Homework = data2[0];
                    this.db.list(`/homeworksOfStudents/${data[i].student_key}/homeworks`).update(homework.stud_key, value);
                });
            }
            this.router.navigate(['teacher-main-page/teacher-homeworks'])

        })
    }

    deleteHomework(homework: Homework) {
        let key = homework.key;
        let group = homework.group;
        this.db.list('/homeworks').remove(homework.key);
        let temporaryhomeworksRef: AngularFireList<HomeworksOfStudents> = this.db.list('/homeworksOfStudents', ref => ref.orderByChild('group').equalTo(group)); //выбрали всех студентов с той же группой
        this.subscription3 = temporaryhomeworksRef.valueChanges().pipe(take(1)).subscribe(data => {//это массив всех студентов
            for (let i = 0; i < data.length; i++) {
                let temporaryRef: AngularFireList<Homework> = this.db.list(`/homeworksOfStudents/${data[i].student_key}/homeworks`, ref => ref.orderByChild('key').equalTo(key));//Это локальная копия домашки, так как ее key совпадает с заданным key
                this.subscription4 = temporaryRef.valueChanges().pipe(take(1)).subscribe(data2 => {
                    let deletedhomework: Homework = data2[0]; //хотя это List, на самом деле домашка единственная
                    this.db.list(`/homeworksOfStudents/${data[i].student_key}/homeworks`).remove(deletedhomework.stud_key);

                });
            }
        })
    }

    //Получить все домашки студентов
    getAllStudentsHomeworks() {
        return this.db.list('/homeworksOfStudents').valueChanges();
    }

    getAllHomeworks() {
        this.allStudentsHomeworksRef = this.db.list<HomeworksOfStudents>('/homeworksOfStudents');
        return this.allStudentsHomeworksRef.valueChanges();
    }
    // Функционал студента

    // Получить все свои домашки 
    getStudentsHomeworks(student_key: string) {
        this.studenthomeworksRef = this.db.list(`/homeworksOfStudents/${student_key}/homeworks`);
        return this.studenthomeworksRef.snapshotChanges();
    }
    // Обновить статус домашки
    updateStudentHomeworks(student_key: string, homework_key: string, value: any) {
        let temporaryhomeworksRef = this.db.list(`/homeworksOfStudents/${student_key}/homeworks/`);
        temporaryhomeworksRef.update(homework_key, value);
    }

    // Отписываемся от subscribe, созданных при создании/обновлении
    ngOnDestroy(): void {
        if (this.subscription) { this.subscription.unsubscribe(); }
        if (this.subscription2) { this.subscription2.unsubscribe(); }
        if (this.subscription3) { this.subscription3.unsubscribe(); }

    }

}

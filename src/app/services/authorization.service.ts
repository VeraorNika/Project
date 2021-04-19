import { Teacher, Student } from '../classes/classes';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Router} from '@angular/router';
import { CommonStudentService } from '../services/common.student.service';
import {CommonTeacherService} from '../services/common.teacher.service';

@Injectable()
export class AuthorizationService {
    teachersRef: AngularFireList<Teacher>;
    teachers: Teacher[] = [];
    constructor(private db: AngularFireDatabase, private router: Router, private commonStudentService: CommonStudentService, private commonTeacherService: CommonTeacherService) {}

    enterStudent(login: string, password: string): void {
        let studentsRef: AngularFireList<Student> = this.db.list('/students', ref => ref.orderByChild('login').equalTo(login));
        let possiblestudents: Student[] = [];
        studentsRef.snapshotChanges().forEach(students => {
            students.forEach(student => {
                let item: any = student.payload.toJSON();
                item.key = student.key;
                possiblestudents.push(item as Student);
            });

            if (possiblestudents.length === 0) { alert('Такого пользователя не существует!'); }
            else {
                let student: Student = possiblestudents[0];
                if (student.password != password) { alert('Неправильный пароль!'); }
                else {
                    this.commonStudentService.setStudent(student);
                    this.router.navigate([`/student-main-page/`]);
                }
            }
        })//end of forEach
    }//end of enterStudent

    enterTeacher(login: string, password: string): void {
        let teachersRef: AngularFireList<Teacher> = this.db.list('/teachers', ref => ref.orderByChild('login').equalTo(login));
        let possibleteachers: Teacher[] = [];
        teachersRef.snapshotChanges().forEach(teachers => {
            teachers.forEach(teacher => {
                let item: any = teacher.payload.toJSON();
                item.key = teacher.key;
                possibleteachers.push(item as Teacher);
            });

            if (possibleteachers.length === 0) { alert('Такого пользователя не существует!'); }
            else {
                let teacher: Teacher = possibleteachers[0];
                if (teacher.password != password) { alert('Неправильный пароль!'); }
                else {
                    this.commonTeacherService.setTeacher(teacher);
                    this.router.navigate([`/teacher-main-page/`]);
                }
            }
        })//end of forEach
    }//end of enterTeacher



}//end of class
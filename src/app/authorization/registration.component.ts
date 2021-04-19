import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Teacher, Student } from '../classes/classes';
import { RegistrationService } from '../services/registration.service';
import * as moment from 'moment';
@Component({
    selector: 'registration',
    styleUrls: ['./Registration.css'],
    templateUrl: './Registration.html',
    providers: [RegistrationService]
})
export class RegistrationComponent {
    Registration: FormGroup = new FormGroup(
        {
            "fullName": new FormControl("", [Validators.required]),
            "group": new FormControl("", Validators.pattern("[1-8][1-6][1-9]")),
            "academic_title": new FormControl(""),
            "birthday": new FormControl("", Validators.required),
            "login": new FormControl("", [Validators.required, Validators.pattern("[A-Za-z0-9_]{6,}")]),
            "password": new FormControl("", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_]{6,}")])
        });

    constructor(private registrationService: RegistrationService) { }

    get _fullName() { return this.Registration.get('fullName'); }
    get _group() { return this.Registration.get('group'); }
    get _login() { return this.Registration.get('login'); }
    get _password() { return this.Registration.get('password'); }
    get _academic_title() { return this.Registration.get('academic_title'); }

    isStudent: boolean = true;
    changetoStudent() {
        this.isStudent = true;
    }
    changetoTeacher() {
        this.isStudent = false;
    }
    register() {
        if( this.registrationService.ifLoginExists(this.Registration.controls['login'].value, this.isStudent) ){
            alert('Пользователь с таким логином уже существует!');
            this.Registration.controls['login'].reset();
        }
        else{
        if (this.isStudent) {
            let student: Student = new Student();
            student.fullName = this.Registration.controls['fullName'].value;
            student.birthday = this.Registration.controls['birthday'].value;
            student.group = this.Registration.controls['group'].value;
            student.login = this.Registration.controls['login'].value;
            student.password = this.Registration.controls['password'].value;
            this.registrationService.createStudent(student);
        }
        else {
            let teacher: Teacher = new Teacher();
            teacher.fullName = this.Registration.controls['fullName'].value;
            teacher.birthday = this.Registration.controls['birthday'].value;
            teacher.degree = this.Registration.controls['academic_title'].value;
            teacher.login = this.Registration.controls['login'].value;
            teacher.password = this.Registration.controls['password'].value;
            this.registrationService.createTeacher(teacher);
        }
    }
    }//end of register
}


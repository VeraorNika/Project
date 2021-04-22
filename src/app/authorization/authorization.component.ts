import { Component } from '@angular/core';
import { Teacher, Student } from '../classes/classes'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization.service';
import { AngularFireDatabase } from "@angular/fire/database";
@Component({
    selector: 'authorization',
    styleUrls: ['./Authorization.css'],
    templateUrl: './Authorization.html',
    providers: [AuthorizationService]
})
export class AuthorizationComponent {
    Authorization: FormGroup = new FormGroup(
        {
            "login": new FormControl("", [Validators.required, Validators.pattern("[A-Za-z0-9_]{6,}")]),
            "password": new FormControl("", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_!@#$%^&*]{6,}")]),
        });
    get _login() { return this.Authorization.get('login'); }
    get _password() { return this.Authorization.get('password'); }

    constructor(public authorizationService: AuthorizationService) { }
    submit() {
        if (this.isStudent) {
            this.authorizationService.enterStudent(this.Authorization.controls['login'].value, this.Authorization.controls['password'].value);
        }
        else {
            this.authorizationService.enterTeacher(this.Authorization.controls['login'].value, this.Authorization.controls['password'].value);
        }


    }
    isStudent: boolean = true;
    changetoStudent() {
        this.isStudent = true;
    }
    changetoTeacher() {
        this.isStudent = false;
    }
}
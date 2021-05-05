import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { url } from 'node:inspector';
import { AuthorizationService } from '../services/authorization.service';

@Component({
    selector: 'authorization',
    styleUrls: ['./Authorization.css'],
    templateUrl: './Authorization.html',
    providers: [AuthorizationService]
})

export class AuthorizationComponent {

    isStudent: boolean = true;
    isPassword: string = "password";
    src: string = "https://www.pngitem.com/pimgs/m/340-3409667_show-hide-icon-png-hide-png-transparent-png.png";

    Authorization: FormGroup = new FormGroup({
        "login": new FormControl("", [Validators.required, Validators.pattern("[A-Za-z0-9 _]{6,}")]),
        "password": new FormControl("", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_!@#$%^&* ]{6,}")]),
    });

    constructor(public authorizationService: AuthorizationService) {/*localStorage.setItem('isStudentLogged', 'false');  localStorage.setItem('isTeacherLogged', 'false');*/ }


    get _login() { return this.Authorization.get('login'); }
    get _password() { return this.Authorization.get('password'); }

    submit() {
        if (this.isStudent) { this.authorizationService.enterStudent(this.Authorization.controls['login'].value, this.Authorization.controls['password'].value); }
        else { this.authorizationService.enterTeacher(this.Authorization.controls['login'].value, this.Authorization.controls['password'].value); }
    }

    changeVisibility() {
        if (this.isPassword === "password") {
            this.isPassword = "text";
            this.src = "../../assets/img/visible.png";
        }
        else {
            this.isPassword = "password";
            this.src = "https://image.flaticon.com/icons/png/512/15/15638.png";
        }
    }

    changetoStudent() { this.isStudent = true; }
    changetoTeacher() { this.isStudent = false; }
}
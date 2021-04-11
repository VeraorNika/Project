import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {User, Teacher, Student} from '../classes/classes';


@Component({
    selector: 'registration',
    styles: [`
    p{margin:0px;}
    input.ng-touched.ng-invalid {border:solid red 1px; }
    .registration_container{border:1px solid red; padding:20px;}
    .form-control{border-radius:5px;}
    .form-group{margin:10px;}
`],
    template: `
        <div class="registration_container">
            <p>Регистрация</p>
        <form #registration="ngForm" novalidate (ngSubmit)="onSubmit(registration)">

                <div class="form-group">
                    <input class="form-control" name="fullName" [(ngModel)]="user.fullName" placeholder="ФИО" required />
                </div>

                <div class="form-group" [hidden]="!isStudent">
                    <input class="form-control" name="group" [(ngModel)]="group" placeholder="Учебная группа" type="number" [required]="isStudent" pattern="[1-8][1-6][1-9]" />
                </div>

                <div class="form-group">
                    <input class="form-control" name="birthday" [(ngModel)]="user.birthday" data-placeholder="Дата рождения" type="date" required />
                </div>

                <div class="form-group">
                    <input class="form-control" name="login" [(ngModel)]="user.login" placeholder="Логин" required pattern = "[A-Za-z0-9]{6,}" />
                </div>

                <div class="form-group">
                    <input class="form-control" name="password" [(ngModel)]="user.password"  placeholder="Пароль" required    />
                </div>

                <div class="form-group">
                    <input type="radio" name="person"  checked (click)="changetoStudent()">Студент
                    <input type="radio" name="person" (click)="changetoTeacher()">Преподаватель
                </div>

                <div class="form-group">
                    <input type="submit" [disabled]="registration.invalid" value="Регистрация" />
                    <!-- <input type="reset"  value="Стереть" /> -->
                </div>

        </form>

        <a routerLink="">Уже зарегистрированы?&#8594;Войти </a>
</div>`
})
export class RegistrationComponent { 
    user: User = new User();
    group:number;
    isStudent:boolean=true;
    changetoStudent(){
        this.isStudent=true;
    }
    changetoTeacher(){
        this.isStudent=false;
    }
    onSubmit(form: NgForm) {
        console.log(this.user);
    }
    
}


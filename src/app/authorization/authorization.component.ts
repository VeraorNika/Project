import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {User} from '../classes/classes';

@Component({
    selector: 'authorization',
    styles: [`
    input.ng-touched.ng-invalid {border:solid red 2px;}
    .authorization_container{border: 1px solid red; margin:0 auto; width:100%; padding:10px;}
     h3{margin:0px;}
    .form-control{border-radius:5px;}
    .form-group{margin:10px;}
    /* input[type="date"]::before { 
    content: attr(data-placeholder);
    width: 100%; */
}
`],
    template: `
    <div class="authorization_container"> 
    <h3>Авторизация</h3>
    <form #authorization="ngForm" novalidate (ngSubmit)="onSubmit(authorization)">
    <div class="form-group">
      <input class="form-control" name="login" [(ngModel)]="user.login" placeholder="Логин" required />
  </div>

  <div class="form-group">
      <input class="form-control" name="password" [(ngModel)]="user.password"  placeholder="Пароль" required/>
  </div>
  <div class="form-group">
     <input type="radio" name="person"  checked (click)="changetoStudent()">Студент
      <input type="radio" name="person" (click)="changetoTeacher()">Преподаватель
  </div>


  <div class="form-group">
      <input type="submit" [disabled]="authorization.invalid" value="Войти в систему" />
  </div>
    </form>
    <a routerLink="/registration">Еще не зарегистрированы?&#8594;Регистрация </a>
    <br>
    <a routerLink="/student_main_page">Страница студента</a>
    <br>
    <a routerLink="/teacher_main_page">Страница преподавателя</a>
    </div>`
})
export class AuthorizationComponent { 

user: User=new User();
onSubmit(form: NgForm) {
    console.log(this.user);
}
isStudent:boolean=true;
changetoStudent(){
    this.isStudent=true;
}
changetoTeacher(){
    this.isStudent=false;
}
}
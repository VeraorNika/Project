import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


export class User {
    fullName: string;
    login: string;
    password: string;
    isStudent: boolean;
    birthday:Date;
    group:number;
    constructor(){
        this.isStudent=true;
    }
    

}
export class Student extends User{
    group: number;
    constructor(){
        super();
    }
   
    
}

export class Teacher extends User{
    constructor(){
        super();
        this.isStudent=false;
    }
   
}

@Component({
    selector: 'authorizaton',
    styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        .container{background-color:white; margin:0 auto; width:70%; border-radius:10px; text-align:center; padding:5px;}
        .form-control{border-radius:5px;}
        .form-group{margin:10px;}
        /* input[type="date"]::before { 
    	content: attr(data-placeholder);
    	width: 100%; */
    }
    `],
    template: `
     <div class="container">
         <p>Регистрация</p>
        <form #registration="ngForm" novalidate (ngSubmit)="onSubmit(registration)">

      <div class="form-group">
          <input class="form-control" name="fullName" [(ngModel)]="user.fullName" placeholder="ФИО" required />
      </div>

      <div class="form-group" [hidden]="!user.isStudent">

      <input class="form-control" name="group" [(ngModel)]="user.group" placeholder="Учебная группа" type="number" required />
      </div>
      <div class="form-group">
          <input class="form-control" name="birthday" [(ngModel)]="user.birthday" data-placeholder="Дата рождения" type="date" required />
      </div>

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
          <input type="submit" [disabled]="registration.invalid" value="Регистрация" />
          <input type="reset"  value="Стереть" />
      </div>


  </form>
  
  <a href="">Уже зарегистрированы? Войти &#8594;</a>
  </div>`


})
export class AppComponent {

    user: User = new User();
    onSubmit(form: NgForm) {
        console.log(this.user);
    }
    changetoStudent(){
        this.user.isStudent=true;
    }
    changetoTeacher(){
        this.user.isStudent=false;
       
    }
}
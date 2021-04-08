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
    selector: 'appcomponent',
    styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        
        .form-control{border-radius:5px;}
        .form-group{margin:10px;}
        /* input[type="date"]::before { 
    	content: attr(data-placeholder);
    	width: 100%; */
    }
    `],
    template: `
     <router-outlet></router-outlet>`


})
export class AppComponent {

}
import { Component } from '@angular/core';
import {User} from '../classes/classes';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {AngularFireDatabase} from "@angular/fire/database";
@Component({
    selector: 'authorization',
    styleUrls:['../../assets/styles/Authorization.css'],
    templateUrl:'../../assets/html/authorization/Authorization.html',
})
export class AuthorizationComponent { 
   Authorization: FormGroup = new FormGroup(
        {
            "login": new FormControl("", [Validators.required, Validators.pattern("[A-Za-z0-9]{6,}")]),
            "password": new FormControl("", [Validators.required, Validators.pattern("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}")]),
        });
        get _login() {return this.Authorization.get('login');}
        get _password() {return this.Authorization.get('password');}
    
        user: User;
        
        submit(){
            // console.log(firebase);
        }
        isStudent:boolean=true;
        changetoStudent(){
            this.isStudent=true;
        }
        changetoTeacher(){
            this.isStudent=false;
        }
}
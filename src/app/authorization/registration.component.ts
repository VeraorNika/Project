import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Teacher, Student} from '../classes/classes';


@Component({
    selector: 'registration',
    styleUrls:['../../assets/styles/Registration.css'],
    templateUrl:'../../assets/html/authorization/Registration.html',
})
export class RegistrationComponent { 
    Registration: FormGroup = new FormGroup(
        {
            "fullName": new FormControl("", [Validators.required]),
            "group": new FormControl("", Validators.pattern("[1-8][1-6][1-9]")),
            "birthday": new FormControl("", Validators.required),
            "login": new FormControl("", [Validators.required, Validators.pattern("[A-Za-z0-9]{6,}")]),
            "password": new FormControl("", [Validators.required, Validators.pattern("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}")])
        });
    

    get _fullName() {return this.Registration.get('fullName');}
    get _group() {return this.Registration.get('group');}
    get _login() {return this.Registration.get('login');}
    get _password() {return this.Registration.get('password');}

    isStudent:boolean=true;
    changetoStudent(){
        this.isStudent=true;
    }
    changetoTeacher(){
        this.isStudent=false;
    }
    register(){

    }
    
}


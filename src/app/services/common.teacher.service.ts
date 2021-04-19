import { Homework, Teacher} from '../classes/classes';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonTeacherService {
    teacher:Teacher=new Teacher();
    currentHomework:Homework;
    constructor(){
    }
    setTeacher(teacher:Teacher){
        for (let property in teacher){this.teacher[property]=teacher[property];}
    }
    setHomework(homework:Homework){
        this.currentHomework=homework;
    }

}
import { Student } from '../classes/classes';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonStudentService {
    student:Student=new Student();
    constructor(){
    }
    setStudent(student:Student){
        // this.student=student; -> здесь мы получаем ссылку на аргумент из предыдущего сервиса (авторизация), а когда предыдущий сервис для авторизации удалится, ссылка тоже исчезнет. Лучше скопировать свойства
        for (let property in student){this.student[property]=student[property];}
    }

}
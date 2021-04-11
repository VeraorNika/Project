import {Teacher} from '../classes/classes';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class TeacherService{
   
    constructor(private http: HttpClient){ }
       
    getTeachers() : Observable<Teacher[]> {
        return this.http.get('./teachers.json').pipe(map(data=>{
            let TeachersList = data["TeachersList"];
            return TeachersList.map(function(teacher:any) 
            {
                let newTeacher=new Teacher();
                newTeacher.fullName=teacher.fullName;
                newTeacher.login=teacher.login; 
                newTeacher.password=teacher.password; 
                newTeacher.birthday=teacher.birthday; 
                return newTeacher;   

              
            });
        }));
    
}}
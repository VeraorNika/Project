import {Homework} from '../classes/Homework_class';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
   
@Injectable()
export class HomeworkService{
   
    constructor(private http: HttpClient){ }
       
//     getHomeworks() : Observable<Homework[]> {
//         return this.http.get('./homeworks.json').pipe(map(data=>{
//             let HomeworksList = data["HomeworksList"];
//             return HomeworksList.map(function(homework:any) 
//             {
//                 let newHomework=new Homework();
//                 newHomework.name=homework.name;
//                 newHomework.description=homework.description; 
//                 newHomework.teacher=homework.teacher; 
//                 newHomework.startDate=homework.startDate; 
//                 newHomework.deadlineDate=homework.deadlineDate;
//                 newHomework.subject=homework.subject;
//                 return newHomework;   

              
//             });
//         }));
    
// }
        getHomeworks(){
            return this.http.get('./homeworks.json');
        }

}
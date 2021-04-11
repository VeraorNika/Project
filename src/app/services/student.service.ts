import {Student} from '../classes/classes';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
  
@Injectable()
export class StudentService{
   
    constructor(private http: HttpClient){ }
       
//     getStudents() : Observable<Student[]> {
//         return this.http.get('./students.json').pipe(map(data=>{
//             let StudentsList = data["StudentsList"];
//             return StudentsList.map(function(student:any) 
//             {
//                 let newStudent=new Student();
//                 newStudent.fullName=student.fullName;
//                 newStudent.login=student.login; 
//                 newStudent.password=student.password; 
//                 newStudent.birthday=student.birthday; 
//                 newStudent.group=student.group;
//                 return newStudent;   

              
//             });
//         }));
    
// }
        getStudents(){
            return this.http.get('./students.json');
        }

}
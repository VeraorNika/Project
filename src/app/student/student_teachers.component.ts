import { Component } from '@angular/core';
import {Teacher, Student} from '../classes/classes';
import {TeacherService} from '../services/teacher.service';

@Component({
    selector: 'student_teachers',
    template: `<student_navigation></student_navigation>
    <h3>Список преподавателей</h3>
    <table>
    <thead>
        <tr>
            <th>Преподаватель</th> 
        </tr>
    </thead>
        <tr *ngFor="let teacher of teachers">
            <th>{{teacher.fullName}} </th>
         </tr>
   </table>
    `,
     providers:[TeacherService]
})
export class StudentTeachersComponent { 

    student:Student=new Student();
    constructor(private studentService: TeacherService ){}
    teachers:Teacher[]=[];
    
    ngOnInit(): void {
       this.studentService.getTeachers().subscribe(data=> this.teachers=data["TeachersList"]);
       console.log(this.teachers);
        
    }



}
import { Component, OnInit } from '@angular/core';
import {Teacher, Student} from '../classes/classes';
import {StudentService} from '../services/student.service';

@Component({
    selector: 'teacher',
    template: ` <teacher_navigation> </teacher_navigation>
   <p>Список студентов</p> 
   <table>
<thead>
<tr>
    <th>Студент</th> 
    <th>Группа</th> 
    <th>Домашнее задание</th> 
    <th>Статус </th>
</tr>
</thead>
<tr *ngFor="let student of students">
    <th>{{student.fullName}} </th>
    <th>{{student.group}} </th>
    <th> </th>
    <th> </th>
</tr>
   </table>
   `,
   providers:[StudentService]
})
export class TeacherComponent implements OnInit{ 

teacher:Teacher=new Teacher();
constructor(private studentService: StudentService ){}
students:Student[]=[];

ngOnInit(): void {
   this.studentService.getStudents().subscribe(data=> this.students=data["StudentsList"]);
   console.log(this.students);
    
}
}


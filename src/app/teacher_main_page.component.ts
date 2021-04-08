import { Component } from '@angular/core';
import {User} from './classes';
import {Teacher} from './classes';
import {Student} from './classes';
@Component({
    selector: 'teacher',
    template: ` <teacher_navigation> </teacher_navigation>
   <p>Главная страница teacher</p> 
   <table>
<thead>
<tr>
    <th>Студент</th> <th>Группа</th>
</tr>
</thead>
<tr *ngFor="let student of students">
    <th>{{student.fullName}} </th>
    <th>{{student.group}} </th>
</tr>
   </table>
   `,
})
export class TeacherComponent { 

teacher:Teacher=new Teacher();

students:Student[]=[];

ngOnInit(): void {
let student:Student=new Student();
   let count:number=30;
   for(let i:number=0; i<count; i++){
       student.fullName="Student"+i;
       student.group=Number("41"+i);
       let clone:Student=Object.assign({}, student);
       console.log(clone);
       this.students.push(clone);

       }
    
}
}


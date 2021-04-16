import {Student} from '../classes/classes';
import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
 
// Способ подключения не через AngularFireDatabase
// import firebase from 'firebase/app';
// import { environment } from './../../environments/environment';

@Injectable()
export class StudentService{
    
    students:Student[]=[];
    constructor(private db: AngularFireDatabase){ 
      // firebase.initializeApp(environment.firebase);
    }

        getStudents(): Student[] {
            let x=this.db.list('students');

            x.snapshotChanges().subscribe(item=>{

                item.forEach(element=>{
                    let y:Student=<Student>element.payload.toJSON();
                     // y["$key"]=element.key;
                    let student:Student=
                    {
                        fullName:y.fullName,
                        group:y.group,
                        login:y.login,
                        password:y.password
                    }
                    // console.log(student instanceof Student); => оказывается, что объекты не принадлежат классу Student, несмотря на объявление
                    this.students.push(student);
                    
                });

            })
            console.log("В сервисе: ", this.students);
            return this.students;
        }

}
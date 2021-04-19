import {Teacher} from '../classes/classes';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import  * as moment from 'moment';
@Injectable()
export class TeacherService{

    teachers:Teacher[]=[];
    constructor(private db: AngularFireDatabase){ 
      // firebase.initializeApp(environment.firebase);
    }

        getTeachers(): Teacher[] {
            let x=this.db.list('teachers');

            x.snapshotChanges().subscribe(data=>{

                data.forEach(element=>{
                    let y:Teacher=<Teacher>element.payload.toJSON();
                    y.key=element.key;
                    // let teacher:Teacher=new Teacher();
                    // teacher.key=y.key;
                    // teacher.fullName=y.fullName;
                    // teacher.login=y.login;
                    // teacher.password=y.password;
                    // teacher.degree=y.degree;
                    // teacher.birthday=y.birthday;
                    this.teachers.push(y as Teacher);
                    
                });

            })
            console.log("В сервисе: ", this.teachers);
            return this.teachers;
        }

    
    }
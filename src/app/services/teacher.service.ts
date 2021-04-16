import {Teacher} from '../classes/classes';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";

@Injectable()
export class TeacherService{

    teachers:Teacher[]=[];
    constructor(private db: AngularFireDatabase){ 
      // firebase.initializeApp(environment.firebase);
    }

        getTeachers(): Teacher[] {
            let x=this.db.list('teachers');

            x.snapshotChanges().subscribe(item=>{

                item.forEach(element=>{
                    let y:Teacher=<Teacher>element.payload.toJSON();
                     // y["$key"]=element.key;

                    //  Так все рушится:
                    // let teacher:Teacher=new Teacher();
                    // teacher.fullName=y.fullName;
                    // teacher.login=y.login;
                    // teacher.password=y.password;
                    let teacher:Teacher=
                    {
                        fullName:y.fullName,
                        login:y.login,
                        password:y.password
                    }
                    this.teachers.push(teacher);
                    
                });

            })
            console.log("В сервисе: ", this.teachers);
            return this.teachers;
        }

    
    }
import { NgForm } from '@angular/forms';
import {User, Teacher, Student} from '../classes/classes';
import { } from '@angular/forms';

@Component({
    selector: 'new-homework',
    template:`<form [formGroup]="NewHomework" novalidate (ngSubmit)="submit()">
                    <div class="form-group">
                        <label>Домашнее задание</label>
                        <input class="form-control" name="homework_name" formControlName="homework_name" />
                        <div *ngIf="NewHomework.controls['homework_name'].invalid && NewHomework.controls['homework_name'].touched">
                            Не указано имя
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Группа</label>
                        <input class="form-control" name="group" formControlName="group" />
                        <div *ngIf="NewHomework.controls['group'].invalid && NewHomework.controls['group'].touched">
                            Не указана группа
                        </div>
                    </div>

                    <div class="form-group">
                    <label>Начальная дата</label>
                        <input class="form-control" name="startDate" formControlName="startDate" />
                        <div *ngIf="NewHomework.controls['startDate'].invalid && NewHomework.controls['startDate'].touched">
                            Некорректная дата
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Дата завершения</label>
                        <input class="form-control" name="phone" formControlName="userPhone" />
                        <div class="alert alert-danger"
                            *ngIf="NewHomework.controls['userPhone'].invalid && NewHomework.controls['userPhone'].touched">
                            Некорректная дата
                        </div>
                    </div>

                    <div class="form-group">
                        <button class="btn btn-default" [disabled]="NewHomework.invalid">
                            Отправить
                        </button>
                    </div>

                </form>`


})
export class AppComponent {
    NewHomework : FormGroup;
    constructor(){
        this.NewHomework = new FormGroup({
              
            "userName": new FormControl("Tom", Validators.required),
            "userEmail": new FormControl("", [
                                Validators.required, 
                                Validators.email 
                            ]),
            "userPhone": new FormControl("", Validators.pattern("[0-9]{10}")) 
        });
    }
      
    submit(){
        console.log(this.NewHomework);
    }
}
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Teacher, Student} from '../classes/classes';
import {Homework} from '../classes/Homework_class';

@Component({
    selector:'new-homework',
    styles: [`
    input.ng-touched.ng-invalid {border:solid red 1px; }
`],
    template:`<h4>Заполните форму</h4>
    <form [formGroup]="NewHomework" novalidate (ngSubmit)="submit()">

                    <div class="form-group">
                        <label>Домашнее задание:</label> <br>
                        <textarea rows="3" class="form-control" name="homework_name" formControlName="homework_name" style="resize: none;"></textarea>
                        <!-- <input class="form-control" name="homework_name" formControlName="homework_name"> -->
                        <!-- <div *ngIf="NewHomework.controls['homework_name'].invalid && NewHomework.controls['homework_name'].touched">
                            Не указано имя
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label>Группа/Студент:</label><br>
                        <input class="form-control" name="homework_group" formControlName="homework_group" />
                        <!-- <div *ngIf="NewHomework.controls['homework_group'].invalid && NewHomework.controls['homework_group'].touched">
                            Не указана группа
                        </div> -->
                    </div>

                    <div class="form-group">
                    <label>Начальная дата:</label><br>
                        <input class="form-control" name="homework_startDate" formControlName="homework_startDate" type="date" />
                        <!-- <div *ngIf="NewHomework.controls['homework_startDate'].invalid && NewHomework.controls['homework_startDate'].touched">
                            Некорректная дата
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label>Дата завершения:</label><br>
                        <input class="form-control" name="homework_deadlineDate" formControlName="homework_deadlineDate" type="date"/>
                        <!-- <div *ngIf="NewHomework.controls['homework_deadlineDate'].invalid && NewHomework.controls['homework_deadlineDate'].touched">
                            Некорректная дата
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label>Подробное описание:</label> <br>
                        <textarea rows="4" class="form-control" name="homework_description" formControlName="homework_description" style="resize: none;"></textarea>
                        <!-- <div *ngIf="NewHomework.controls['homework_description'].invalid && NewHomework.controls['homework_description'].touched">
                            Не указано имя
                        </div> -->
                    </div>

                    <div class="form-group">
                        <label>Пожелания к выполнению:</label> <br>
                        <textarea rows="4" class="form-control" name="homework_wishes" formControlName="homework_wishes" style="resize: none;"></textarea>
                    </div>
                    <br>

                    <div class="form-group">
                        <button mat-button (click)="addNewHomework()" [disabled]="NewHomework.invalid">Добавить</button> 
                        <button mat-button (click)="dialogRef.close()">Отмена</button>  
                    </div>

                </form>`
})
export class TeacherNewHomeworkComponent implements OnInit{
    
    str:string="Success";
    NewHomework :FormGroup=new FormGroup(
        {
           "homework_name": new FormControl("", this.homeworkNameValidator),
           "homework_group": new FormControl("",[Validators.pattern("[1-8][1-6][1-9]")]),
           "homework_startDate": new FormControl(new Date(), Validators.required),
           "homework_deadlineDate": new FormControl("",Validators.required),
           "homework_description": new FormControl("",Validators.required),
           "homework_wishes": new FormControl("",this.homeworkWishesValidator),
       });
    constructor(public dialogRef: MatDialogRef<TeacherNewHomeworkComponent>) {};
    ngOnInit(): void { 
    }
    //Валидаторы названия ДЗ и пожеланий
    homeworkNameValidator(control: FormControl): {[s:string]:boolean} {
            if (control.value.length==0 || control.value.length>50){
                return {"homework_name": true};
            }
            return null;
    }
    homeworkWishesValidator(control: FormControl): {[s:string]:boolean} {
        if (control.value.length>100){
            return {"homework_wishes": true};
        }
        return null;
        }

    addNewHomework() {
        this.dialogRef.close(this.str);
    }

    submit(){
        console.log(this.NewHomework);
    }
    

}
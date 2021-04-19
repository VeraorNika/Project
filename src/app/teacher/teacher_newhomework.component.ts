import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Teacher, Homework } from '../classes/classes';

import { HomeworkService } from '../services/homework.service';
import { CommonTeacherService } from '../services/common.teacher.service';

@Component({
    selector: 'new-homework',
    styleUrls: ['./../common_styles/Popup.css'],
    templateUrl: './Teacher_newhomework.html',
})
export class NewHomeworkComponent {

    teacher: Teacher = new Teacher();

    homework: Homework = new Homework();
//     today = new Date();
// const dateSrc = today.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' });
    
// dateDst = dateSrc.split(".").reverse().join("-");
    str: string = "Success";

    // Определение формы
    NewHomework: FormGroup = new FormGroup(
        {
            "homework_subject": new FormControl("", [Validators.required, Validators.maxLength(50)]),
            "homework_name": new FormControl("", [Validators.required, Validators.maxLength(50)]),
            "homework_group": new FormControl("", [Validators.required, Validators.pattern("[1-8][1-6][1-9]")]),
            "homework_startDate": new FormControl("", Validators.required),
            "homework_deadlineDate": new FormControl("", [Validators.required, this.DeadlineDateValidator]),
            "homework_description": new FormControl("", Validators.required),
            "homework_wishes": new FormControl("", Validators.maxLength(100)),
        });
    DeadlineDateValidator(control: FormControl): { [s: string]: boolean } {

        let deadlineDate: number = new Date(control.value).getTime();
        let currentDate: number = new Date().getTime();
        if (deadlineDate - currentDate <= 86400000) return { "homework_deadlineDate": true };
        return null;
    }
    constructor(public dialogRef: MatDialogRef<NewHomeworkComponent>, private homeworkService: HomeworkService, private commonTeacherService: CommonTeacherService) {
        this.teacher = commonTeacherService.teacher;
    };

    get _homework_name() { return this.NewHomework.get('homework_name'); }
    get _homework_subject() { return this.NewHomework.get('homework_subject'); }
    get _homework_group() { return this.NewHomework.get('homework_group'); }
    get _homework_description() { return this.NewHomework.get('homework_description'); }


    addNewHomework() {
        this.homework.subject = this.NewHomework.controls['homework_subject'].value;
        this.homework.name = this.NewHomework.controls['homework_name'].value;
        this.homework.group = this.NewHomework.controls['homework_group'].value;
        this.homework.startDate = this.NewHomework.controls['homework_startDate'].value;
        this.homework.deadlineDate = this.NewHomework.controls['homework_deadlineDate'].value;
        this.homework.description = this.NewHomework.controls['homework_description'].value;
        if (!this.NewHomework.controls['homework_wishes'].value) {
            this.homework.wishes = "-";
        }
        else {
            this.homework.wishes = this.NewHomework.controls['homework_wishes'].value;
        }
        this.homework.isDone = false;
        this.homework.isExpired = false;
        this.homework.status = "Задано";
        this.homework.teacher = this.teacher.fullName;
        this.homework.teacher_login = this.teacher.login;

        this.homeworkService.create(this.homework);
        this.dialogRef.close(this.str);
    }


}
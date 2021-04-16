import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Teacher, Homework } from '../classes/classes';
import { HomeworkService } from '../services/homework.service';


@Component({
    selector: 'new-homework',
    styleUrls: ['../../assets/styles/Popup.css'],
    templateUrl: '../../assets/html/teacher/Teacher_newhomework.html',
})
export class NewHomeworkComponent {

    teacher: Teacher = new Teacher();

    homework: Homework = new Homework();
    currentDate = new Date();
    str: string = "Success";

    // Определение формы
    NewHomework: FormGroup = new FormGroup(
        {
            "homework_subject": new FormControl("", [Validators.required, Validators.maxLength(50)]),
            "homework_name": new FormControl("", [Validators.required, Validators.maxLength(50)]),
            "homework_group": new FormControl("", [Validators.required, Validators.pattern("[1-8][1-6][1-9]")]),
            "homework_startDate": new FormControl("", Validators.required),
            "homework_deadlineDate": new FormControl("", Validators.required),
            "homework_description": new FormControl("", Validators.required),
            "homework_wishes": new FormControl("", Validators.maxLength(100)),
        });

    constructor(public dialogRef: MatDialogRef<NewHomeworkComponent>, private homeworkService: HomeworkService) {
        this.teacher.fullName = "Иванов Иван";
    };

    get _homework_name() { return this.NewHomework.get('homework_name'); }
    get _homework_subject() { return this.NewHomework.get('homework_subject'); }
    get _homework_group() { return this.NewHomework.get('homework_group'); }
    get _homework_description() { return this.NewHomework.get('homework_description'); }


    addNewHomework() {
        this.homework.name = this.NewHomework.controls['homework_name'].value;
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
        this.homework.subject = this.NewHomework.controls['homework_subject'].value;
        
        this.homeworkService.create(this.homework);
        this.dialogRef.close(this.str);
    }


}
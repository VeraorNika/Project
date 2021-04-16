import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Teacher, Student } from '../classes/classes';
import { Homework } from '../classes/Homework_class';

@Component({
    selector: 'new-homework',
    styleUrls: ['../../assets/styles/Popup.css'],
    templateUrl: '../../assets/html/teacher/Teacher_newhomework.html',
})
export class NewHomeworkComponent {
    currentDate = new Date();
    str: string = "Success";

    // Определение формы
    NewHomework: FormGroup = new FormGroup(
        {
            "homework_name": new FormControl("", [Validators.required, Validators.maxLength(50)]),
            "homework_group": new FormControl("", [Validators.required, Validators.pattern("[1-8][1-6][1-9]")]),
            "homework_startDate": new FormControl("", Validators.required),
            "homework_deadlineDate": new FormControl("", Validators.required),
            "homework_description": new FormControl("", Validators.required),
            "homework_wishes": new FormControl("", Validators.maxLength(100)),
        });

    constructor(public dialogRef: MatDialogRef<NewHomeworkComponent>) { };
    
    get _homework_name() { return this.NewHomework.get('homework_name'); }
    get _homework_group() { return this.NewHomework.get('homework_group'); }
    get _homework_description() { return this.NewHomework.get('homework_description'); }


    addNewHomework() {
        this.dialogRef.close(this.str);
    }


}
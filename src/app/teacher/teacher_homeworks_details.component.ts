import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Homework } from '../classes/classes';
@Component({
    selector: 'homework_detail',
    styleUrls: ['../../assets/styles/MainPage.css', '../../assets/styles/HomeworkDetails.css'],
    templateUrl: '../../assets/html/teacher/Teacher_homework.html',
})
export class HomeworkDetailsComponent {
    startDate = "2013-11-15";

    editHomework: FormGroup = new FormGroup(
        {
            "homework_name": new FormControl({ value: "Some name", disabled: true }),
            "homework_group": new FormControl({ value: 439, disabled: true }),
            "homework_startDate": new FormControl({ value: "", disabled: true }),
            "homework_deadlineDate": new FormControl("", [Validators.required, this.homeworkDeadlineDateValidator]),
            "homework_description": new FormControl("Description", Validators.required),
            "homework_wishes": new FormControl("Wishes", Validators.maxLength(100)),
        });

    homeworkDeadlineDateValidator(control: FormControl): { [s: string]: boolean } {
        if (<Date>control.value < new Date()) {
            return { "homework_wishes": true };
        }
        return null;
    }

    get _homework_name() { return this.editHomework.get('homework_name'); }
    get _homework_group() { return this.editHomework.get('homework_group'); }
    get _homework_startDate() { return this.editHomework.get('homework_group'); }
    get _homework_deadlineDate() { return this.editHomework.get('homework_deadlineDate'); }

    onInit() {
    }

    saveHomework() {
        let date = document.getElementsByName("homework_deadlineDate")[0];
        console.log(date.innerHTML);
    }


}
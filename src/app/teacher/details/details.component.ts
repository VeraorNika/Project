import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Homework } from '../../classes/classes';
import { HomeworkService } from '../../services/homework.service';

@Component({
    selector: 'homework_detail',
    styleUrls: ['./../../common_styles/MainPage.css', './../../common_styles/HomeworkDetails.css'],
    templateUrl: './details.html',
})
export class HomeworkDetailsComponent {
    editHomework: FormGroup;
    homework = new Homework();

    constructor(private homeworkService: HomeworkService) {
        this.homework = JSON.parse(localStorage.getItem('currentHomework'));
        this.editHomework = new FormGroup(
            {
                "homework_subject": new FormControl(this.homework.subject),
                "homework_name": new FormControl(this.homework.name),
                "homework_group": new FormControl(this.homework.group),
                "homework_startDate": new FormControl(this.homework.startDate),
                "homework_deadlineDate": new FormControl(this.homework.deadlineDate, [Validators.required, this.homeworkDeadlineDateValidator]),
                "homework_description": new FormControl(this.homework.description, Validators.required),
                "homework_wishes": new FormControl(this.homework.wishes, Validators.maxLength(100)),
            });
    }
    // валидатор для даты
    homeworkDeadlineDateValidator(control: FormControl): { [s: string]: boolean } {
        let deadlineDate: number = new Date(control.value).getTime();
        let currentDate: number = new Date().getTime();
        if (deadlineDate - currentDate <= 86400000) {
            return { "homework_deadlineDate": true };
        }
        return null;
    }

    get _homework_name() { return this.editHomework.get('homework_name'); }
    get _homework_group() { return this.editHomework.get('homework_group'); }
    get _homework_startDate() { return this.editHomework.get('homework_group'); }
    get _homework_deadlineDate() { return this.editHomework.get('homework_deadlineDate'); }

    saveHomework() {
        let new_deadlineDate: string = this.editHomework.controls['homework_deadlineDate'].value;
        let new_desription: string = this.editHomework.controls['homework_description'].value;
        let new_wishes: string = this.editHomework.controls['homework_wishes'].value;
        let key: string = this.homework.key;
        this.homeworkService.update(key, this.homework.group, { description: new_desription, wishes: new_wishes, deadlineDate: new_deadlineDate });
        localStorage.removeItem('currentHomework');
    }


}
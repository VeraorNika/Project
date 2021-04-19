import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Homework } from '../classes/classes';
import * as moment from 'moment';
import { CommonTeacherService } from '../services/common.teacher.service';
import {HomeworkService} from '../services/homework.service';
import { from } from 'rxjs';
@Component({
    selector: 'homework_detail',
    styleUrls: ['./../common_styles/MainPage.css', './../common_styles/HomeworkDetails.css'],
    templateUrl: './Teacher_homework.html',
})
export class HomeworkDetailsComponent {
    currentDeadlineDate
    constructor(private commonTeacherService: CommonTeacherService, private homeworkService:HomeworkService) {

     }

    editHomework: FormGroup = new FormGroup(
        {
            "homework_name": new FormControl({ value: this.commonTeacherService.currentHomework.name, disabled: true }),
            "homework_group": new FormControl({ value: this.commonTeacherService.currentHomework.group, disabled: true }),
            "homework_startDate": new FormControl({ value: this.commonTeacherService.currentHomework.startDate, disabled: true }),
            "homework_deadlineDate": new FormControl("", [Validators.required, this.homeworkDeadlineDateValidator]),
            "homework_description": new FormControl("Description", Validators.required),
            "homework_wishes": new FormControl("Wishes", Validators.maxLength(100)),
        });
    
    homeworkDeadlineDateValidator(control: FormControl): { [s: string]: boolean } 
    {
        let deadlineDate: number = new Date(control.value).getTime();
        let currentDeadlineDate: number = new Date().getTime();
        if (currentDeadlineDate>deadlineDate) {
            return { "homework_deadlineDate": true };
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
        let new_deadlineDate=this.editHomework.controls['homework_deadlineDate'].value;
        let new_desription=this.editHomework.controls['homework_description'].value;
        let new_wishes=this.editHomework.controls['homework_wishes'].value;
        let key=this.commonTeacherService.currentHomework.key;
        this.homeworkService.update(key, {description:new_desription, wishes:new_wishes, deadlineDate:new_deadlineDate})
    
    }


}
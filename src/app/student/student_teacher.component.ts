import {Component} from '@angular/core';
import { Teacher } from '../classes/classes';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
    selector: 'steacher',
    styleUrls: ['./../common_styles/MainPage.css'],
    templateUrl: './Student_teacher.html',
})
export class TeacherComponent  {
    
    teacher:Teacher=new Teacher();
    private routeSubscription: Subscription;
    private querySubscription: Subscription;

    constructor(private route: ActivatedRoute){
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.teacher.fullName = queryParam['fullName'];
                if(queryParam['degree']) { this.teacher.degree = queryParam['degree'];}
            });
    }


}
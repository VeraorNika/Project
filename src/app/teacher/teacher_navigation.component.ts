import { Component } from '@angular/core';
import { Router} from '@angular/router';
@Component({
    selector: 'teacher-navigation',
    styleUrls: ['./../common_styles/Navigation.css'],
    template: `<nav>
<a routerLink="/teacher-main-page"> Все студенты</a>
<a  routerLink="/teacher-main-page/teacher-homeworks"> Мои задания</a>
<a (click)="exit()"> Выйти из системы</a>
    </nav>`
})
export class NavigationComponent {

    constructor(private router:Router){}
    exit(){
        if(confirm('Вы уверены, что хотите выйти?')){
            localStorage.removeItem('currentTeacher');
            localStorage.setItem('isTeacherLogged', 'false');
            this.router.navigate(['/authorization']);
        }
    }
}
import { Component } from '@angular/core';

@Component({
    selector: 'teacher-navigation',
    styleUrls: ['./../common_styles/Navigation.css'],
    template: `<nav>
<a routerLink="/teacher-main-page"> Все студенты</a>
<a  routerLink="/teacher-main-page/teacher-homeworks"> Мои задания</a>
<a routerLink="/authorization"> Выйти из системы</a>
    </nav>`
})
export class NavigationComponent {

}
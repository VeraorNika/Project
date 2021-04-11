import { Component } from '@angular/core';

@Component({
    selector: 'teacher_navigation',
    template: `<nav>
<a routerLink="/teacher_main_page"> Все студенты</a>
<a  routerLink="/teacher_main_page/teacher_homeworks"> Мои задания</a>
<a routerLink="/authorization"> Выйти из системы</a>
    </nav>`
})
export class TeacherNavigationComponent { 


}
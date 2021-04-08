import { Component } from '@angular/core';

@Component({
    selector: 'student_navigation',
    template: `<nav>
<a routerLink="/student_main_page">Мои задания</a>
<a  routerLink="/student_main_page/teachers">Учителя</a>
<a routerLink="/"> Выйти из системы</a>
    </nav>`
})
export class StudentNavigationComponent { 
}
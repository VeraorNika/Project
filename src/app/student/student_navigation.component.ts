import { Component } from '@angular/core';
@Component({
    selector: 'student-navigation',
    styleUrls:['../../assets/styles/Navigation.css'],
    template: `
    <nav>
        <a routerLink="/student-main-page">Мои задания</a>
        <a  routerLink="/student-main-page/teachers">Учителя</a>
        <a routerLink="/authorization"> Выйти из системы</a>
    </nav>`
})
export class StudentNavigationComponent { 
    


}
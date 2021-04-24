import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'student-navigation',
    styleUrls: ['./../common_styles/Navigation.css'],
    template: `
    <nav>
        <a routerLink="/student-main-page">Мои задания</a>
        <a  routerLink="/student-main-page/teachers">Преподаватели</a>
        <a  (click)="exit()" > Выйти из системы</a>
    </nav>`
})
export class StudentNavigationComponent {

    constructor(private router: Router) { }

    exit() {
        if (confirm('Вы уверены, что хотите выйти?')) {
            localStorage.removeItem('currentStudent');
            this.router.navigate(['/authorization']);
        }
    }


}
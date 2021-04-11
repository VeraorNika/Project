import { Component } from '@angular/core';

@Component({
    selector: 'not-found',
    template: `<h3>Ничего не найдено :(</h3>
       <a routerLink="">Вернуться на главную &#8594;</a>`
})
export class NotFoundComponent { }
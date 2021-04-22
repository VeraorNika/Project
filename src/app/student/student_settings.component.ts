import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

// Таблица
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

// Необходимые классы
import { Teacher, Student, Homework } from '../classes/classes';

// Сервисы
import { HomeworkService } from '../services/homework.service';



@Component({
    selector: 'settings',
    styleUrls: ['./../common_styles/MainPage.css'],
    templateUrl: './Student_settings.html',
})
export class Settings{


    
}
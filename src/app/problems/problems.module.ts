import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import { NotFoundComponent }   from './not-found.component';

const ProbappRoutes: Routes =[
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(ProbappRoutes)],
    declarations: [NotFoundComponent],
   exports: [RouterModule, NotFoundComponent],

})
export class ProblemsModule { }
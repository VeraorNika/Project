import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class StudentGuard implements CanActivate {

    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let isStudentLogged = localStorage.getItem('isStudentLogged');
        if (isStudentLogged === "true") { console.log(isStudentLogged); return true; }
        else {
            this.router.navigate(['/authorization']);
            return false;
        };
    }
}
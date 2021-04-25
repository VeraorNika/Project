import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export class StudentGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let isStudentLogged = localStorage.getItem('isStudentLogged');
        if (isStudentLogged === "true") return true;
        else return false;
    }
}
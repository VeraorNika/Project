import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export class TeacherGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let isTeacherLogged = localStorage.getItem('isTeacherLogged');
        if (isTeacherLogged === "true") return true;
        else return false;
    }
}
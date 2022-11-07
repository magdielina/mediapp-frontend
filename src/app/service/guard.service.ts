import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../model/menu';
import { LoginComponent } from '../pages/login/login.component';
import { LoginService } from './login.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router,
    ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //1) VERIFY USER IS LOGGED
    let logged = this.loginService.isLogged();
    let logout = false;
    if(!logged){
      logout = true;
    }
    // 2) VERIFY IF TOKEN NOT EXPIRED
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    if(!helper.isTokenExpired(token)){
      // 3) CHECK ROL
      let url = state.url;
      const decodedToken = helper.decodeToken(token);
      const username = decodedToken.user_name;
      return this.menuService.getMenusByUser(username).pipe(map( (data: Menu[]) => {
        this.menuService.setMenuChange(data);
        let cont = 0;
        for (let m of data) {
          if (url.startsWith(m.url)) {
            cont++;
            break;
          }
        }
        if (cont > 0) {
          return true;
        } else {
          this.router.navigate(['/pages/not-403']);
          return false;
        }
      }));
    } else {
      logout = true;
    }

    if(logout){
      this.loginService.logout();
      return false;
    }
    return true;
  }
}

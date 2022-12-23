import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  loadingStatus = new BehaviorSubject<boolean>(false);

  private userData = new BehaviorSubject<any>(
    JSON.parse(sessionStorage.getItem('user') || '{}')
  );

  constructor(private http: HttpClient, private router : Router) { }

  userlogin(formDate: any): Observable<any> {
    return this.http.post(`${environment.API_BASE}/login`, FormData)
  }

  getUserData(): Observable<any> {
    return this.userData.asObservable();
  }

  setUserData(user: any) {
    // console.log(`got to set user data as ${JSON.stringify(user)}`)
    this.userData.next(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user');
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  getToken() {
    return this.getUser()?.token ;
  }

  getLoadingStatus():Observable<boolean> {
    return this.loadingStatus;
  }

  setLoadingStatus(status:boolean) {
    this.loadingStatus.next(status);
  }

}

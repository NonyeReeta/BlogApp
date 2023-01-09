import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  loadingStatus = new BehaviorSubject<boolean>(false);

  private userData = new BehaviorSubject<any>(
    sessionStorage.getItem('user') || '{}'
  );

  constructor(private http: HttpClient, private router : Router) { }

  userlogin(formData: any): Observable<any> {
    return this.http.post(`${environment.API_BASE}/login`, formData)
  }

  userSignup(formData: any): Observable<any> {
    return this.http.post(`${environment.API_BASE}/signup`, formData)
  }

  getArticles(pageNumber: number, numberPerPage: number): Observable<any> {
    const params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('numberPerPage', numberPerPage.toString());
    return this.http.get(`${environment.API_BASE}/articles`, {params})
  }

  getArticle(title: string): Observable<any> {
    return this.http.get(`${environment.API_BASE}/articles/article/${title}`)
  }

  getArticlesByLoggedInUser(email: string): Observable<any> {
    return this.http.get(`${environment.API_BASE}/articles/${email}/user-page`)
  }

  publishArticle( email: any, title: string): Observable<any> {
    return this.http.put(`${environment.API_BASE}/articles/${email}/state/${title}`, {email,title});
  }

  deleteArticle( email: any, title: any ): Observable<any> {
    return this.http.delete(`${environment.API_BASE}/articles/${email}/${title}/delete`);
  }

  createArticle(formData: any, userInfo: any): Observable<any> {
    return this.http.post(`${environment.API_BASE}/articles/${userInfo.email}/create`, formData, userInfo)
  }

  getArticleForEdit(title: string): Observable<any> {
    return this.http.get(`${environment.API_BASE}/articles/editarticle/${title}`)
  }

  editArticle( formData: any, userInfo: any ): Observable<any> {
    return this.http.put(`${environment.API_BASE}/articles/${userInfo.email}/${userInfo.title}/edit`, formData)
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
    return sessionStorage.getItem('user') || '{}';
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

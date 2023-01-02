import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { catchError, first, throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  error:string = ''
  hide = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  signup() {
    this.apiService.setLoadingStatus(true);     
    this.apiService.userSignup(this.registerForm.value).pipe(catchError((error) => {
    this.error = 'User already exist'
    this.apiService.setLoadingStatus(false);
    return throwError(error);
    }))
    .subscribe((res) => {
      console.log(res)
    this.apiService.setUserData(res.user);
    this.error = '';      
    this.router.navigate([''])
    this.apiService.setLoadingStatus(false);
  });

  // this.apiService.userSignup(this.registerForm.value).pipe(first())
  // .subscribe(res => {
  //       console.log(res)
  //     this.apiService.setUserData(res.user);
  //     this.router.navigate([''])
  //     this.error = '';      
  //     this.apiService.setLoadingStatus(false);
  // },
  // error => {
  //     this.error = 'User already exist'
  //   this.apiService.setLoadingStatus(false);
  // }
  // )
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  error:string = ''
  hide = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  login() {
    this.apiService.setLoadingStatus(true);
    this.apiService.userlogin(this.loginForm.value).subscribe(res => {
      if(res.error){
        this.error = res.error;
      }
      else{
        // route to home page and set error to empty string
        this.apiService.setUserData(res.user);
        this.router.navigate([''])
        this.error = ''
      }
      this.apiService.setLoadingStatus(false);
    },
    (error) => {
      this.error = 'Something went wrong, please contact administrator'
        this.apiService.setLoadingStatus(false);
    }
    )
  }
}

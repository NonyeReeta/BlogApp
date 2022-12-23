import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


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
      console.log(res.message);
    })
  }
}

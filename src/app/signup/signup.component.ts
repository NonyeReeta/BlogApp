import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

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

    try{
     
    this.apiService.userSignup(this.registerForm.value).subscribe((res) => {
        this.apiService.setUserData(res.user);
        // this.router.navigate([''])
        this.error = '';      
      this.apiService.setLoadingStatus(false);
    });
    }
    catch(error) {
        this.error = "User already registered"
        this.apiService.setLoadingStatus(false);
    }

  }
}

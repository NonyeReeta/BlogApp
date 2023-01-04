import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  user: any = {}

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

    createArticleForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required)
    })
  error: string = '';
  ngOnInit(): void {
    this.apiService.getUserData().subscribe(user => {
      this.user = JSON.parse(user)
    })
  }

  createArticle() {
    const {email, lastName, firstName} = this.user
    this.apiService.createArticle(this.createArticleForm.value, {email, firstName, lastName}).subscribe(res => {
      if(res.status === 500) {
        this.error = res.error
      }
    })
    console.log(this.createArticleForm.value)
    // this.router.navigate([`/profile/${email}`])
  }
}

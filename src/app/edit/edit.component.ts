import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title: any = '';
  article: any = {}

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  editArticleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required)
  })
error: string = '';
user: any = {};

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('title');
    this.apiService.getArticleForEdit(this.title).subscribe(article => {
    this.article = article
    })
    this.apiService.getUserData().subscribe(user => {
      this.user = JSON.parse(user)
    })
  }

  submitArticle() {
    this.user.title = this.title
    this.apiService.editArticle(this.editArticleForm.value, this.user).subscribe(res => {
      // handle successful response
      this.error = ''
    this.router.navigate([`/profile/${this.user.email}`])
    }, error => {
      if (error) {
        this.error = error.error
        console.log(error.error)
      }
    }
  
)
  }

}

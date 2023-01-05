import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  articles: any = [];
  searchTerm: string = '';
  sortTerm: string = '';
  userEmail: any = '';
  username: string = '';
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.apiService.getUserData().subscribe(data => {
      const userData = JSON.parse(data)
      this.username = userData.firstName + ' ' + userData.lastName;
    })
    this.route.paramMap.subscribe(params => {
      this.userEmail = params.get('email');
    })
    this.apiService.getArticlesByLoggedInUser(this.userEmail).subscribe(articles => {
      this.articles = articles;
    })
  }

  publishArticle(title:string){
    this.apiService.publishArticle(this.userEmail,title).subscribe(article => {
      location.reload()
    })
  }

  deleteArticle(title:string){
    this.apiService.deleteArticle(this.userEmail,title).subscribe(article => {
      location.reload();
    });
  }

}

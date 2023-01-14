import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: any = [];
  searchTerm: string = '';
  sortTerm: string = '';
  pageNumber: number = 1;
  hideNext: boolean = false;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadArticles();
};

  loadArticles() {
  this.apiService.getArticles(this.pageNumber).subscribe(data => {
    this.articles = data
  })
}

nextPage() {
  this.pageNumber ++;
  this.apiService.getArticles(this.pageNumber).subscribe(data => {
    this.articles = data
  })
  // TODO ADD CHECK TO hide NEXT BUTTON
  this.apiService.getArticles(this.pageNumber + 1).subscribe(data => {
    this.hideNext = data.length === 0 ? true : false;
  })
}

previousPage() {
  this.pageNumber --;
  this.apiService.getArticles(this.pageNumber).subscribe(data => {
    this.articles = data
    this.hideNext = data.length === 0 ? true : false;
  })
}

}

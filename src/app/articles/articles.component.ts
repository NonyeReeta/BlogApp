import { Component, OnInit } from '@angular/core';
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
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getArticles().subscribe(
      articles => {
        this.articles = articles;
  })
};

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  title: any = '';
  article: any = {}
  constructor(private apiService: ApiService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('title');
    this.apiService.getArticle(this.title).subscribe(
      article => 
      {
        this.article = article;
        console.log(article);
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    if(this.apiService.getUser()) {
      this.username = this.apiService.getUser().firstName;
      console.log(this.apiService.getUser())
    }
  }

}

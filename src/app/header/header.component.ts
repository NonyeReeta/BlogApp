import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  loggedin: boolean = false;
  constructor(private apiService: ApiService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loggedin = this.apiService.isLoggedIn();
    if(this.apiService.getUser() !== null) {
      const user = JSON.parse(this.apiService.getUser())
      this.username = user.firstName;
    }
    if(!this.loggedin) {
      this.username = 'Guest'
    }
  }
  logout(){
    this.apiService.logout();
    location.reload();
  }

}

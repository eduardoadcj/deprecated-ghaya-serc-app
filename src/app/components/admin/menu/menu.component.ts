import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, faTachometerAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  faTachometerAlt = faTachometerAlt;
  faUserFriends = faUserFriends;

  currentRoute: string = "";

  constructor(private router: Router) {
    this.getCurrentRoute();
  }

  ngOnInit(): void {
  }

  getCurrentRoute(): void {
    this.currentRoute = this.router.url;
  }

}

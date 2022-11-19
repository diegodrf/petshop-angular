import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user?: User | null;

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.securityService.getUser();
  }

  logOut() {
    this.securityService.clear();
    this.router.navigate(['/login'])
  }
}

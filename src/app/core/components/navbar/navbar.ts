import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

interface NavLink {
  text: string;
  goTo: string;
}
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  public listLinks: Array<NavLink> = [
    { text: 'nav.menu1', goTo: '/dashboard/links' },
    { text: 'nav.menu2', goTo: '/dashboard/form-link' },
  ];

  constructor(
    private router: Router
  ) {
  }

  public clickLink(link: string) {
    this.router.navigateByUrl(link);
  }

  public getActive(link: string) {
    return link === this.router.url;
  }
}

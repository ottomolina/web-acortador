import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

declare var bootstrap: any;
interface NavLink {
  text: string;
  goTo: string;
  listClass: string
}
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  @Output() public onCloseSession = new EventEmitter();

  public listLinks: Array<NavLink> = [
    { text: 'nav.menu1', goTo: '/dashboard/links', listClass: '' },
    { text: 'nav.menu2', goTo: '/dashboard/form-link', listClass: '' },
    { text: 'nav.menu3', goTo: '#', listClass: 'd-flex d-md-none' },
  ];

  constructor(
    private router: Router
  ) {
  }

  clickToggle() {
    const collapse = document.getElementById('navbarNav');
    const col = new bootstrap.Collapse(collapse);
    col.show();
  }

  public clickLink(link: string) {
    link === '#' && this.clickCloseSession();
    link !== '#' && this.router.navigateByUrl(link);
  }

  public getActive(link: string) {
    return link === this.router.url;
  }


  public clickCloseSession() {
    this.onCloseSession.emit();
  }
}

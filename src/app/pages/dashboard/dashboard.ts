import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "../../core/components/navbar/navbar";
import { ConfirmationModal } from '../../core/components/confirmation-modal/confirmation-modal';
import { ModalOptions } from '../../core/interfaces/modal-options.interface';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Navbar, ConfirmationModal, TranslatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export default class Dashboard {
  @ViewChild('modalLogout') public modalLogout: ConfirmationModal;

  public modalOptions: ModalOptions = {
    title: "modal-close-session.title",
    textAccept: "modal-close-session.button-accept",
    textCancel: "modal-close-session.button-cancel",
    classBtnAccept: "btn-danger",
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth,
  ) { }

  public eventLogout() {
    this.modalLogout.show();
  }

  public async logout() {
    this.modalLogout.hide();
    await this.auth.signOut();
    this.authService.logout();
    await this.router.navigateByUrl('/login');
  }
}

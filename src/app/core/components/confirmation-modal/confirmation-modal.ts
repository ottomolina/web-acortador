import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ModalOptions } from '../../interfaces/modal-options.interface';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;
@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.scss'
})
export class ConfirmationModal implements OnInit {
  private alertModal: any;
  @Input() public options: ModalOptions;
  @Input() public id: string = '';

  @Output() public onAccept = new EventEmitter();
  @Output() public onCancel = new EventEmitter();

  public ngOnInit(): void {
    setTimeout(() => {
      this.alertModal = new bootstrap.Modal('#alertModal'+this.id);
    }, 100);
  }

  public show() {
    this.alertModal.show();
  }

  public hide() {
    this.alertModal.hide();
  }

  public acceptModal() {
    this.onAccept.emit();
  }

  public cancelModal() {
    this.hide();
    this.onCancel.emit();
  }

}

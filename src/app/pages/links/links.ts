import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Tabbar } from "../../core/components/tabbar/tabbar";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ShortLink } from '../../core/interfaces/short-link.model';
import { LinksService } from '../../core/services/links/links.service';
import { App } from '../../app';
import { ItemLink } from "../../core/components/item-link/item-link";
import { Pagination } from "../../core/components/pagination/pagination";
import { ConfirmationModal } from "../../core/components/confirmation-modal/confirmation-modal";
import { ModalOptions } from '../../core/interfaces/modal-options.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-links',
  imports: [CommonModule, Tabbar, TranslatePipe, ItemLink, Pagination, ConfirmationModal],
  templateUrl: './links.html',
  styleUrl: './links.scss'
})
export default class Links implements OnInit {
  @ViewChild('modalConfirm') public modalConfirm: ConfirmationModal;
  public listaLinks: Array<ShortLink>=[];
  public listaLinksAux: Array<ShortLink>=[];
  
  public initial: number = 0;
  public final: number = 10;

  public modalOptions: ModalOptions = {
    title: "links.modal-inactivate.title",
    textAccept: "links.modal-inactivate.button-accept",
    textCancel: "links.modal-inactivate.button-cancel",
    classBtnAccept: "btn-danger",
  };
  
  constructor(
    public linkService: LinksService,
    private app: App,
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef,
    public sanitized: DomSanitizer,
  ) {
    this.final = app.sizePagination;
  }

  public ngOnInit(): void {
    this.listaLinks = [];
    this.linkService.getData().subscribe({
      next: result => {
        this.listaLinks = result;
        this.listaLinksAux = result;
        this.cdRef.detectChanges();
      },
      error: error => {
        console.error('error', error);
        this.app.toast.error(this.translate.instant('links.error.load-data'));
      }
    });
  }

  public changePage(number: number) {
    this.initial = (this.app.sizePagination*number)-this.app.sizePagination;
    this.final = (this.app.sizePagination*number);
  }

  public search(word: string) {
    this.listaLinks = this.listaLinksAux.filter(e => e.urlOriginal.toLowerCase().includes(word.toLowerCase()));
  }

  public item: ShortLink;
  public changeStateItem(item: ShortLink) {
    this.item = item;
    this.setModalOptions()
    this.modalConfirm.show();
  }

  private setModalOptions() {
    this.modalOptions = {
      title: `links.modal-${this.item.state?'':'in'}activate.title`,
      textAccept: `links.modal-${this.item.state?'':'in'}activate.button-accept`,
      textCancel: `links.modal-${this.item.state?'':'in'}activate.button-cancel`,
      classBtnAccept: this.item.state?'btn-success':'btn-danger'
    }
  }

  public getDescription() {
    if(!this.item) {
      return '';
    }
    let description;
    if(this.item.state) {
      description = this.translate.instant('links.modal-activate.description');
    } else {
      const translateValue = this.translate.instant('links.modal-inactivate.description');
      description = this.sanitized.bypassSecurityTrustHtml(translateValue);
    }
    return description;
  }

  public cancelModal() {
    this.item.state = !this.item.state;
  }

  public async changeState() {
    try {
      const message = `links.alert.${this.item.state ? '' : 'in' }activate`;
      await this.linkService.updateState(this.item.id!, this.item.state);
      this.modalConfirm.hide();
      
      setTimeout(() => {
        alert(this.translate.instant(message));
      }, 500);
    } catch(error) {
      console.error('error', error);
      this.app.toast.error(this.translate.instant('links.error.change-state'));
    }
  }

}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Tabbar } from "../../core/components/tabbar/tabbar";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ShortLink } from '../../core/interfaces/short-link.model';
import { LinksService } from '../../core/services/links/links.service';
import { App } from '../../app';
import { ItemLink } from "../../core/components/item-link/item-link";

@Component({
  selector: 'app-links',
  imports: [CommonModule, Tabbar, TranslatePipe, ItemLink],
  templateUrl: './links.html',
  styleUrl: './links.scss'
})
export default class Links implements OnInit {
  public listaLinks: Array<ShortLink>;
  
  constructor(
    public linkService: LinksService,
    private app: App,
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.listaLinks = [];
    this.linkService.getData().subscribe({
      next: result => {
        this.listaLinks = result;
        this.cdRef.detectChanges();
      },
      error: error => {
        console.error('error', error);
        this.app.toast.error(this.translate.instant('links.error.load-data'));
      }
    });
  }
}

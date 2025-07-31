import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Tabbar } from "../../core/components/tabbar/tabbar";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { App } from '../../app';
import { UrlValidator } from '../../shared/validators/url.validator';
import { ShortLink } from '../../core/interfaces/short-link.model';
import { LinksService } from '../../core/services/links/links.service';
import { ButtonCopy } from "../../core/components/button-copy/button-copy";

@Component({
  selector: 'app-form-link',
  imports: [CommonModule, FormsModule, Tabbar, TranslatePipe, ButtonCopy],
  templateUrl: './form-link.html',
  styleUrl: './form-link.scss'
})
export default class FormLink {

  public txtUrl: string = '';
  public error: string = '';
  public showSuccessAlert: boolean = false;
  public shortLink: ShortLink;
  public disabledBtnAction: boolean = false;
  public textBtnCopy = 'item-link.button-copy';

  constructor(
    public app: App,
    private translate: TranslateService,
    private linkService: LinksService,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  public async clickAdd() {
    if(!this.verifyUrl()){
      return ;
    }
    this.disabledBtnAction = true;
    const model: ShortLink = {
      urlOriginal: this.txtUrl,
      urlShorten: this.generateString(),
      state: true,
      date: this.app.getDate(),
    }
    try {
      await this.linkService.add(model);
      this.showSuccessAlert = true;
      this.shortLink = model;
      this.txtUrl = '';
      this.disabledBtnAction = false;
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.showSuccessAlert = false;
        this.cdRef.detectChanges();
      }, 2500);
    } catch(error) {
      this.disabledBtnAction = false;
      console.error('error', error);
      this.app.toast.error(this.translate.instant('form-link.error.add-link'));
    }
  }

  private verifyUrl(): boolean {
    this.error = '';
    if(!this.txtUrl.trim()) {
      this.error = this.translate.instant('form-link.error.txt-url-blank');
      return false;
    }
    try {
      UrlValidator.testUrl(this.txtUrl);
    } catch (error: any) {
      this.error = this.translate.instant('form-link.error.txt-url-invalid');
      return false;
    }
    return true;
  }

  private characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  private generateString(length: number = 8): string {
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    }
    return result;
  }

}

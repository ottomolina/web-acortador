import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-button-copy',
  imports: [TranslatePipe],
  templateUrl: './button-copy.html',
  styleUrl: './button-copy.scss'
})
export class ButtonCopy {
  @Input() textToCopy: string;
  
  public textButton: string = 'button-copy.text';

  constructor(
    private cdRef: ChangeDetectorRef, 
  ) {
  }

  public clickButton() {
    navigator.clipboard.writeText(this.textToCopy).then();
    this.textButton = 'button-copy.text-copied'
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.textButton = 'button-copy.text'
      this.cdRef.detectChanges();
    }, 2000);
  }
}

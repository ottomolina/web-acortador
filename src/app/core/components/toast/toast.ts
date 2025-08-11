import { Component } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {
  public message: string;
  public class: string = 'text-bg-danger';

  constructor() { }

  public info(message: string) {
    this.message = message;
    this.class = 'text-bg-primary';
    this.show();
  }
  
  public success(message: string) {
    this.message = message;
    this.class = 'text-bg-success';
    this.show();
  }
  
  public error(message: string) {
    this.message = message;
    this.class = 'text-bg-danger';
    this.show();
  }

  private show() {
    const toastLive = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive)
    toastBootstrap.show();
  }

}

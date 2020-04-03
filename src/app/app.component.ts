import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  isFacebookAppCheck: boolean;

  constructor() {
    this.isFacebookAppCheck = this.isFacebookApp();
  }

  isFacebookApp() {
    // @ts-ignore
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1) || (ua.indexOf('Instagram') > -1);
  }
}

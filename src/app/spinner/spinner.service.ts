import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  loadingStatus: Subject<boolean> = new Subject();

  start() {
    document.body.classList.add('no-scroll');
    this.loadingStatus.next(true);
  }

  stop() {
    document.body.classList.remove('no-scroll');
    this.loadingStatus.next(false);
  }
}

import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [ './spinner.component.css' ]
})
export class SpinnerComponent implements OnInit {

  isLoading: boolean;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.spinnerService
      .loadingStatus
      .subscribe((value) => {
        this.isLoading = value;
      });
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatementFormComponent } from './statement-form/statement-form.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    StatementFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SignaturePadModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

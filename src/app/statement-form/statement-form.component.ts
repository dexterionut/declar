import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { Statement } from '../models/statement';
import { Reason } from '../models/reason';
import { ReasonsService } from '../services/reasons.service';
import { DataStoreService } from '../services/data-store.service';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-statement-form',
  templateUrl: './statement-form.component.html',
  styleUrls: [ './statement-form.component.css' ]
})
export class StatementFormComponent implements OnInit, AfterViewInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  formData: Statement;
  signaturePadOptions: any;

  reasons: Reason[];

  constructor(private reasonsService: ReasonsService,
              private dataStoreService: DataStoreService,
              private templateService: TemplateService) {

    this.signaturePadOptions = {
      minWidth: 1,
    };
  }

  ngOnInit(): void {
    this.getReasons();
    this.formData = this.dataStoreService.get();
  }

  ngAfterViewInit(): void {
    this.loadSignature();
  }

  getReasons() {
    this.reasonsService
      .getReasons()
      .subscribe((data: Reason[]) => {
        this.reasons = data;
      });
  }

  loadSignature() {
    const signatureCanvas = document.querySelector('canvas');
    signatureCanvas.style.width = '100%';
    signatureCanvas.style.height = '100%';
    this.signaturePad.resizeCanvas();
    this.signaturePad.clear();
  }

  saveStatement() {
    this.dataStoreService.save(this.formData);
  }

  downloadStatement() {
    this.formData.signatureSrc = this.signaturePad.toDataURL();
    this.templateService.download(this.formData);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.signaturePad.resizeCanvas();
  }
}

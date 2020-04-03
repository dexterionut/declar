import { Injectable } from '@angular/core';
import { Statement } from '../models/statement';
import { templateString } from '../statement-template';
import * as html2canvas from 'html2canvas';
import * as JsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  templateVariables: string[] = [
    'firstName',
    'lastName',
    'birthDay',
    'birthMonth',
    'birthYear',
    'city',
    'county',
    'streetName',
    'streetNo',
    'building',
    'buildingEntrance',
    'floor',
    'apartmentNo',
    'destinations',
    'date',
    'signatureSrc',
    'reason_1',
    'reason_2',
    'reason_3',
    'reason_4',
    'reason_5',
    'reason_6',
    'reason_7',
    'reason_8',
    'reason_9',
    'reason_10',
  ];

  constructor() {
  }

  private prepareTemplate(data: Statement): string {
    const regExStr = '{{' + this.templateVariables.join('}}|{{') + '}}';
    const regExpPattern = new RegExp(regExStr, 'gi');
    const explodedBirthDay = data.birthDate.toLocaleDateString('ro').split('.');

    const mapObj = {
      ...data,
      birthDay: explodedBirthDay[0],
      birthMonth: explodedBirthDay[1],
      birthYear: explodedBirthDay[2],
      date: data.date.toLocaleDateString('ro'),
      building: data.building ? 'Bloc ' + data.building + ',' : '',
      buildingEntrance: data.buildingEntrance ? 'Sc. ' + data.buildingEntrance + ',' : '',
      floor: data.floor ? 'Et. ' + data.floor + ',' : '',
      apartmentNo: data.apartmentNo ? 'Ap. ' + data.apartmentNo : '',
    };
    mapObj[data.reasonNumber] = 'selected';

    return templateString.replace(regExpPattern, (matched) => {
      const variableName = matched.substring(2, matched.length - 2);
      return mapObj[variableName] ? mapObj[variableName] : '';
    });
  }

  private convertToPng(htmlString): Promise<any> {
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.id = 'pdfContainer';
      iframe.width = '710px';
      iframe.height = '842px';
      document.body.append(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      iframeDoc.open();
      iframeDoc.write(htmlString);
      iframeDoc.close();

      // @ts-ignore
      html2canvas(iframeDoc.body).then((canvas) => {
        resolve({
          img: canvas.toDataURL('image/png', 1),
          canvasWidth: canvas.width,
          canvasHeight: canvas.height
        });
        iframe.remove();
      });
    });
  }

  download(data: Statement) {
    const htmlString = this.prepareTemplate(data);

    this.convertToPng(htmlString)
      .then((html2canvasData: any) => {

        const doc: JsPDF = new JsPDF('p', 'px', 'a4');
        doc.addImage(html2canvasData.img, 'PNG', 28, 15, 440, 710);

        // current date(day and month) formatted like this 27.03.2020 => 27_03_2020
        const currentDayMonth = (new Date()).toLocaleDateString('ro').replace(/\./g, '_');
        const fileName = 'declaratie_pe_propria_raspundere_covid_' + currentDayMonth + '.pdf';

        doc.save(fileName);
      });
  }
}

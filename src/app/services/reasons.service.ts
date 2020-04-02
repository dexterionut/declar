import { Injectable } from '@angular/core';
import { Reason } from '../models/reason';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReasonsService {

  constructor() {
  }

  getReasons(): Observable<Reason[]> {
    return of([
      {
        id: 'reason_1',
        description: 'interes profesional, inclusiv între locuință/gospodărie și locul/locurile de desfășurare a activității profesionale și înapoi;'
      } as Reason,
      {
        id: 'reason_2',
        description: 'asigurarea de bunuri care acoperă necesitățile de bază ale persoanelor și animalelor de companie;'
      } as Reason,
      {
        id: 'reason_3',
        description: 'asistență medicală care nu poate fi amânată și nici realizată de la distanță;'
      } as Reason,
      {
        id: 'reason_4',
        description: 'motive justificate, precum îngrijirea/ însoțirea unui minor/copilului, asistența persoanelor vârstnice, bolnave sau cu dizabilități ori deces al unui membru de familie'
      } as Reason,
      {
        id: 'reason_5',
        description: 'activitate fizică individuală (cu excluderea oricăror activități sportive de echipă)'
      } as Reason,
      {
        id: 'reason_6',
        description: 'realizarea de activități agricole'
      } as Reason,
      {
        id: 'reason_7',
        description: 'donarea de sânge, la centrele de transfuzie sanguină'
      } as Reason,
      {
        id: 'reason_8',
        description: 'scopuri umanitare sau de voluntariat'
      } as Reason,
      {
        id: 'reason_9',
        description: 'comercializarea de produse agroalimentare (în cazul producătorilor agricoli)'
      } as Reason,
      {
        id: 'reason_10',
        description: 'asigurarea de bunuri necesare desfășurării activității profesionale'
      } as Reason
    ]);
  }
}

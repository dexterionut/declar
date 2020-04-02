import { Injectable } from '@angular/core';
import { Statement } from '../models/statement';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  localStorageDataVar = 'form-data';

  constructor() {
  }

  save(data: Statement): void {
    localStorage.setItem(this.localStorageDataVar, JSON.stringify(data));
  }

  get(): Statement {
    const data = localStorage.getItem(this.localStorageDataVar);
    let statement;

    statement = new Statement();

    if (data) {
      statement = JSON.parse(data);
      if (statement.birthDate) {
        statement.birthDate = new Date(statement.birthDate);
      }
    }

    statement.date = new Date();
    return statement;
  }
}

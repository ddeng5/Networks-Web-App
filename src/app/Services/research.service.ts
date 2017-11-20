import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ResearchService {

  sendData$: Observable<any>;
  private receivedData = new Subject<any>();

  constructor() {
    this.sendData$ = this.receivedData.asObservable();
  }

  getData(): Observable<String> {
    return of('5');
  }

  receiveData(data) {
    console.log(data);
    this.receivedData.next(data);
  }

}

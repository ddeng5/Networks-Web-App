import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResearchService } from '../../Services/research.service';

@Component({
  selector: 'app-iptv',
  templateUrl: './iptv.component.html',
  styleUrls: ['./iptv.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IptvComponent implements OnInit {

  qosParameters = [
    'Thoroughput',
    'Latency',
    'Jitter'
  ];

  returnedResults;
  status = '';
  good = false;
  average = false;
  bad= false;
  message;

  constructor(private researchService: ResearchService) {
    this.researchService.sendData$.subscribe((data) => {
      this.displayData(data);
    });
  }

  ngOnInit() {
  }

  displayData(returnedResults) {
    this.returnedResults = returnedResults;
    this.status = this.returnedResults[3];
    this.good = false;
    this.average = false;
    this.bad = false;
    this.message = this.returnedResults[8];

    if (this.status == 'good') {
      this.good = true;
    }
    else if (this.status == 'bad') {
      this.bad = true;
    }
    else if (this.status == 'average') {
      this.average = true;
    }
    console.log(this.status);
    console.log(this.returnedResults);
  }

}

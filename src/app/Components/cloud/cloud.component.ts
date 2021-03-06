import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResearchService } from '../../Services/research.service';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CloudComponent implements OnInit {
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

  constructor(private researchService: ResearchService) {
    this.researchService.sendData$.subscribe((data) => {
      this.displayData(data);
    });
  }

  ngOnInit() {
  }

  displayData(returnedResults) {
    this.returnedResults = returnedResults;
    this.status = this.returnedResults[5];

  }
}

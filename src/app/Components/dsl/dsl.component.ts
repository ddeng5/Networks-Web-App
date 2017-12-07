import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResearchService } from '../../Services/research.service';

@Component({
  selector: 'app-dsl',
  templateUrl: './dsl.component.html',
  styleUrls: ['./dsl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DslComponent implements OnInit {

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
    this.status = this.returnedResults[6];

    if (this.status == 'good') {
      this.good = true;
      this.message = 'Compared to the performance of cable Internet service, DSL speed has historically been slower. However, the speed of DSL Internet is increasing as the technology improves and service providers upgrade their network infrastructure. The exact DSL speed you will enjoy varies depending on several factors.';
    }
    else if (this.status == 'bad') {
      this.bad = true;
      this.message = 'Compared to the performance of cable Internet service, DSL speed has historically been slower. However, the speed of DSL Internet is increasing as the technology improves and service providers upgrade their network infrastructure. The exact DSL speed you will enjoy varies depending on several factors.';
    }
    else if (this.status == 'average') {
      this.average = true;
      this.message = 'Compared to the performance of cable Internet service, DSL speed has historically been slower. However, the speed of DSL Internet is increasing as the technology improves and service providers upgrade their network infrastructure. The exact DSL speed you will enjoy varies depending on several factors.';
    }
    else {
      this.message = 'Sorry, this data is currently unavailable';
    }

  }

}

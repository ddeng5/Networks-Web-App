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

  selectedParam: String;

  constructor(private researchService: ResearchService) { }

  ngOnInit() { }

  sendData(): void {
    console.log("wow");
    this.researchService.receiveData(this.selectedParam);
  }

}

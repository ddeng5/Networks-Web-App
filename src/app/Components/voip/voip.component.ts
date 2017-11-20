import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResearchService } from '../../Services/research.service';

@Component({
  selector: 'app-voip',
  templateUrl: './voip.component.html',
  styleUrls: ['./voip.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VoipComponent implements OnInit {

  qosParameters = [
    'Thoroughput',
    'Latency',
    'Jitter'
  ];

  selectedParam: string;


  constructor(private researchService: ResearchService) { }

  ngOnInit() {
  }

}

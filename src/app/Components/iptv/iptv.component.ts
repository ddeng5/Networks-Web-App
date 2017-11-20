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

  selectedParam: string;

  constructor(private researchService: ResearchService) { }

  ngOnInit() {
  }

}

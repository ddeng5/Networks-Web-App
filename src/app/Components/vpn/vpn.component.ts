import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResearchService } from '../../Services/research.service';

@Component({
  selector: 'app-vpn',
  templateUrl: './vpn.component.html',
  styleUrls: ['./vpn.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VpnComponent implements OnInit {
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

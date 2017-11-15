import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}

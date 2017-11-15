import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}

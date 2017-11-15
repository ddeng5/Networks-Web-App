import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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


  constructor() { }

  ngOnInit() {
  }

}

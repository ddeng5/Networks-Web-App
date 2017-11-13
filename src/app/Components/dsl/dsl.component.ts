import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  selectedParam: string;

  constructor() { }

  ngOnInit() {
  }



}

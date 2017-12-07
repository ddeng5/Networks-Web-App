import { Component } from '@angular/core';
import { ResearchService } from './Services/research.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private researchService: ResearchService) {}

  title = 'Quality of Service Application';

  qosParameters = [
    'Latency',
    'Jitter',
    'Error Rate',
    'Throughput',
    'Bandwidth'
  ];

  selectedParam = '';
  latencyUnits = 'ms';
  jitterUnits = 'ms';
  errorRateUnits = '%';
  throughputUnits = 'Kbps';
  bandwidthUnits = 'Kbps';
  units = this.latencyUnits;
  submit = false;
  inputValue = '';
  extra;
  throughput = false;

  onSelect(qos) {
    if (qos == 'Latency') {
      this.throughput = false;
      this.units = this.latencyUnits;
    }
    else if (qos == 'Jitter') {
      this.throughput = false;
      this.units = this.jitterUnits;
    }
    else if (qos == 'Error Rate') {
      this.throughput = false;
      this.units = this.errorRateUnits;
    }
    else if (qos == 'Throughput') {
      this.throughput = true;
      this.units = this.throughputUnits;
    }
    else if (qos == 'Bandwidth') {
      this.throughput = false;
      this.units = this.bandwidthUnits;
    }
  }

  submitValue() {
    //show results component
    this.submit = true;
    this.researchService.receiveData(this.inputValue, this.selectedParam, this.extra);
  }



}

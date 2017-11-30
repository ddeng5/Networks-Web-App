import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quality of Service Application';

  qosParameters = [
    'Thoroughput',
    'Latency',
    'Jitter'
  ];

  selectedParam = '';
  units = 'gb/second';

  onSelect(qos) {
    if (qos == 'Latency') {
      console.log("wow");
      this.units = 'mb/sec';
    }
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}

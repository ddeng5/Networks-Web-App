import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ResearchService {

  sendData$: Observable<any>;
  private receivedData = new Subject<any>();
  inputValue = '';
  inputParam = '';

  //VOIP metrics
  goodVoipLatency = 150;
  badVoipLatency = 300;
  goodVoipJitter = 20;
  badVoipJitter= 50;
  goodVoipErrorRate = 1;
  badVoipErrorRate= 5;
  goodVoipThroughput = 650;
  badVoipThroughput = 90;
  goodVoipBandwidth = 64;
  badVoipBandwidth = 8;

  //IPTV Metrics
  goodIptvLatency = 100;
  badIptvLatency = 200;
  goodIptvJitter = 10;
  badIptvJitter = 50;
  goodIptvErrorRate = 1;
  badIptvErrorRate = 7;
  goodIptvThroughput = 'undefined';
  badIptvThroughput = 'undefined';
  goodIptvBandwidth = 18000;
  badIptvBandwidth = 2000;

  iptv = '';
  voip = '';

  //results are stored in the format: [input value, input qos parameter, voip status, iptv status]
  finalResults = {};



  constructor() {
    this.sendData$ = this.receivedData.asObservable();
  }


  receiveData(data, selectedParam) {
    console.log(data);
    this.inputValue = data;
    this.inputParam = selectedParam;

    this.compareData(data, selectedParam);
    this.finalResults = [this.inputValue, this.inputParam, this.iptv, this.voip];
    console.log(this.finalResults);
  }

  compareData(data, selectedParam) {
    //Latency
    if (selectedParam == 'Latency') {
      //voip
      if (data < this.goodVoipLatency) {
        this.voip = 'good';
      }
      else if (data > this.badVoipLatency) {
        this.voip = 'bad';
      }
      else {
        this.voip = 'average';
      }
      //iptv
      if (data < this.goodIptvLatency) {
        this.iptv = 'good';
      }
      else if (data > this.badIptvLatency) {
        this.iptv = 'bad';
      }
      else {
        this.iptv = 'average';
      }
    }

    //Jitter
    if (selectedParam == 'Jitter') {
      //voip
      if (data < this.goodVoipJitter) {
        this.voip = 'good';
      }
      else if (data > this.badVoipJitter) {
        this.voip = 'bad';
      }
      else {
        this.voip = 'average';
      }
      //iptv
      if (data < this.goodIptvJitter) {
        this.iptv = 'good';
      }
      else if (data > this.badIptvJitter) {
        this.iptv = 'bad';
      }
      else {
        this.iptv = 'average';
      }
    }

    //Error Rate
    if (selectedParam == 'Error Rate') {
      //voip
      if (data < this.goodVoipErrorRate) {
        this.voip = 'good';
      }
      else if (data > this.badVoipErrorRate) {
        this.voip = 'bad';
      }
      else {
        this.voip = 'average';
      }
      //iptv
      if (data < this.goodIptvErrorRate) {
        this.iptv = 'good';
      }
      else if (data > this.badIptvErrorRate) {
        this.iptv = 'bad';
      }
      else {
        this.iptv = 'average';
      }
    }

    //Throughput
    if (selectedParam == 'Throughput') {
      //voip
      if (data < this.goodVoipErrorRate) {
        this.voip = 'good';
      }
      else if (data > this.badVoipErrorRate) {
        this.voip = 'bad';
      }
      else {
        this.voip = 'average';
      }
    }

    //Bandwidth
    if (selectedParam == 'Bandwidth') {
      //voip
      if (data < this.goodVoipBandwidth) {
        this.voip = 'good';
      }
      else if (data > this.badVoipBandwidth) {
        this.voip = 'bad';
      }
      else {
        this.voip = 'average';
      }
      //iptv
      if (data < this.goodIptvBandwidth) {
        this.iptv = 'good';
      }
      else if (data > this.badIptvBandwidth) {
        this.iptv = 'bad';
      }
      else {
        this.iptv = 'average';
      }
    }




  }

}

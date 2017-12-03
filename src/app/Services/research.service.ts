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

  //VPN Metrics
  goodVpnLatency = 60;
  badVpnLatency = 150;
  goodVpnJitter = 20;
  badVpnJitter = 30;
  goodVpnErrorRate = 0.5;
  badVpnErrorRate = 1;
  goodVpnThroughput = '';
  badVpnThroughput = '';
  goodVpnBandwidth = '';
  badVpnBandwidth = '';


  //DSL metrics
  goodDslBandwidth = 300000;
  badDslBandwidth = 50000;

  iptv = '';
  voip = '';
  vpn = '';
  cloud = '';
  dsl = '';

  //results are stored in the format: [input value, input qos parameter, voip status, iptv status, vpn status]
  finalResults = {};
  extra;



  constructor() {
    this.sendData$ = this.receivedData.asObservable();
  }


  receiveData(data, selectedParam, extra) {
    console.log(data);
    this.inputValue = data;
    this.inputParam = selectedParam;
    this.extra = extra;

    this.compareData(data, selectedParam, extra);
    this.finalResults = [this.inputValue, this.inputParam, this.voip, this.iptv, this.vpn, this.cloud, this.dsl];
    this.receivedData.next(this.finalResults);
    console.log(this.finalResults);
  }

  compareData(data, selectedParam, extra) {
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
      //vpn
      if (data < this.goodVpnLatency) {
        this.vpn = 'good';
      }
      else if (data > this.badVpnLatency) {
        this.vpn = 'bad';
      }
      else {
        this.vpn = 'average';
      }
      //cloud
      this.cloud = 'This QoS factor will factor throughput and file transfer times - measured as a delay in the network';
      //dsl
      this.dsl = 'Latency is application/server dependent - measured as a delay in the network';
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
      //iptv
      if (data < this.goodVpnJitter) {
        this.vpn = 'good';
      }
      else if (data > this.badVpnJitter) {
        this.vpn = 'bad';
      }
      else {
        this.vpn = 'average';
      }
      //cloud
      this.cloud = 'This QoS factor is a measure of variation in latency and is dependent on the application, e.g. reliable access to a data source vs. unreliable';
      //dsl
      this.dsl = 'Jitter is application/server dependent - it is the difference in packet delay';
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
      //vpn
      if (data < this.goodVpnErrorRate) {
        this.vpn = 'good';
      }
      else if (data > this.badVpnErrorRate) {
        this.vpn = 'bad';
      }
      else {
        this.vpn = 'average';
      }
      //cloud
      this.cloud = 'This QoS factor is dependent on the application - low levels must be reached e.g. <1% for critical systems such as financial services or health related services';
      //dsl
      this.dsl = 'Error Rate is application/server dependent - for critical systems, should have near perfect error rate';
    }

    //Throughput
    if (selectedParam == 'Throughput') {
      //voip
      if (data > this.goodVoipErrorRate) {
        this.voip = 'good';
      }
      else if (data < this.badVoipErrorRate) {
        this.voip = 'bad';
      }
      else {
        this.voip = 'average';
      }

      this.iptv = 'Sorry, this data is currently unavailable';

      if (data > (0.7 / this.extra * 0.8)) {
        this.vpn = 'good';
      }
      else if (data < (0.7 / this.extra * 0.5)) {
        this.vpn = 'bad';
      }
      else {
        this.vpn = 'average';
      }
      //cloud
      this.cloud = 'This QoS factor is dependent on the latency between the application & the cloud data source, as well as the size of the TCP window size (e.g. either increase TCP window size and/or decrease latency)';
      //dsl
      this.dsl = 'QoS metric is application dependent - latency and TCP/UDP packet size affect this metric';
    }

    //Bandwidth
    if (selectedParam == 'Bandwidth') {
      //voip
      if (data > this.goodVoipBandwidth) {
        this.voip = 'good';
      }
      else if (data < this.badVoipBandwidth) {
        this.voip = 'bad';
      }
      else {
        this.voip = 'average';
      }
      //iptv
      if (data > this.goodIptvBandwidth) {
        this.iptv = 'good';
      }
      else if (data < this.badIptvBandwidth) {
        this.iptv = 'bad';
      }
      else {
        this.iptv = 'average';
      }
      //vpn
      this.vpn = 'Sorry, this data is currently unavailable';
      //cloud
      this.cloud = 'Throughput is dependent on the application at hand and how often data needs to be accessed (e.g. data warehouses vs. medical devices)';
      //dsl
      if (data > this.goodDslBandwidth) {
        this.dsl = 'good';
      }
      else if (data < this.badDslBandwidth) {
        this.dsl = 'bad';
      }
      else {
        this.dsl = 'average';
      }
    }
  }

}

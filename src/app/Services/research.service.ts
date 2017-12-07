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

  voipMessage;
  iptvMessage;


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
    this.finalResults = [this.inputValue, this.inputParam, this.voip, this.iptv, this.vpn, this.cloud, this.dsl, this.voipMessage, this.iptvMessage];
    this.receivedData.next(this.finalResults);
    console.log(this.finalResults);
  }

  compareData(data, selectedParam, extra) {
    //Latency
    if (selectedParam == 'Latency') {
      //voip
      if (data < this.goodVoipLatency) {
        this.voip = 'good';
        this.voipMessage = 'Latency, or delay, in networking defines how much time it takes for a packet of data to reach its destination. This metric affects how long before your voice is received on the other end in VoIP.\n' +
          ' \n' +
          '<150 ms is the threshold for latency for VoIP to be considered “Good” quality. Having a delay below this threshold ensures minimal confusion between participants in the call. There is minimal waiting time between saying something, and that message being received.\n';
      }
      else if (data > this.badVoipLatency) {
        this.voip = 'bad';
        this.voipMessage = 'Latency, or delay, in networking defines how much time it takes for a packet of data to reach its destination. This metric affects how long before your voice is received on the other end in VoIP.\n' +
          ' \n' +
          '>300 ms is the threshold of latency for which VoIP is considered “Poor” quality. Having a delay greater than this threshold will cause the VoIP call to have significant lag and the call frustrating to communicate i\n';
      }
      else {
        this.voip = 'average';
      }
      //iptv
      if (data < this.goodIptvLatency) {
        this.iptv = 'good';
        this.iptvMessage = 'This metric affects the length of time before the data is received during IPTV. This metric is closely related to jitter.\n' +
          ' \n' +
          '<100 ms is the threshold for latency for IPTV to be considered “Good” quality. Having a delay below this threshold ensures minimal delay from when the scene is broadcast to receiving it through IPTV\n';
      }
      else if (data > this.badIptvLatency) {
        this.iptv = 'bad';
        this.iptvMessage = 'This metric affects the length of time before the data is received during IPTV. This metric is closely related to jitter.\n' +
          ' \n' +
          '>200 ms is the threshold of latency for which IPTV is considered “Poor” quality. Having a delay greater than this threshold will cause a significant lag between the broadcast and receiving the signal through IPTV. However, other sources have claimed even a delay of 1s acceptable.\n';
      }
      else {
        this.iptv = 'average';
        this.iptvMessage = 'This metric affects the length of time before the data is received during IPTV. This metric is closely related to jitter.\n' +
          ' \n' +
          '100-200 ms is the range of latency for which IPTV is considered “Medium” quality. The delay between the broadcast and seeing it on IPTV is more pronounced, but not enough to upset the customer.\n';
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
        this.voipMessage = 'Jitter in networking defines the variation in delay of the packet. This metric is closely related to latency and affects how variable the lag in the call is.\n' +
          ' \n' +
          '<20 ms is the threshold for jitter to be considered “Good” quality. Having jitter below this threshold ensures the delay in the call is almost always constant. This reduces the confusion in the call and improves VoIP quality.\n';
      }
      else if (data > this.badVoipJitter) {
        this.voip = 'bad';
        this.voipMessage = 'Jitter in networking defines the variation in delay of the packet. This metric is closely related to latency and affects how variable the lag in the call is.\n' +
          ' \n' +
          '50ms is the threshold of jitter for which VoIP is considered “Poor” quality. Having jitter greater than this threshold will cause users to notice the significant variance in delay of the call. The VoIP call will be frustrating to use.\n';
      }
      else {
        this.voip = 'average';
        this.voipMessage = 'Jitter in networking defines the variation in delay of the packet. This metric is closely related to latency and affects how variable the lag in the call is.\n' +
          ' \n' +
          '20-50 ms is the range of jitter for which VoIP is considered “Medium” quality. Having jitter in this range may make the difference in delay in the call noticeable, but not impossible to ignore.\n';
      }
      //iptv
      if (data < this.goodIptvJitter) {
        this.iptv = 'good';
        this.iptvMessage = 'This metric is closely related to latency and affects how variable the lag in the IPTV stream is.\n' +
          ' \n' +
          '<10 ms is the threshold for jitter to be considered “Good” quality. Having jitter below this threshold ensures the delay in the IPTV stream is almost always constant. This reduces the confusion in the stream and improves customer satisfaction.\n';
      }
      else if (data > this.badIptvJitter) {
        this.iptv = 'bad';
        this.iptvMessage = 'This metric is closely related to latency and affects how variable the lag in the IPTV stream is.\n' +
          ' \n' +
          '50ms is the threshold of jitter for which IPTV is considered “Poor” quality. Having jitter greater than this threshold will cause users to notice the significant stuttering in the stream. The IPTV stream will be frustrating to use and may stop altogether.\n';
      }
      else {
        this.iptv = 'average';
        this.iptvMessage = 'This metric is closely related to latency and affects how variable the lag in the IPTV stream is.\n' +
          ' \n' +
          '10-50 ms is the range of jitter for which IPTV is considered “Medium” quality. Having jitter in this range may cause a few stutters in the stream, upsetting the customer; however, the number of stutters is minimal.\n';
      }
      //vpn
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
        this.voipMessage = 'Error rate, or packet loss rate, defines the percentage of packets that are dropped. This metric affects how much of the data (voice) you send is lost and has to be sent again.\n' +
          ' \n' +
          '<1% is the threshold for error rate to be considered “Good” quality. Having an error rate below this threshold places minimal stress on the routers and ensures the call is smooth.\n';
      }
      else if (data > this.badVoipErrorRate) {
        this.voip = 'bad';
        this.voipMessage = 'Error rate, or packet loss rate, defines the percentage of packets that are dropped. This metric affects how much of the data (voice) you send is lost and has to be sent again.\n' +
          ' \n' +
          '>5% is the threshold for error rate for which VoIP is considered “Bad”. Having an error rate greater than this threshold will cause constant, noticeable gaps in the VoIP call. The call may be dropped altogether due to excessive packet loss.\n';
      }
      else {
        this.voip = 'average';
        this.voipMessage = 'Error rate, or packet loss rate, defines the percentage of packets that are dropped. This metric affects how much of the data (voice) you send is lost and has to be sent again.\n' +
          ' \n' +
          '1-5% is the range of error rate for which VoIP is considered “Medium” quality. Having an error rate in this range may cause some noticeable gaps in the VoIP call, but not enough for the call to be unmanageable\n';
      }
      //iptv
      if (data < this.goodIptvErrorRate) {
        this.iptv = 'good';
        this.iptvMessage = 'This metric affects how much of the data (audio and visual) you receive is lost and has to be sent again.\n' +
          ' \n' +
          '<0.0001% is the threshold for error rate to be considered “Good” quality. Having an error rate below this threshold ensures a consistently smooth stream without any stuttering or drop in quality.\n';
      }
      else if (data > this.badIptvErrorRate) {
        this.iptv = 'bad';
        this.iptvMessage = 'This metric affects how much of the data (audio and visual) you receive is lost and has to be sent again.\n' +
          ' \n' +
          '>1% is the threshold for error rate for which IPTV quality is considered “Bad”. Having an error rate greater than this threshold will cause significant freezing in the stream and pixilation. Having an IPTV stream with this error rate may be considered unwatchable by some customers.\n';
      }
      else {
        this.iptv = 'average';
        this.iptvMessage = 'This metric affects how much of the data (audio and visual) you receive is lost and has to be sent again.\n' +
          ' \n' +
          '0.0001 - 1% is the range of error rate for which IPTV quality is considered “Medium”. Having an error rate in this range may cause some noticeable stuttering and artifacts (e.g. freezing or pixilation).\n';
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
        this.voipMessage = 'Throughput is the rate of successful message delivery. This metric is closely tied to bandwidth and represents how much throughput your device uses to do a VoIP call.\n' +
          ' \n' +
          'Using the codec (compression technique) that ensures the best voice quality require a throughput of >650 kbits/s. Having a throughput greater than this threshold indicates good voice quality in the VoIP call.\n';
      }
      else if (data < this.badVoipErrorRate) {
        this.voip = 'bad';
        this.voipMessage = 'Throughput is the rate of successful message delivery. This metric is closely tied to bandwidth and represents how much throughput your device uses to do a VoIP call.\n' +
          ' \n' +
          'Very few codecs (compression techniques) used for VoIP require a throughput lower than 100 kbits/s. Having a throughput lower than this threshold indicates poor voice quality in the VoIP call and the session may be dropped.\n';
      }
      else {
        this.voip = 'average';
        this.voip = 'Throughput is the rate of successful message delivery. This metric is closely tied to bandwidth and represents how much throughput your device uses to do a VoIP call.\n' +
          ' \n' +
          'Most codecs (compression techniques) used for VoIP require a throughput within the range of 100-650 kbits/s. Having a throughput within this range indicates acceptable voice quality in the VoIP call.\n';
      }

      this.iptv = 'Sorry, this data is currently unavailable';
      this.iptvMessage = 'This metric is closely tied to bandwidth and represents how much data is successfully delivered during an IPTV stream.\n' +
        ' \n' +
        'Not enough research has been conducted in this area to provide a concreate range; however, throughput likely follows bandwidth closely given how similar the two parameter are.\n';

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
        this.voipMessage = 'Bandwidth is the maximum amount of data that can travel through a channel. This metric is closely tied to throughput and represents how much data is needed for a codec (compression technique) in VoIP to function.\n' +
          ' \n' +
          'Using the codec that ensures the best voice quality requires a bandwidth of 64 Kbps. The codec that uses this, G.711, doesn’t compress the data at all and can thus be viewed as the upper limit of voice quality.\n';
      }
      else if (data < this.badVoipBandwidth) {
        this.voip = 'bad';
        this.voipMessage = 'Bandwidth is the maximum amount of data that can travel through a channel. This metric is closely tied to throughput and represents how much data is needed for a codec (compression technique) in VoIP to function.\n' +
          ' \n' +
          'Few codecs (compression techniques) used in VoIP require a bandwidth of 8 or lower Kbps. Having a bandwidth in this range indicates one of the worst VoIP codecs and that better options are available.\n';
      }
      else {
        this.voip = 'average';
        this.voipMessage = 'Bandwidth is the maximum amount of data that can travel through a channel. This metric is closely tied to throughput and represents how much data is needed for a codec (compression technique) in VoIP to function.\n' +
          ' \n' +
          'Most codecs used in VoIP require a bandwidth between 8 and 64 Kbps. Having a bandwidth within this range indicates acceptable voice quality in the VoIP call.\n';
      }
      //iptv
      if (data > this.goodIptvBandwidth) {
        this.iptv = 'good';
        this.iptvMessage = 'This metric is closely tied to throughput and represents how much data is needed for a codec (compression technique) in IPTV to function.\n' +
          ' \n' +
          'The MPEG-2 HD codec requires the most bandwidth from 18-24 Mbps. Having a bandwidth of at least 18 Mbps will possibly let the customer stream IPTV content that uses this codec, and most other codecs comfortably.\n';
      }
      else if (data < this.badIptvBandwidth) {
        this.iptv = 'bad';
        this.iptvMessage = 'This metric is closely tied to throughput and represents how much data is needed for a codec (compression technique) in IPTV to function.\n' +
          ' \n' +
          'Having a bandwidth rate of less than 2 Mbps prevents the user from comfortably streaming any IPTV content. Expect to not even be able to stream standard definition IPTV content with a bandwidth lower than this threshold.\n';
      }
      else {
        this.iptv = 'average';
        this.iptvMessage = 'This metric is closely tied to throughput and represents how much data is needed for a codec (compression technique) in IPTV to function.\n' +
          ' \n' +
          'Most codecs used in IPTV use significantly less bandwidth than 18 Mbps. Having a bandwidth within the range of 2-18 Mbps ensures there will be at least one codec satisfied that will stream the IPTV content.\n';
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

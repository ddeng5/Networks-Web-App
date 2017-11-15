import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DslComponent } from './Components/dsl/dsl.component';
import { VoipComponent } from './Components/voip/voip.component';
import { IptvComponent } from './Components/iptv/iptv.component';
import { VpnComponent } from './Components/vpn/vpn.component';
import { CloudComponent } from './Components/cloud/cloud.component';


@NgModule({
  declarations: [
    AppComponent,
    DslComponent,
    VoipComponent,
    IptvComponent,
    VpnComponent,
    CloudComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

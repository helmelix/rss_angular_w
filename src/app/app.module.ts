import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { nvD3 } from 'ng2-nvd3';

//import 'bootstrap/dist/css/bootstrap.min.css';
//import '~/node_modules/bootstrap/dist/bootstrap.css'
//require("css!./bootstrap/dist/css/bootstrap.min.css");
import './test.css';

import { AppComponent }   from './app.component';
import { ChannelsComponent } from './components/channels.component';
import { ChannelComponent } from './components/channel.component';

import { AppStore }     from './store/store';
import { Channels }     from './services/channels.service';
import { ChannelService }     from './services/channel.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ AppComponent, ChannelsComponent, ChannelComponent, nvD3],
  providers: [Channels, AppStore, ChannelService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import 'rxjs/add/operator/map'      ///

import 'rxjs/Rx';                 ///

import { Injectable } from '@angular/core';

import { Channel}     from '../models/channel';

interface State {
  user: Object;
  isLoading: boolean;
  items: any[];
  channels: Channel[];
//  channels: {attributes :Channel,
//            id : string;
//            type :string
//            }[];
}

const state: State = {
  user: {},
  isLoading: false,
  items: [],
  channels: []
};


const store = new BehaviorSubject<State>(state);

@Injectable()
export class AppStore {
  store = store;
  changes = store
  .asObservable()
  .distinctUntilChanged()
  // log new state
  .do(changes => console.log('new state', changes))

  getState() {
    return this.store.value;
  }

  getStateNew() {
    return Object.assign({}, this.store.value)
  }

  setState(state: State) {
    console.log('setState ', state); // log update
    this.store.next(state);
  }

  //addChannels(channelToAdd : Channel) {
  addChannels(channelToAdd) {
    //console.log('setState ', state); // log update
      let  oldChannels = this.store.value.channels;
      //channelsToAdd.push(channelToAdd);
      let  channelsToAdd = oldChannels.concat(channelToAdd);
     let newState = Object.assign({}, this.store.value, { channels : channelsToAdd })
    this.store.next(newState);
  }

  deleteChannel(channel_id){
    let  oldChannels = this.store.value.channels;
    let findChannel = false;
    oldChannels.forEach((item, i, arr) => {
        if(item.id === channel_id){
          arr.splice(i, 1);
          findChannel = true;
        }
    })
    if(findChannel){
      let newChannelsList = Object.assign({}, this.store.value, { channels : oldChannels})
      this.store.next(newChannelsList);
    }
  }
}

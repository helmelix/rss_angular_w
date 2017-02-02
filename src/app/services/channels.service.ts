import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'      ///
//import 'rxjs/Rx';                 ///
import {Observable} from "rxjs/Observable";
import { Headers, RequestOptions } from '@angular/http';

import { Channel}     from '../models/channel';
import { AppStore }     from '../store/store';


@Injectable()
export class Channels {
  channels : Channel[];
  //private channelsApiUrl ='http://127.0.0.1:1338/channels';
  private channelsApiUrl ='http://54.187.164.175:1338/channels';

  constructor(private http: Http, private store : AppStore) {}
    getChannels (): Observable<Channel[]> {
      return this.http.get(this.channelsApiUrl)
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  addChannel (name: string, url: string): Observable<Channel> {
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let headers = new Headers({ 'Content-Type': 'application/vnd.api+json' });
    let options = new RequestOptions({ headers: headers });

    let body = JSON.stringify({data:{attributes:{name, url}}});
    //console.log(body);
    return this.http.post(this.channelsApiUrl, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  deleteChannel(channel_id){
    let headers = new Headers({ 'Content-Type': 'application/vnd.api+json' });
    let options = new RequestOptions({ headers: headers });
    let url = this.channelsApiUrl + '/' + channel_id
    this.http.delete(url, options)
                    .map(res=>{
                          this.store.deleteChannel(channel_id);
                    })
                    .catch(this.handleError)
                    .subscribe(
                            res => {//this.channels = channels
                                      console.log(channel_id, ' deleted')
                                    },
                            error =>  console.log(error));;
  }

  getChannelById(channel_id){
    return this.channels.forEach(function(item, i, arr) {
      if(item.id === channel_id) return item;
    });
  }
}

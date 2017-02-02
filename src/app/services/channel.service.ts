import { Injectable } from '@angular/core';

import { Http} from '@angular/http';
import 'rxjs/add/operator/map'; ////
//import 'rxjs/Rx';     ///
import {Observable} from "rxjs/Observable";

import { Channel}     from '../models/channel';
import { AppStore }     from '../store/store';


@Injectable()
export class ChannelService {

    constructor(private http: Http,  private store : AppStore) {}



    getNews(channel_id) {
      let appStore1 = this.store.getState();
      let channelToParse: Channel;
      appStore1.channels.forEach((item, i) => {
          if(item.id === channel_id){
            channelToParse = item;
          }
      })

      //let query = 'select * from rss(0, 5) where url = "' + channelToParse.url + '"';
      let query = 'select * from rss(0, 100) where url = "' + channelToParse.url + '"';
      let geturl='http://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent(query);
      //let geturl1='http://127.0.0.1:1338/channels/1423';
      console.log(geturl);
       return this.http.get(geturl)
                     .map(this.extractData)

    }

    private extractData(res) {
          let body = res.json();
          console.log(body);
          let feed = body.query.results.item
          let channelNews = [];
          for (let i=0, l=feed.length; i<l; i++){
            channelNews.push({'title' : feed[i].title,
                              'link' : feed[i].link,
                              'description' : feed[i].description})
          }
          console.log(channelNews);

          return channelNews || { };
    }


    getLettersRate(str){
        //var string = 'Подсчета dfкол-ва вхождений каждdykdyого символа в строке',
        function compareNumbers(a, b) {
            return a - b;
        }
        var sums = [];
        var otherSymbols = 0;
        var lettersRate = {};
        var str = str.toLowerCase();
        str.split('').map(function(e){
            	if(/[a-z]+/.test(e)){
                  lettersRate[e] = !lettersRate[e] ? 1 : lettersRate[e]+1;
           				 //sums[e] = !sums[e] ? 1 : sums[e]+1;
                   }
              else otherSymbols++;
        });
        if (otherSymbols) {lettersRate['other symbols'] = otherSymbols};
        console.log(lettersRate);
        return lettersRate;
    }


}

import { Component, EventEmitter, Input, Output, ViewChild, SimpleChanges } from '@angular/core';

import { Channel}     from '../models/channel';
import { ChannelService }     from '../services/channel.service';
import { AppStore }     from '../store/store';

import {BaseChartDirective} from "ng2-charts";

import {nvD3} from 'ng2-nvd3';
declare let d3:any;
//import {nvD3} from 'ng2-nvd3'
//declare let d3: any;
//nv = require('nvd3')
//var d3 = require('d3');
//import {d3} from 'd3';
//import * as d3 from 'd3';
//declare let d3:any;

@Component({
  selector: 'my-channel',
//  inputs: ['selectedChannel'],
  templateUrl: '../templates/channel.component.html'
})
export class ChannelComponent {
    @Input() selectedChannel: selectedChannel;
    @Output() onDelete = new EventEmitter<boolean>();

    //@ViewChild( 'myChart' ) chart222: BaseChartDirective;
    ///////////

//public description = 'description!';
    ////////////////
    public nubberOfNews;
    nvd3Options;
    nvd3Data;
    public selectedPost;
    public errorMessage;
    public allNews;
    public description;


    ngOnInit(){
    this.nvd3Options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
            };
    this.nvd3Data = [];
  }

////////////
    ngAfterViewInit(){
      //console.log(this.chart222);
    }

    constructor(private channelService: ChannelService, private store : AppStore) {
    }

    ngDoCheck() {
    }

    ngOnChanges(changes: SimpleChanges) {
      this.selectedPost ={};
      this.errorMessage = '';
      if(this.selectedChannel.id){
        this.channelService.getNews(this.selectedChannel.id)
          .subscribe(
                news => {
                          this.allNews = news;
                          this.nubberOfNews = news.length;
                        },
                error =>  {
                    this.errorMessage = <any>error
                    this.allNews = [];
                });
          }

    }




  delete(){
    this.onDelete.emit(this.selectedChannel);
    this.selectedChannel = {};
  }

  selectNews(news){
    this.selectedPost = news;
    this.description = news.description;
    let letters = this.channelService.getLettersRate(news.description);
    let newLetterData = [];
    function compareNumbers(a, b) {
      //  return a.y - b.y;
          return a.key - b.key;
    }

    for (var letter in letters) {
        newLetterData.push({
                            key: letter,
                            y: letters[letter]
                    });
    }
    newLetterData.sort(compareNumbers);
    this.nvd3Data = newLetterData;
  }

}

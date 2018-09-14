import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QuotePage } from '../quote/quote';
import { Quote } from '../../data/quote.interface';
import quotes from '../../data/quotes';

@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})

export class LibraryPage implements OnInit {
  quoteCollection: {category: string, quotes: Quote[], icon: string}[];
  ngOnInit() { 
    this.quoteCollection = quotes;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}

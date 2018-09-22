import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Quote} from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { QuotePage } from '../quote/quote';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private quotesService: QuotesService,
    private modalCtrl: ModalController
    ) {}
    
    ionViewWillEnter() {
      this.quotes = this.quotesService.getFavoriteQuotes();
    }
    onViewQuote(quote: Quote) {
      const modal = this.modalCtrl.create(QuotePage, quote);
      modal.present();
      modal.onDidDismiss((remove:boolean) => {
        if (remove) {
          this.quotesService.removeQuoteFromFavorites(quote);
          this.navCtrl.push(FavoritesPage);
          // this.quotes = this.quotesService.getFavoriteQuotes();
        }
      });
      // modal.onWillDismiss.subscribe(
      //   (remove: boolean) => console.log(remove)
      // )
    }
}

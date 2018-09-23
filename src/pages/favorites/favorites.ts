import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Quote} from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { QuotePage } from '../quote/quote';
import { SettingsService } from '../../services/settings';


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
    private modalCtrl: ModalController,
    private settingsService: SettingsService
    ) {}
    
    ionViewWillEnter() {
      this.quotes = this.quotesService.getFavoriteQuotes();
    }
    onViewQuote(quote: Quote) {
      const modal = this.modalCtrl.create(QuotePage, quote);
      modal.present();
      modal.onDidDismiss((remove:boolean) => {
        if (remove) {
          this.onRemoveFromFavorite(quote);
        }
      });
    }
    onRemoveFromFavorite(quote: Quote) {
      this.quotesService.removeQuoteFromFavorites(quote);
      const position = this.quotes.findIndex((quoteEl: Quote)=> {
        return quoteEl.id == quote.id;
      });
      this.quotes.splice(position, 1);
    }
    // getBackground() {
    //   return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
    // }
    isAltBackground() {
      return this.settingsService.isAltBackground();
    }
 }

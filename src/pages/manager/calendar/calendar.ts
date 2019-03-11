import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  history=[];;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams) {
    console.log('historyData', this.navParams.get('historyData'));
    this.history= this.navParams.get('historyData')
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    this.history= this.navParams.get('historyData')
    console.log('ionViewDidLoad CalendarViewPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilityProvider } from '../../../providers/utility/utility';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';

/**
 * Generated class for the ActionPlanHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-action-plan-history',
  templateUrl: 'action-plan-history.html',
})
export class ActionPlanHistoryPage {

  history = [];;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utility: UtilityProvider,
    public commonServiceProvider: CommonServiceProvider) {
    console.log('historyData', this.navParams.get('historyData'));
    this.history = this.navParams.get('historyData');
    console.log("this.history",this.history); 
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    this.history = this.navParams.get('historyData');
    console.log('ionViewDidLoad CalendarViewPage');
  }
}

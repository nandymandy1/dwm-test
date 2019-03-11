import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewMonthlyPlanManagerPage } from '../view-monthly-plan-manager/view-monthly-plan-manager';

/**
 * Generated class for the ViewMonthlyVisitPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-monthly-visit-plan',
  templateUrl: 'view-monthly-visit-plan.html',
})
export class ViewMonthlyVisitPlanPage {
  pages=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMonthlyVisitPlanPage');
  }

  monthlyPlan(){
    this.navCtrl.push(ViewMonthlyPlanManagerPage);
  }



}

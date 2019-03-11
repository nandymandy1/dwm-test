import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UpdateMonthlyPlanPage } from '../update-monthly-plan/update-monthly-plan';

/**
 * Generated class for the MonthlyVisitPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-monthly-visit-plan',
  templateUrl: 'monthly-visit-plan.html',
})
export class MonthlyVisitPlanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MonthlyVisitPlanPage');
  }
  editMonthlyPlan(){
    console.log("edit option")
   this.navCtrl.push(UpdateMonthlyPlanPage)
  }
}

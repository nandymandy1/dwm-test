import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-update-monthly-plan',
  templateUrl: 'update-monthly-plan.html',
})
export class UpdateMonthlyPlanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateMonthlyPlanPage');
  }
  update() {
    this.navCtrl.push(DashboardPage)
  }
}

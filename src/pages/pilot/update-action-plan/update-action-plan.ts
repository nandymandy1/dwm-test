import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../dashboard/dashboard';
import { UtilityProvider } from '../../../providers/utility/utility';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { Constant } from '../../../constants/constant';

@Component({
  selector: 'page-update-action-plan',
  templateUrl: 'update-action-plan.html',
})
export class UpdateActionPlanPage {
  formatedDate: string;
  actionPlanDate: string;
  selectedDate: any;
  updatedDate: any;
  Justification: any;
  task: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public utility: UtilityProvider, 
    public commonServiceProvider: CommonServiceProvider
  ) {
    this.task = this.navParams.get("task");
    console.log(this.task)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateActionPlanPage');
  }

  dateChange(event) {
    console.log("selectedDate", this.selectedDate)
    console.log("event supChange", event);
    if (event.day < 10) {
      if (event.month < 10) {
        this.formatedDate = '0' + event.day + "-" + '0' + event.month + "-" + event.year;
      } else {
        this.formatedDate = '0' + event.day + "-" + event.month + "-" + event.year;
      }
    } else if (event.month < 10) {
      this.formatedDate = event.day + "-" + '0' + event.month + "-" + event.year;
    } else {
      this.formatedDate = event.day + "-" + event.month + "-" + event.year;
    }
  }

  update() {
    console.log("this.Justification", this.Justification);
    console.log("this.updatedDate", this.formatedDate);
    if (this.updatedDate == undefined || this.updatedDate == 0 || this.updatedDate == '') {
      this.utility.showAlert("Warning", "Please select date")
    } else if (this.Justification == undefined || this.Justification == 0 || this.Justification == '') {
      this.utility.showAlert("Warning", "Please enter justification")
    } else {
      this.utility.showLoader("Updating Action Plan...");
      let data = {
        "id": this.task.id,
        "justification": this.Justification,
        "updatedDate": this.formatedDate
      }
      console.log(data);
      this.commonServiceProvider.updateTaskList(data).subscribe((res) => {
        if (res.success) {
          this.utility.hideLoader();
          this.utility.showAlert("Success", res.message);
          this.navCtrl.push(DashboardPage);
        } else {
          this.utility.hideLoader();
          this.utility.showAlert("System alert", res.message);
        }
      }, (err) => {
        if (err.status == 0 || err.status == 500) {
          this.utility.hideLoader();
          this.utility.showToast(Constant.MSGS.ERROR_NETWORK_UNAVAILABLE)
        } else {
          this.utility.hideLoader();
          this.utility.showToast("Something went wrong, please try again after some time");
        }
      });
    }
  }
}

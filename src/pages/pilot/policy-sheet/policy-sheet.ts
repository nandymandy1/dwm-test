import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from '../../../providers/utility/utility';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { DashboardPage } from '../../dashboard/dashboard';
import { Constant } from '../../../constants/constant';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-policy-sheet',
  templateUrl: 'policy-sheet.html',
})
export class PolicySheetPage {
  role: any;
  userId: any;
  profile: any;
  payload: any;
  Details: any;
  finalList=[];
  actionPlanDate: string;
  selectedDate:any;
  arrReport = [];
  //expandFlag: any;
  expandFlag = []


  constructor(public navCtrl: NavController,public storage: Storage,public navParams: NavParams, public utility: UtilityProvider, public commonServiceProvider: CommonServiceProvider) {
    console.log("data")
    this.storage.get('loginDetails').then((data: any) => {
      console.log(data)
      this.Details = data;
      this.payload = this.Details.payload;
      this.profile = this.payload.profile;
      this.role = this.profile.userType;
      this.getPolicySheetsData(this.payload);
      
    })
  }

  setVisibilityFlags(index) {
    let temp = this.expandFlag[index]
  // this.expandFlag.fill(false)
    this.expandFlag[index] = !temp
  }

  getPolicySheetsData(data) {
    this.utility.showLoader("Fetching data ...")
    this.commonServiceProvider.getPolicySheet(data).subscribe((res) => {
      this.utility.hideLoader();
      if (res.success) {
        this.finalList = res.payload;
        console.log("this.finalList.....",this.finalList)
      } else {
        this.utility.showAlert("System alert", res.message);
      }
    },(err)=>{
      if (err.status == 0 || err.status == 500) {
        this.utility.hideLoader();
        this.utility.showToast(Constant.MSGS.ERROR_NETWORK_UNAVAILABLE)
      } else {
        this.utility.hideLoader();
        this.utility.showToast("Something went wrong, please try again after some time");
      }
    });
  }

  month_name(dt) {
    var mlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return mlist[dt - 1];
  }

  updatePolicySheet(data) {
      // console.log("status...", data.status)
      // let policyData = {
      //   "id": data.id,
      //   "variance": data.varianceReason,
      //   "NextActionPlan": data.nextActionPlan,
      //   "NextActionPlanDate": this.actionPlanDate,
      // }
      // this.utility.showLoader("Fetching data ...")
      // this.commonServiceProvider.updatePolicySheet(policyData).subscribe((res) => {
      //   this.utility.hideLoader();
      //   if (res.success) {
      //     this.utility.showAlert("Confirmation", "Updated successfully!");
      //     //this.utility.showToast(res.message);
      //     this.navCtrl.push(DashboardPage);
      //   } else {
      //     this.utility.showAlert("System alert", res.message);
      //   }
      // },(err)=>{
      //   if (err.status == 0 || err.status == 500) {
      //     this.utility.hideLoader();
      //     this.utility.showToast(Constant.MSGS.ERROR_NETWORK_UNAVAILABLE)
      //   } else {
      //     this.utility.hideLoader();
      //     this.utility.showToast("Something went wrong, please try again after some time");
      //   }
      // });
    

  }

  dateChange(event) {
    if (event.day < 10) {
      if (event.month < 10) {
        this.actionPlanDate = '0' + event.day + "-" + '0' + event.month + "-" + event.year;
      } else {
        this.actionPlanDate = '0' + event.day + "-" + event.month + "-" + event.year;
      }
    } else if (event.month < 10) {
      this.actionPlanDate = event.day + "-" + '0' + event.month + "-" + event.year;
    } else {
      this.actionPlanDate = event.day + "-" + event.month + "-" + event.year;
    }
    //this.actionPlanDate = event.day + "-" + event.month + "-" + event.year;
  }
}
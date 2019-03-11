import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UpdateActionPlanPage } from '../update-action-plan/update-action-plan';
import { UtilityProvider } from '../../../providers/utility/utility';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { Storage } from '@ionic/storage';
import { Constant } from '../../../constants/constant';
import { FirewallPage } from '../firewall/firewall';
import { FirewallManagerPage } from '../../manager/firewall-manager/firewall-manager';
import { ActionPlanHistoryPage } from '../../manager/action-plan-history/action-plan-history';

@IonicPage()
@Component({
  selector: 'page-consolidated',
  templateUrl: 'consolidated.html',
})
export class ConsolidatedPage {
  noDataFound: string;
  taskPlanDate: any;
  taskPlan = [];
  taskList: any;
  payload: any;
  profile: any;
  role: any;
  Details: any;
  loginDetails = [];
  upcomingTaskList: any;
  isActionPlanHistory: boolean = false;
  constructor(public navCtrl: NavController,
    public storage: Storage,
    public utility: UtilityProvider,
    public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider,
    public modalCtrl: ModalController
  ) {

    // this.storage.get('loginDetails').then((data: any) => {
    //   this.Details = data;
    //   this.payload = this.Details.payload;
    //   this.profile = this.payload.profile;
    //   this.role = this.profile.userType;
    //   // this.getTaskList(this.payload);
    // });
    this.isActionPlanHistory = this.navParams.get("GetActionPlanTrackers")
    if (this.navParams.get("GetActionPlanTrackers")) {
      this.getActionPlanTrackers();
    } else {
      this.getTaskList();
    }


    //console.log(this.taskList)
  }
  public getTaskList() {
    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getTaskList().subscribe((res) => {
      if (res.success) {
        this.utility.hideLoader();
        this.taskList = res.payload;
        if (this.taskList.length != 0) {
          this.noDataFound = "";
        } else {
          this.noDataFound = "No data availabe to show.."
        }
      } else {
        this.utility.hideLoader();
        this.utility.showAlert("System alert", "Data not found");
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
  public getActionPlanTrackers() {
    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getActionPlanTrackers().subscribe((res) => {
      if (res.success) {
        this.utility.hideLoader();
        this.taskList = res.payload;
        if (this.taskList.length != 0) {
          this.noDataFound = "";
        } else {
          this.noDataFound = "No data availabe to show.."
        }
      } else {
        this.utility.hideLoader();
        this.utility.showAlert("System alert", "Data not found");
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
  month_name(dt) {
    let month = parseInt(dt.split('-')[1]);
    var mlist = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return mlist[month] + " - " + dt.split('-')[2];
  }
  getDate(dt) {
    let day = dt.split('-')[0];
        if(day.charAt(0) == '0'){
          return day.charAt(1);
        } else {
          return day;
        }
  }
  onEdit(task) {
    if (this.navParams.get("GetActionPlanTrackers")) {
      console.log("task", task);
      this.showHistory(task.id, task.source);
    } else {
      var data = task.redirectionRule;
      if (data.activityName === "MMA" || data.activityName === "Firewall") {
        console.log("mma");
        this.getAuditList(data.auditId, data);
      } else {
        console.log("mses");
        this.getGetMSESAuditsList(data.auditId, data);
      }
    }
  }
  public getAuditList(auditId, data) {
    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getAuditList(auditId).subscribe(
      res => {
        if (res.success) {
          this.utility.hideLoader();
          this.navCtrl.push(FirewallManagerPage, { auditdata: res.payload, month: data.month, year: data.year, duration: null,title:data.activityName });
        } else {
          this.utility.hideLoader();
          this.noDataFound = "";
          this.utility.showAlert("System alert", res.message);
        }
      },
      err => {
        if (err.status == 0 || err.status == 500) {
          this.utility.hideLoader();
          this.utility.showToast(Constant.MSGS.ERROR_NETWORK_UNAVAILABLE);
        } else {
          this.utility.hideLoader();
          this.utility.showToast(
            "Something went wrong, please try again after some time"
          );
        }
      }
    );
  }
  public getGetMSESAuditsList(auditId, data) {
    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getGetMSESAuditsList(auditId).subscribe((res) => {
      if (res.success) {
        this.utility.hideLoader();
        var pay = res.payload;
        console.log("payDataWithoutFilter", pay);

        pay.filter(a => a.duration == data.duration);
        console.log("payDataWithFilter", pay);
        console.log("payDataWithFilter[]", pay[0]);
        this.navCtrl.push(FirewallManagerPage, { auditdata: pay[0], month: data.month, year: data.year, duration: data.duration,title:data.activityName });
      } else {
        this.utility.hideLoader();
        this.noDataFound = "";
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
  showHistory(id, source) {
    this.utility.showLoader("Fetching data ...");
    var data = { id: id, Source: source };
    this.commonServiceProvider.getActionPlanHistory(data).subscribe((res) => {
      if (res.success) {
        let option = {
          showBackdrop: true,
          enableBackdropDismiss: true,
          cssClass: 'modalCss'
        }
        console.log("res", res);
        if (res.payload) {
          let history = this.modalCtrl.create(ActionPlanHistoryPage, { historyData: res.payload }, option);
          history.present();
        } else {
          this.utility.showToast("No history data found. ");
        }
        this.utility.hideLoader();
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

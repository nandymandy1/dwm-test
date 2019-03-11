import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuditsPage } from '../manager/audits/audits';
import { MorningMeetingPage } from '../pilot/morning-meeting/morning-meeting';
import { MonthlyVisitPlanPage } from '../pilot/monthly-visit-plan/monthly-visit-plan';
import { TrainingCalendarPage } from '../pilot/training-calendar/training-calendar';
import { MorningMeetingManagerPage } from '../manager/morning-meeting-manager/morning-meeting-manager';
import { ViewMonthlyVisitPlanPage } from '../manager/view-monthly-visit-plan/view-monthly-visit-plan';
import { ConsolidatedPage } from '../pilot/consolidated/consolidated';
import { Storage } from '@ionic/storage';
import { UtilityProvider } from '../../providers/utility/utility';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { PolicySheetManagerPage } from '../manager/policy-sheet-manager/policy-sheet-manager';
import { Constant } from '../../constants/constant';
import { FirewallManagerPage } from '../manager/firewall-manager/firewall-manager';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  taskPlanDate: any;
  taskPlan = [];
  taskList = [];
  payload: any;
  profile: any;
  role: any;
  Details: any;
  loginDetails = [];
  upcomingTaskList: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage, 
    public utility: UtilityProvider, 
    public commonServiceProvider: CommonServiceProvider
  ) {
    this.storage.get('loginDetails').then((data) => {
      this.Details = data;
      this.payload = this.Details.payload;
      this.profile = this.payload.profile;
      this.role = this.profile.userType;
      this.getTaskList();
    })
  }

  sync() {
    this.getTaskList();
  }

  public getTaskList() {
    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getTaskList().subscribe((res) => {
      if (res.success) {
        this.utility.hideLoader();
        this.taskList = res.payload;
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
    if (day.charAt(0) == '0') {
      return day.charAt(1);
    } else {
      return day;
    }
  }

  showMore() {
    this.navCtrl.push(ConsolidatedPage);
  }
  
  audit() {
    this.navCtrl.push(AuditsPage);
  }

  calendar() {
    this.navCtrl.push(TrainingCalendarPage);
  }

  policyPilot() {
    this.navCtrl.push(PolicySheetManagerPage);
  }

  consolidatPilot() {
    this.navCtrl.push(ConsolidatedPage, { GetActionPlanTrackers: true });
  }

  policyManager() {
    this.navCtrl.push(PolicySheetManagerPage);
  }

  consolidatManager() {
    this.navCtrl.push(ConsolidatedPage, { GetActionPlanTrackers: true });
  }

  morningMeeting() {
    this.navCtrl.push(MorningMeetingPage);
  }

  visitPlan() {
    this.navCtrl.push(MonthlyVisitPlanPage);
  }

  auditManager() {
    this.navCtrl.push(AuditsPage);
  }

  calendarManager() {
    this.navCtrl.push(TrainingCalendarPage);
  }

  morningMeetingManager() {
    this.navCtrl.push(MorningMeetingManagerPage);
  }

  visitPlanManager() {
    this.navCtrl.push(ViewMonthlyVisitPlanPage);
  }

  onEdit(task) {
    var data = task.redirectionRule;
    if (data.activityName === "MMA" || data.activityName === "Firewall") {
      console.log("mma");
      this.getAuditList(data.auditId, data);
    } else {
      console.log("mses");
      this.getGetMSESAuditsList(data.auditId, data);
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

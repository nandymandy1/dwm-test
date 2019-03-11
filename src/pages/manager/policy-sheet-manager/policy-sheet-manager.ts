import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UtilityProvider } from '../../../providers/utility/utility';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { Constant } from '../../../constants/constant';
import { Storage } from '@ionic/storage';
import { ManagerEscalatePage } from '../manager-escalate/manager-escalate';
import { EscalationHistoryPage } from '../escalation-history/escalation-history';
import { PdsheetActionplanHistoryPage } from '../pdsheet-actionplan-history/pdsheet-actionplan-history';
import { RequestActionPlanPage } from '../request-action-plan/request-action-plan';

@IonicPage()
@Component({
  selector: 'page-policy-sheet-manager',
  templateUrl: 'policy-sheet-manager.html',
})
export class PolicySheetManagerPage {
  noDataFound: string;
  role: any;
  userId: any;
  profile: any;
  payload: any;
  Details: any;
  arrReport = [];
  //expandFlag: any;
  expandFlag = []


  constructor(public navCtrl: NavController, public storage: Storage,
    public navParams: NavParams, public utility: UtilityProvider,
    public commonServiceProvider: CommonServiceProvider,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {

    console.log("data")
    this.storage.get('loginDetails').then((data: any) => {
      console.log(data)
      this.Details = data;
      this.payload = this.Details.payload;
      this.profile = this.payload.profile;
      this.role = this.profile.userType;
      this.getPolicySheetsData(this.payload);

    })
    //this.arrReport=[{"name":"sdaf"},{"name":"sdaf"},{"name":"sdaf"},];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TraningReportPage');
    // this.getPolicySheetsData();
  }


  getPolicySheetsData(data) {
    this.utility.showLoader("Fetching data ...")
    this.commonServiceProvider.getPolicySheet(data).subscribe((res) => {
      if (res.success) {
        this.arrReport = res.payload;
        if (this.arrReport.length != 0) {
          this.noDataFound = "";
        } else {
          this.noDataFound = "No data availabe to show.."
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

  month_name(dt) {
    var mlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return mlist[dt - 1];
  }

  setVisibilityFlags(index) {

    let temp = this.expandFlag[index]
    //  this.expandFlag.fill(false)
    this.expandFlag[index] = !temp

  }
  actionPlanClick(item) {
    console.log("item", item);

    this.navCtrl.push(RequestActionPlanPage, { id: item.id });
  }
  escalatClick(item) {
    console.log("item", item);
    var data = { id: item.id, lop: item.lop }
    this.navCtrl.push(ManagerEscalatePage, { escalatData: data });
  }
  // showHistory(){
  //   console.log("showHistory");    
  //   this.navCtrl.push(EscalationHistoryPage);
  // }
  showHistory(policySheetId) {
    this.utility.showLoader("Fetching data ...")
    this.commonServiceProvider.getEscalationHistory(policySheetId).subscribe((res) => {
      if (res.success) {
        let option = {
          showBackdrop: true,
          enableBackdropDismiss: true,
          cssClass: 'modalCss'
        }
        console.log("res", res);
        if (res.payload) {
          let history = this.modalCtrl.create(EscalationHistoryPage, { historyData: res.payload }, option);
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
  showActionPlanHistory(policySheetId) {
    this.utility.showLoader("Fetching data ...")
    this.commonServiceProvider.getPDSheetActionPlanHistory(policySheetId).subscribe((res) => {
      if (res.success) {
        let option = {
          showBackdrop: true,
          enableBackdropDismiss: true,
          cssClass: 'modalCss'
        }
        console.log("res", res);
        if (res.payload) {
          let history = this.modalCtrl.create(PdsheetActionplanHistoryPage, { historyData: res.payload ,policySheetId : policySheetId}, option);
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
  addRemarks(remark, id) {
    this.utility.showLoader("Fetching data ...")
    var data = {
      "policySheetId": id,//549,
      "Remark": remark
    };
    this.commonServiceProvider.addRemarks(data).subscribe((res) => {
      if (res.success) {
        this.navCtrl.setRoot(PolicySheetManagerPage);
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
  presentPrompt(id) {
    let alert = this.alertCtrl.create({
      title: 'Add Remark',
      inputs: [
        {
          name: 'remark',
          placeholder: 'remark'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Add',
          handler: data => {
            if (data.remark) {
              this.addRemarks(data.remark, id);
            } else {
              this.utility.showToast("Enter some text");
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

}
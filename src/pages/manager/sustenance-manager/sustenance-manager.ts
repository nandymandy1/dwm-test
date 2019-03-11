import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { DataProvider } from '../../../providers/data/data';
import { UtilityProvider } from '../../../providers/utility/utility';
import { Constant } from '../../../constants/constant';

/**
 * Generated class for the SustenanceManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sustenance-manager',
  templateUrl: 'sustenance-manager.html',
})
export class SustenanceManagerPage {
  showField: string;
  nodatafound: string = '';
  monthData: string;
  supplierData: string;
  year: any;
  nextActionPlanDate: any;
  nextActionPlan: any;
  month: any;
  achievedPoint: any;
  targetPoint: any;
  auditType: string;
  audit: any;
  supplierId: any;
  project: any;
  supplierid: string;
  projectList: any;
  supid: any;
  supplier: any;
  pilotId: any;
  pay: any;
  user: any;
  pilotData: any;
  projectid: string;
  userId: any;
  profile: any;
  payload: any;
  Details: any;
  pilot: any;
  pilotid: any;
  pilotList = [];
  supplierList = [];
  auditList = [];
  childList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider, public dataProvider: DataProvider,
     public utility: UtilityProvider) {
    
  }

  pilotChange(event) {
    if (event != '') {
      this.supplierList = [];
      this.auditList = [];
      this.childList = [];
      this.supplierData = '';
      this.monthData = '';
      this.nodatafound = '';
//console.log("event" + event);
      this.pilotid = event;
     // console.log("this.pilotId....." + this.pilotid);
      this.getSupplierList(this.pilotid);
    }
  }
  supplierChange(event) {
    if (event != '') {
      this.auditList = [];
      this.childList = [];
      this.monthData = '';
      this.nodatafound = '';
     // console.log("event2222" + event);
      this.supplierId = event;
      this.getAuditListForManager(this.pilotid, this.supplierId, this.auditType);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad mmaManagerPage');
    this.getPilotList();
  }
  continue() {
  }

  public getPilotList() {
    this.utility.showLoader("Fetching data...");
    let inputdata = {
    }
    this.commonServiceProvider.getPilotList(inputdata).subscribe((res) => {
      if (res.success) {
        this.utility.hideLoader();
        this.pilot = res;
        this.pay = this.pilot.payload;
        this.pilotList = this.pay.pilotList;
        this.showField=''
      } else {
        this.showField='pilot'
        this.nodatafound = "No Data Found";
        this.utility.hideLoader();
        //this.utility.showAlert("System alert", res.message);
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

  public getSupplierList(pilotid) {
    this.utility.showLoader("Fetching data...");
    let inputdata = {
      projectid: this.projectid,
      pilotid: this.pilotid,
    }
    // this.commonServiceProvider.getSupplierList(inputdata).subscribe((res) => {
    //   if (res.success) {
    //     this.utility.hideLoader();
    //     this.supplier = res;
    //     this.pay = this.supplier.payload;
    //     this.supplierList = this.pay.supplierList;
    //     this.showField=''
    //    // console.log("supplier : " + JSON.stringify(this.supplierList));
    //   } else {
    //     this.showField='supplier'
    //     this.nodatafound = "No Data Found";
    //     this.utility.hideLoader();
    //    // this.utility.showAlert("System alert", res.message);
    //   }
    // }, (err) => {
    //   if (err.status == 0 || err.status == 500) {
    //     this.utility.hideLoader();
    //     this.utility.showToast(Constant.MSGS.ERROR_NETWORK_UNAVAILABLE)
    //   } else {
    //     this.utility.hideLoader();
    //     this.utility.showToast("Something went wrong, please try again after some time");
    //   }
    // });

  }

  public getAuditListForManager(pilotid, supplierId, auditType) {
    this.utility.showLoader("Fetching data...");
    this.auditType = "MSES-Sustenance";
    let inputdata = {
      pilotId: this.pilotid,
      supplierId: this.supplierId,
      ActivityType: this.auditType,
    }
    this.commonServiceProvider.getAuditListForManager(inputdata).subscribe((res) => {
      this.utility.hideLoader();
      if (res.success) {

        this.audit = res;
        this.auditList = res.payload;
        this.childList = res.payload[0].childList;
        if (this.childList.length != 0) {
          this.targetPoint = this.childList[0].targetPoint;
          this.achievedPoint = this.childList[0].achievedPoint;
          this.month = this.childList[0].month;
          this.nextActionPlan = this.childList[0].nextActionPlan;
          this.nextActionPlanDate = this.childList[0].nextActionPlanDate;
          this.year = this.childList[0].year;
          //console.log("supplier childList : " + this.targetPoint);
        }
      } else {
         this.utility.hideLoader();
        this.nodatafound = "No Data Found";
       // this.utility.showAlert("System alert", res.message);
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

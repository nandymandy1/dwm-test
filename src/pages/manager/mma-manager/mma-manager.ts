import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { DataProvider } from '../../../providers/data/data';
import { UtilityProvider } from '../../../providers/utility/utility';
import { Constant } from '../../../constants/constant';

/**
 * Generated class for the MmaManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mma-manager',
  templateUrl: 'mma-manager.html',
})
export class MmaManagerPage {
  showField: string;
  noDataFound: string;
  nodatafound: string = '';
  monthData: string;
  supplierData: string;
  monthdata = [];
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
    public storage: Storage, public utility: UtilityProvider) {
    this.storage.get('loginDetails').then((data) => {
      this.Details = data;
      this.payload = this.Details.payload;
      this.profile = this.payload.profile;
      this.userId = this.profile.userId;
    })


  }
  projectChange(event) {
    if (event != '') {
      this.pilotList = [];
      this.supplierList = [];
      this.auditList = [];
      this.childList = [];
      this.pilotData = '';
      this.supplierData = '';
      this.monthData = '';
      this.nodatafound = '';
      this.projectid = event;
      this.getPilotList(this.projectid);
    }
  }
  pilotChange(event) {
    if (event != '') {
      this.supplierData = '';
      this.monthData = '';
      this.nodatafound = '';
      this.supplierList = [];
      this.auditList = [];
      this.childList = [];
      this.pilotid = event;
      this.getSupplierList(this.projectid, this.pilotid);
    }

  }
  supplierChange(event) {
    if (event != '') {
      this.monthData = '';
      this.nodatafound = '';
      this.auditList = [];
      this.childList = [];
      this.supplierId = event;
      this.getAuditListForManager(this.projectid, this.pilotid, this.supplierId, this.auditType);
    }
  }

  monthChange(event) {
    if (event != '') {
      this.nodatafound = '';
      console.log("event2222" + event);
      this.monthdata = this.childList.filter(a => a.month == event)
      if (this.monthdata.length != 0) {
        this.targetPoint = this.monthdata[0].targetPoint;
        this.achievedPoint = this.monthdata[0].achievedPoint;
        this.month = this.monthdata[0].month;
        this.nextActionPlan = this.monthdata[0].nextActionPlan;
        this.nextActionPlanDate = this.monthdata[0].nextActionPlanDate;
        this.year = this.monthdata[0].year;
        console.log("this.month", this.monthdata)
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad mmaManagerPage');
    // this.getProjectListForManager();
  }
  continue() {

  }
  // public getProjectListForManager() {
  //   console.log("get project")
  //   this.utility.showLoader("Fetching data...");
  //   this.storage.get('loginDetails').then((data) => {
  //     this.Details = data;
  //     this.payload = this.Details.payload;
  //     this.profile = this.payload.profile;
  //     this.userId = this.profile.userId;
  //     this.commonServiceProvider.getProjectListForManager().subscribe((res) => {
  //       if (res.success) {

  //         this.utility.hideLoader();
  //         this.project = res.payload;
  //         this.projectList = this.project.projectList;
  //         this.showField = ''
  //         console.log("this.projectList....." + JSON.stringify(this.projectList));
  //       } else {
  //         this.utility.hideLoader();
  //         this.showField = 'project'
  //         this.nodatafound = "No Data Found";
  //         //  this.utility.showAlert("System alert", res.message);
  //       }
  //     }, (err) => {
  //       if (err.status == 0 || err.status == 500) {
  //         this.utility.hideLoader();
  //         this.utility.showToast(Constant.MSGS.ERROR_NETWORK_UNAVAILABLE)
  //       } else {
  //         this.utility.hideLoader();
  //         this.utility.showToast("Something went wrong, please try again after some time");
  //       }
  //     });
  //   })
  // }


  public getPilotList(projectid) {
    this.utility.showLoader("Fetching data...");
    this.storage.get('loginDetails').then((data) => {
      this.Details = data;
      this.payload = this.Details.payload;
      this.profile = this.payload.profile;
      this.userId = this.profile.userId;
      let inputdata = {
        projectid: this.projectid,
      }
      this.commonServiceProvider.getPilotList(inputdata).subscribe((res) => {
        if (res.success) {
          this.utility.hideLoader();
          this.pilot = res;
          this.pay = this.pilot.payload;
          this.pilotList = this.pay.pilotList;
          this.showField = ''
        } else {
          this.utility.hideLoader();
          this.showField = 'pilot'
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
    })
  }

  public getSupplierList(projectid, pilotid) {
    this.utility.showLoader("Fetching data...");
    this.storage.get('loginDetails').then((data) => {
      this.Details = data;
      this.payload = this.Details.payload;
      this.profile = this.payload.profile;
      this.userId = this.profile.userId;
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
      //     this.showField = ''
      //     console.log("supplier : " + JSON.stringify(this.supplierList));
      //   } else {
      //     this.utility.hideLoader();
      //     this.showField = 'supplier'
      //     this.nodatafound = "No Data Found";
      //     // this.utility.showAlert("System alert", res.message);
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
    })
  }

  public getAuditListForManager(projectid, pilotid, supplierId, auditType) {
    this.utility.showLoader("Fetching data...");
    this.storage.get('loginDetails').then((data) => {
      this.Details = data;
      this.payload = this.Details.payload;
      this.profile = this.payload.profile;
      this.userId = this.profile.userId;
      this.auditType = "Firewall";
      let inputdata = {
        projectId: this.projectid,
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
          this.showField=''
          if (this.childList.length != 0) {
            this.showField=''
            this.targetPoint = this.childList[0].targetPoint;
            this.achievedPoint = this.childList[0].achievedPoint;
            this.month = this.childList[0].month;
            this.nextActionPlan = this.childList[0].nextActionPlan;
            this.nextActionPlanDate = this.childList[0].nextActionPlanDate;
            this.year = this.childList[0].year;
            console.log("supplier childList : " + this.targetPoint);
          } else {
            this.showField='month'
             this.nodatafound = "No Data Found";
          }

        } else {
          this.showField='month'
          this.nodatafound = "No Data Found";
          // this.utility.hideLoader();
        //  this.utility.showAlert("System alert", res.message);
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
    })
  }
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { DataProvider } from '../../../providers/data/data';
import { UtilityProvider } from '../../../providers/utility/utility';
import { Constant } from '../../../constants/constant';


@IonicPage()
@Component({
  selector: 'page-mses-bc-manager',
  templateUrl: 'mses-bc-manager.html',
})
export class MsesBcManagerPage {


  showField: string;
  noDataFound: string = '';
  monthData: string;
  supplierData: string;
  name: any;
  filteredList: any[];
  searchTerm: any;
  nodatafound: string = '';
  targetList: any;
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
  constructor(public navCtrl: NavController,
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

      this.pilotid = event;

      this.getSupplierList(this.pilotid);
    }
  }
  supplierChange(event) {
    if (event != '') {
      this.auditList = [];
      this.childList = [];
      this.monthData = '';
      this.nodatafound = '';
      this.supplierId = event;
      this.getAuditListForManager(this.pilotid, this.supplierId, this.auditType);
    }
  }
  monthChange(event) {
    if (event != '') {
      this.nodatafound = '';
      this.monthdata = this.childList.filter(a => a.month == event)
     // console.log("this.monthdata" + JSON.stringify(this.monthdata));
      if (this.monthdata.length != 0) {
        this.targetPoint = this.monthdata[0].targetPoint;
        this.achievedPoint = this.monthdata[0].achievedPoint;
        this.month = this.monthdata[0].month;
        this.nextActionPlan = this.monthdata[0].nextActionPlan;
        this.nextActionPlanDate = this.monthdata[0].nextActionPlanDate;
        this.year = this.monthdata[0].year;
        this.noDataFound = "";
      }
    }
  }

  ionViewDidLoad() {

    this.getPilotList();
  }
  continue() {
  }

  public getPilotList() {
    let inputdata = {
    }
    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getPilotList(inputdata).subscribe((res) => {
      this.utility.hideLoader();
      if (res.success) {
        this.pilot = res;
      //  console.log("this.pilot", this.pilot)
        this.pay = this.pilot.payload;
        this.pilotList = this.pay.pilotList;
        this.showField=''
      } else {
        this.showField='pilot'
        this.nodatafound = "No Data Found";
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
      pilotid: this.pilotid,
    }
    // this.commonServiceProvider.getSupplierList(inputdata).subscribe((res) => {
    //   if (res.success) {
    //     this.auditList = [];
    //     this.utility.hideLoader();
    //     this.supplier = res;
    //     this.pay = this.supplier.payload;
    //     this.supplierList = this.pay.supplierList;
    //     this.showField=''
    //     //console.log("supplier : " + JSON.stringify(this.supplierList));
    //   } else {
    //     this.utility.hideLoader();
    //     this.showField='supplier'
    //     this.nodatafound = "No Data Found";
    //     //this.utility.showAlert("System alert", res.message);
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
    this.auditType = "MSES-B/C";
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
        this.name = this.auditList[0].supplierName;
        this.showField=''
        //console.log("this.name", this.name)
        if (this.childList.length != 0) {
          this.showField=''
         // console.log("childList childList : " + this.childList);
        }
      } else {
        this.showField='month'
        this.nodatafound = "No Data Found";
      
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

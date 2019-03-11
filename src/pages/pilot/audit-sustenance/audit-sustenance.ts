import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ViewController,
  IonicApp
} from "ionic-angular";
import { SustenancePage } from "../sustenance/sustenance";
import { Storage } from "@ionic/storage";
import { CommonServiceProvider } from "../../../providers/common-service/common-service";
import { DataProvider } from "../../../providers/data/data";
import { UtilityProvider } from "../../../providers/utility/utility";
import { AuditsPage } from "../../manager/audits/audits";
import { Constant } from "../../../constants/constant";

@IonicPage()
@Component({
  selector: "page-audit-sustenance",
  templateUrl: "audit-sustenance.html"
})
export class AuditSustenancePage {
  noDataFound: string;
  auditList = [];
  //expandFlag: any;
  pilotId: any;
  auditId: any;
  expandFlag = [];
  processName: any;
  area: any;
  location: any;
  owner: any;
  auditType: any;
  auditDate: any;
  releaseDate: any;
  supplierName: any;
  status: any;
  supplierId: any;
  pay: any;
  supplierList = [];
  supplier: any;
  projectList: any;
  profile: any;
  payload: any;
  Details: any;
  projectId: any;
  userId: any;
  filteredList: any[];
  pay1: any;
  targetList: any;
  user: any;
  project: any;
  projectid: string;
  searchTerm: string = "";
  subActivityList: any;
  subActivityId: any = null;
  notpilot: boolean = true;
  pilotList = [];
  // childList = [];
  supplierData = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider,
    public dataProvider: DataProvider,
    public storage: Storage,
    public viewCtrl: ViewController,
    private ionicApp: IonicApp,
    private platform: Platform,
    public utility: UtilityProvider
  ) {
    // this.storage.get('loginDetails').then((data) => {
    //   this.Details = data;
    //   this.payload = this.Details.payload;
    //   this.profile = this.payload.profile;
    //   this.getSupplierListForPilot(this.payload);
    //   this.setFilteredItems();
    // })
    this.utility.showLoader("Fetching data...");
    this.storage.get("loginDetails").then(data => {
      console.log("loginDetails", data);
      if (data.payload.profile.userType == "Pilot") {
        this.pilotId = data.payload.profile.userId;
        this.notpilot = false;
      } else {
        this.getPilotList();
        // this.getProjectList(data.payload.profile.userId);
      }
      this.utility.hideLoader();
    });
    this.getSubActivity();

    // Back Button Register
    let back = this.platform.registerBackButtonAction(() => {
      this.viewCtrl.dismiss();
      const overlayView = this.ionicApp._overlayPortal._views[0];
      overlayView.dismiss();
      back();
    }, 2);
  }

  supChange(item) {
    this.auditList = [];
    console.log("event supChange", item.id);
    this.searchTerm = item.name;
    this.filteredList = [];
    this.getSustenanceListForPilot(item.id);

    // this.auditList=[];
    // console.log("event supChange" + event);
    // this.supplierId = event;
    // console.log("this.supChange....." + this.supplierId);
    // this.getSustenanceListForPilot(this.projectId,this.supplierId);
  }
  pilotChange(event) {
    this.pilotId = event;
    this.supplierData = "";
    if (event != "") {
      this.supplierList = [];
      this.auditList = [];
      // this.childList = [];
      // this.supplierData = '';
      // this.monthData = '';
      // this.nodatafound = '';
      console.log("event" + event);

      // console.log("this.pilotId....." + this.pilotid);
      // this.getSupplierList(this.pilotid);
    }
  }
  // pilotChange(event) {
  //   console.log("pilotChangeEvent" + event);
  //   this.pilotId=event;
  // }
  subActivityChange(event) {
    this.auditList = [];
    this.supplierData = "";
    if (event != "") {
      console.log("event" + event);
      this.subActivityId = event;
      console.log("this.pilotId", this.pilotId);
      if (this.pilotId) {
        this.getSupplierList();
        console.log("subActivityChange");
      } else {
        this.utility.showToast("Please select pilot!!!");
      }
    }
  }
  supplierChange(event) {
    this.auditList = [];
    if (event != "") {
      // this.childList = [];
      // this.monthData = '';
      // this.nodatafound = '';
      // console.log("event2222" + event);
      this.auditId = event;
      console.log("event ", event);
      this.getSustenanceAuditsList(this.auditId);
      // this.getAuditList(this.supplierId);
    }
  }
  ionViewDidLoad() {}
  onSearchInput() {
    this.setFilteredItems();
  }
  setFilteredItems() {
    this.filteredList = this.filterItems(this.searchTerm);
  }
  // setFilteredItems() {
  //   this.supplierList = this.filterItems(this.searchTerm);
  // }
  filterItems(searchTerm) {
    return this.supplierList.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  continue(item) {
    //this.status=this.auditList[0].status;
    this.navCtrl.push(SustenancePage, { auditdata: item });
    //  if(this.status=="Closed"){
    //  this.utility.showAlert("Warning","Score and Rating are already updated.")
    //  }else{
    //   this.navCtrl.push(SustenancePage,{auditdata:this.auditList})
    //   console.log("this.auditList ", this.status)
    //  }
    //   if(this.targetList){
    //     this.navCtrl.push(MsesAPage,{auditdata:this.auditList})
    //   }else{
    //     this.utility.showAlert("Warning","Target are not set");

    // }
  }
  setVisibilityFlags(index) {
    console.log(index);
    let temp = this.expandFlag[index];
    // this.expandFlag.fill(false)
    this.expandFlag[index] = !temp;
  }

  public getSupplierListForPilot(data) {
    // this.utility.showLoader("Fetching data...");
    // this.commonServiceProvider.getSupplierListForPilot(data).subscribe((res) => {
    //   if (res.success) {
    //     this.utility.hideLoader();
    //     this.supplier = res;
    //     this.pay = this.supplier.payload;
    //     this.supplierList = this.pay.model;
    //     this.filteredList = this.supplierList;
    //     console.log("supplier new : " + JSON.stringify(this.supplierList));
    //   } else {
    //     this.utility.hideLoader();
    //     this.utility.showAlert("System alert", res.message);
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
  goBack() {
    this.navCtrl.setRoot(AuditsPage);
  }
  public getSustenanceListForPilot(supplierId) {
    this.utility.showLoader("Fetching data...");
    let inputdata = {
      supplierId: supplierId
    };
    this.commonServiceProvider.getSustenanceListForPilot(inputdata).subscribe(
      res => {
        if (res.success) {
          this.utility.hideLoader();
          this.auditList = res.payload;
          console.log("this.audit list", this.auditList);
          if (this.auditList.length != 0) {
            this.noDataFound = "";
          } else {
            this.noDataFound = "No Data Found";
          }
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
  public getSubActivity() {
    this.utility.showLoader("Fetching data...");
    var data = { ActivityName: "MSES-Sustenance" };
    this.commonServiceProvider.getSubActivities(data).subscribe(
      res => {
        console.log("subActivityList", res);
        if (res.success) {
          console.log("subActivityList", res);

          // var pay = res.payload;

          this.subActivityList = res.payload.subActivityList;
          console.log(
            "this.projectList... : " + JSON.stringify(this.subActivityList)
          );
          this.utility.hideLoader();
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
  public getPilotList() {
    console.log("call");

    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getPilotListNew().subscribe(
      res => {
        console.log("getPilotList", res);
        if (res.success) {
          console.log("getPilotList", res);

          this.pilotList = res.payload;
          console.log(
            "this.projectList... : " + JSON.stringify(this.projectList)
          );
          this.utility.hideLoader();
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
  public getSupplierList() {
    this.utility.showLoader("Fetching data...");
    var data = { PilotId: this.pilotId, SubActivityId: this.subActivityId };
    this.commonServiceProvider.getSupplierListNew(data).subscribe(
      res => {
        if (res.success) {
          this.utility.hideLoader();

          this.supplierList = res.payload.supplierList;
          console.log("slist", this.supplierList);

          // this.target = res.payload.monthwiseTarge;
          if (this.supplierList.length) {
            this.noDataFound = "";
          } else {
            this.noDataFound = "No Data Found";

            //this.utility.showAlert("Failure", "Data not found")
          }
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

  public getSustenanceAuditsList(supplierId) {
    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getSustenanceAuditsList(supplierId).subscribe(
      res => {
        this.utility.hideLoader();
        if (res.success) {
          this.auditList = res.payload;
          // this.audit = res;
          // this.auditList = res.payload;
          // this.childList = res.payload[0].childList;
          // if (this.childList.length != 0) {
          //   this.targetPoint = this.childList[0].targetPoint;
          //   this.achievedPoint = this.childList[0].achievedPoint;
          //   this.month = this.childList[0].month;
          //   this.nextActionPlan = this.childList[0].nextActionPlan;
          //   this.nextActionPlanDate = this.childList[0].nextActionPlanDate;
          //   this.year = this.childList[0].year;

          // }
        } else {
          this.utility.hideLoader();
          // this.nodatafound = "No Data Found";
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
}

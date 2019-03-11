import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ViewController,
  IonicApp
} from "ionic-angular";
import { CommonServiceProvider } from "../../../providers/common-service/common-service";
import { DataProvider } from "../../../providers/data/data";
import { StatusBar } from "@ionic-native/status-bar";
import { UtilityProvider } from "../../../providers/utility/utility";
import { Constant } from "../../../constants/constant";
import { FirewallPage } from "../../pilot/firewall/firewall";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AuditsPage } from "../audits/audits";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-mses-a-manager",
  templateUrl: "mses-a-manager.html"
})
export class MsesAManagerPage {
  actionPlan: any;
  text: any;
  actionPlanDate: string;
  noDataFound: string;
  targetList = [];
  userId: any;
  auditList = [];
  msmeAuditList = [];
  monthdata = [];
  target: any;
  auditType: string;
  audit: any;
  projectId: any;
  projectList: any;
  notpilot: boolean = true;
  pilotList: any;
  subActivityList: any;
  pay: any;
  profile: any;
  payload: any;
  Details: any;
  pilotId: any = null;
  subActivityId: any = null;
  startDate: any = null;
  endDate: any = null;
  supplierList = [];
  childList = [];
  year: any;
  nextActionPlanDate: any;
  nextActionPlan: any;
  month: any;
  achievedPoint: any;
  targetPoint: any;
  allowedToEdit = false;
  auditId: any;
  rating: any;
  ShowNext: boolean;
  subActivityData = "";
  supplierData = "";
  monthData = "";
  durationData = "";

  private MMAForm: FormGroup;
  private actionForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider,
    public dataProvider: DataProvider,
    public storage: Storage,
    private fb: FormBuilder,
    public viewCtrl: ViewController,
    private ionicApp: IonicApp,
    public utility: UtilityProvider
  ) {
    this.auditType = navParams.get("dataType");
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
    this.MMAForm = this.fb.group({
      rating: ["", Validators.compose([Validators.required])],
      finalScoreSubmitted: [false, Validators.compose([Validators.required])]
    });

    this.actionForm = this.fb.group({
      text: ["", Validators.compose([Validators.required])]
    });
    this.getSubActivity(navParams.get("dataType"));

    // Back button
    let back = this.platform.registerBackButtonAction(() => {
      this.viewCtrl.dismiss();
      const overlayView = this.ionicApp._overlayPortal._views[0];
      overlayView.dismiss();
      back();
    }, 2);
  }
  pilotChange(event) {
    console.log("Pilot Change Event " + event);
    this.subActivityData = "";
    this.msmeAuditList = [];
    this.supplierList = [];
    this.supplierData = "";
    this.childList = [];
    this.pilotId = event;
    if (this.subActivityId) {
      this.getProjectList(this.pilotId, this.subActivityId);
    } else {
      this.utility.showToast("Please select subActivity!!!");
    }
    // console.log("pilotChangeEvent" + event);
    // this.subActivityData = "";
    // this.pilotId = event;
    // this.supplierData = "";
    // // if(this.subActivityId){
    // //   this.getProjectList(this.pilotId,this.subActivityId);
    // // }else{
    // //   this.utility.showToast("Please select subActivity!!!");
    // // }
  }
  subActivityChange(event) {
    console.log("Sub Activity change Event " + event);
    this.subActivityData = "";
    this.supplierData = "";
    this.supplierList = [];
    this.monthData = "";
    this.auditList = [];
    this.durationData = "";
    this.auditList = [];
    this.childList = [];
    this.targetList = [];
    if (event != "") {
      this.subActivityData = event;
      this.subActivityId = event;
      if (this.pilotId) {
        this.getSuppliersList();
        console.log("subActivityChange");
      } else {
        this.utility.showToast("Please select pilot!!!");
      }
    }
    // this.supplierList = [];
    // this.supplierData = "";
    // if(event != ""){
    //   console.log("event" + event);
    //   this.subActivityId = event;
    //   this.supplierData = event;
    //   if(this.pilotId){
    //   this.getSuppliersList();
    //     console.log("subActivityChange");
    //   }else{
    //     this.utility.showToast("Please select pilot!!!");
    //   }
    // }
  }

  projectChange(event) {
    // console.log("event" , event);
    // this.projectId = event.projectId;
    // this.startDate=event.startDate;
    // this.endDate= event.endDate;
    // console.log("this.projectId....." + this.projectId);
    // // this.getMMAListForPilot(this.projectId);
    // this.getSuppliersList();
  }

  durationChange(event) {
    // if(event ! = ""){
    //   console.log(event);
    // }
    // console.log("durationChangeEvent" , event);
    if (event != "") {
      this.auditList = event;
      this.childList = [];
      this.childList = event.childList;
      this.monthData = null;
      if (!this.notpilot) {
        this.navCtrl.push(FirewallPage, { auditdata: event });
      }
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AuditmmaPage");
  }

  ionViewWillEnter() {
    this.durationData = "";
  }

  continue(audit) {
    this.targetList = audit.monthwiseTarget;
    console.log("...", this.targetList);
    if (this.targetList.length > 0) {
      this.navCtrl.push(FirewallPage, { auditdata: audit });
    } else {
      this.utility.showAlert("Warning", "Target are not set");
    }
  }

  supplierChange(event) {
    if (event != "") {
      console.log(event);
      this.supplierData = event;
      this.durationData = "";
      let auditId = "";
      this.auditList = [];
      this.childList = [];
      this.supplierList.map(supplier => {
        if (supplier.supplierId == event) {
          auditId = supplier.auditId;
        }
      });
      //console.log(auditId);
      this.getAuditList(auditId);
    }
    // console.log("supplier",supplier.auditId);
    // this.getAuditList(supplier.auditId);
  }

  monthChange(event) {
    if (event != "") {
      // this.nodatafound = '';
      console.log("event2222" + event);
      this.monthdata = this.childList.filter(
        a => a.month == event.month && a.year == event.year
      );
      if (this.monthdata.length != 0) {
        this.actionPlan = this.monthdata[0].nextActionPlanObject;
        this.targetPoint = this.monthdata[0].targetPoint;
        this.achievedPoint = this.monthdata[0].achievedPoint;
        this.month = this.monthdata[0].month;
        this.nextActionPlan = this.monthdata[0].nextActionPlan;
        this.nextActionPlanDate = this.monthdata[0].nextActionPlanDate;
        this.year = this.monthdata[0].year;
        this.auditId = this.monthdata[0].childId;
        this.allowedToEdit = this.monthdata[0].allowedToEdit;
        console.log("this.month", this.monthdata);
        this.ShowNext = false;
      }
    }
  }

  onClickSupplier(supplier) {
    // console.log("supplier",supplier.auditId);
    // this.getAuditList(supplier.auditId);
    // this.targetList = audit.monthwiseTarget;
    // console.log("...", this.targetList)
    // if (this.targetList.length > 0) {
    //   this.navCtrl.push(FirewallPage, { auditdata: audit })
    // } else {
    //   this.utility.showAlert("Warning", "Target are not set");
    // }
  }

  public getProjectList(PilotId, subActivityId) {
    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider
      .getProjectList({ PilotId: PilotId, SubActivityId: subActivityId })
      .subscribe(
        res => {
          if (res.success) {
            this.pay = res.payload;
            this.projectList = this.pay.projectList;
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
    // this.storage.get('loginDetails').then((data) => {
    //   this.Details = data;
    //   this.payload = this.Details.payload;
    //   this.profile = this.payload.profile;
    //   this.userId = this.profile.userId;

    //   let inputdata = {
    //     userId: this.userId
    //   }
    //   console.log("inputdata",inputdata)
    //   this.commonServiceProvider.getProjectListForPilot(inputdata).subscribe((res) => {
    //     if (res.success) {
    //       this.pay = res.payload;
    //       this.projectList = this.pay.projectList;
    //       console.log("this.projectList... : " + JSON.stringify(this.projectList));
    //       this.utility.hideLoader();
    //     } else {
    //       this.utility.hideLoader();
    //       this.utility.showAlert("System alert", res.message);
    //     }
    //   },(err)=>{
    //     if (err.status == 0 || err.status == 500) {
    //       this.utility.hideLoader();
    //       this.utility.showToast(Constant.MSGS.ERROR_NETWORK_UNAVAILABLE)
    //     } else {
    //       this.utility.hideLoader();
    //       this.utility.showToast("Something went wrong, please try again after some time");
    //     }
    //   });
    // })
  }
  public getPilotList() {
    console.log("call");

    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getPilotListNew().subscribe(
      res => {
        console.log("getPilotList", res);
        if (res.success) {
          console.log("getPilotList", res);

          // var pay = res.payload;

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
  public getSubActivity(auditType) {
    this.utility.showLoader("Fetching data...");
    var data = { ActivityName: auditType };
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
  public getMMAListForPilot(projectId) {
    //   this.utility.showLoader("Fetching data...");
    //   this.storage.get('loginDetails').then((data) => {
    //     this.Details = data;
    //     this.payload = this.Details.payload;
    //     this.profile = this.payload.profile;
    //     this.userId = this.profile.userId;
    //     this.auditType = "Firewall";
    //     let inputdata = {
    //       projectId: this.projectId,
    //       auditType: this.auditType,
    //     }
    // this.commonServiceProvider.getMMAListForPilot(inputdata).subscribe((res) => {
    //       if (res.success) {
    //         this.utility.hideLoader();
    //         this.auditList = res.payload;
    //         this.target = res.payload.monthwiseTarge;
    //         if (this.auditList.length) {
    //           this.noDataFound="";
    //         } else {
    //           this.noDataFound="No Data Found"
    //           //this.utility.showAlert("Failure", "Data not found")
    //         }
    //       } else {
    //         this.utility.hideLoader();
    //         this.noDataFound="";
    //         this.utility.showAlert("System alert", res.message);
    //       }
    //     },(err)=>{
    //       if (err.status == 0 || err.status == 500) {
    //         this.utility.hideLoader();
    //         this.utility.showToast(Constant.MSGS.ERROR_NETWORK_UNAVAILABLE)
    //       } else {
    //         this.utility.hideLoader();
    //         this.utility.showToast("Something went wrong, please try again after some time");
    //       }
    //     });
    // })
  }
  public getSuppliersList() {
    this.utility.showLoader("Fetching data...");
    var data = { PilotId: this.pilotId, SubActivityId: this.subActivityId };
    this.commonServiceProvider.getSupplierListNew(data).subscribe(
      res => {
        if (res.success) {
          this.utility.hideLoader();

          this.supplierList = res.payload.supplierList;
          console.log("slist", this.supplierList);

          this.target = res.payload.monthwiseTarge;
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
  public getAuditList(auditId) {
    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getGetMSESAuditsList(auditId).subscribe(
      res => {
        if (res.success) {
          this.utility.hideLoader();
          // if(this.notpilot){
          this.msmeAuditList = res.payload;
          // this.auditList = res.payload;
          // this.childList=res.payload.childList;
          this.target = res.payload.monthwiseTarge;
          if (this.msmeAuditList.length) {
            this.noDataFound = "";
          } else {
            this.noDataFound = "No Data Found";

            //this.utility.showAlert("Failure", "Data not found")
          }
          // }else{
          //      this.navCtrl.push(FirewallPage, { auditdata: res.payload });
          // }
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
  dateChange(event) {
    if (event != "") {
      if (event.day < 10) {
        if (event.month < 10) {
          this.actionPlanDate =
            "0" + event.day + "-" + "0" + event.month + "-" + event.year;
        } else {
          this.actionPlanDate =
            "0" + event.day + "-" + event.month + "-" + event.year;
        }
      } else if (event.month < 10) {
        this.actionPlanDate =
          event.day + "-" + "0" + event.month + "-" + event.year;
      } else {
        this.actionPlanDate = event.day + "-" + event.month + "-" + event.year;
      }
    }
  }
  submit() {
    let rating = this.MMAForm.controls.rating.value;
    if (parseInt(rating) > 0 && parseInt(rating) <= 100) {
      this.rating = rating;
      if (this.rating.length > 0) {
        this.updateRating(
          this.auditId,
          this.rating,
          this.MMAForm.controls.finalScoreSubmitted.value
        );
      } else {
        this.utility.showAlert("Failure", "Please enter rating");
      }
    } else {
      this.utility.showAlert(
        "Failure",
        "Please fill in valid rating between 0 to 100."
      );
    }
  }
  onSubmit() {
    let text = this.actionForm.controls.text.value;
    this.text = text;
    if (
      this.actionPlanDate == "undefined" ||
      this.actionPlanDate == null ||
      this.actionPlanDate == ""
    ) {
      this.utility.showAlert("Failure", "Please select date");
    } else if (
      this.text == "undefined" ||
      this.text == null ||
      this.text == ""
    ) {
      this.utility.showAlert("Failure", "Please enter description ");
    } else {
      this.updateActionPlan(this.auditId, this.actionPlan, this.actionPlanDate);
    }
  }
  public updateActionPlan(auditId, actionPlan, actionPlanDate) {
    this.utility.showLoader("Updating data...");
    let inputdata = {
      auditId: this.auditId,
      actionPlan: this.text,
      actionPlanDate: this.actionPlanDate
    };
    this.commonServiceProvider.updateActionPlan(inputdata).subscribe(
      res => {
        if (res.success) {
          this.utility.hideLoader();
          this.navCtrl.push(AuditsPage);
          this.utility.showAlert("Confirmation", "Action Plan submitted");
        } else {
          this.utility.hideLoader();
          this.utility.showAlert("System alert", res.message);
          //this.utility.showAlert("System alert", "Action Plan Date cannot be less than Rating submission date")
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
  updateRating(auditId, rating, finalScoreSubmitted) {
    this.utility.showLoader("Updating data...");
    let inputdata = {
      auditId: this.auditId,
      rating: this.rating,
      isFinalScore: finalScoreSubmitted
    };
    this.commonServiceProvider.updateRating(inputdata).subscribe(
      res => {
        if (res.success) {
          this.utility.hideLoader();
          if (
            this.rating > this.targetPoint ||
            this.rating == this.targetPoint
          ) {
            this.ShowNext = false;
            this.utility.showAlert(
              "Warning",
              "Rating inserted, Target is completed"
            );
            this.navCtrl.pop();
          } else {
            if (!finalScoreSubmitted) {
              this.utility.showAlert(
                "Confirmation",
                "Your rating is less then target value please enter next action plan here."
              );
              this.ShowNext = true;
            }
            // this.utility.showAlert("Confirmation", "Your rating is less then target value please enter next action plan here.");
            // this.ShowNext = true;
          }
        } else {
          if (res.payload) {
            if (res.payload.actionPlanRequired) {
              this.ShowNext = true;
            }
          }
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
}

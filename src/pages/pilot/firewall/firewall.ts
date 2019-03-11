import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ViewController,
  IonicApp,
  ModalController
} from "ionic-angular";
import { CommonServiceProvider } from "../../../providers/common-service/common-service";
import { UtilityProvider } from "../../../providers/utility/utility";
import { DataProvider } from "../../../providers/data/data";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AuditsPage } from "../../manager/audits/audits";
import { Constant } from "../../../constants/constant";
import { CalendarPage } from "../../manager/calendar/calendar";
//import { AuditFirewallPage } from '../audit-firewall/audit-firewall';

@IonicPage()
@Component({
  selector: "page-firewall",
  templateUrl: "firewall.html"
})
export class FirewallPage {
  title: any;
  text: any;
  actionPlanDate: string;
  selectedDate: any;
  ShowNext: boolean;
  monthname: { id: number; name: string }[];
  monthList = [];
  year: any;
  month: any;
  achievedPoint: any;
  monthdata: any;
  status = "Closed";
  ratingDate: any;
  rating1: any;
  nextActionPlanDate: any;
  nextActionPlan: any;
  actionPlan: any;
  rating: any;
  auditId: any;
  targetPoint: any;
  targetlist = [];
  location: any;
  area: any;
  supplierName: any;
  processName = [];
  owner: any;
  flagColor: null;
  mlist = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  allowedToEdit = false;
  actionPlanRequired;
  Details: any;
  private MMAForm: FormGroup;
  private actionForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private ionicApp: IonicApp,
    private platform: Platform,
    public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider,
    public dataProvider: DataProvider,
    public utility: UtilityProvider,
    private fb: FormBuilder,
    public modalCtrl: ModalController
  ) {
    this.Details = this.navParams.get("auditdata");
    this.processName = this.Details.processName;
    this.owner = this.Details.pilotName;
    this.area = this.Details.area;
    this.supplierName = this.Details.supplierName;
    this.location = this.Details.location;
    console.log("audiyData", this.Details);
    console.log("activity Name", this.Details.activityName);
    this.targetlist = this.Details.childList;
    // this.auditId = this.targetlist[0].auditId;
    console.log("this.Details.monthwiseTarget", this.Details.monthwiseTarget);
    // console.log(this.title);
    // if (this.targetlist) {
    //   this.targetPoint = this.targetlist[0].targetPoint;
    //   this.status = this.targetlist[0].status;
    //   this.actionPlan = this.targetlist[0].nextActionPlanObject;
    //   this.nextActionPlan = this.actionPlan.nextActionPlan;
    //   this.nextActionPlanDate = this.actionPlan.nextActionPlanDate;
    //   this.rating1 = this.actionPlan.rating;
    //   this.ratingDate = this.actionPlan.ratingDate;
    //   console.log("this.targetList.....: " + this.nextActionPlan);
    //   // console.log("this.targetList: " + this.actionPlan[0].nextActionPlan);
    //   this.auditId = this.targetlist[0].auditId;
    // }
    this.MMAForm = this.fb.group({
      rating: ["", Validators.compose([Validators.required])],
      finalScoreSubmitted: [false, Validators.compose([Validators.required])]
    });

    this.actionForm = this.fb.group({
      text: ["", Validators.compose([Validators.required])]
    });

    // Back Button Register
    let back = this.platform.registerBackButtonAction(() => {
      this.viewCtrl.dismiss();
      const overlayView = this.ionicApp._overlayPortal._views[0];
      overlayView.dismiss();
      back();
    }, 2);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MmaPage");
  }

  getMonth(item) {
    return this.mlist[item - 1];
  }

  monthChange(event) {
    // this.monthdata = this.targetlist.filter(a => a.month == event)
    this.monthdata = this.targetlist.filter(
      a => a.month == event.month && a.year == event.year
    );
    console.log(" this.monthdata", this.monthdata);

    this.targetPoint = this.monthdata[0].targetPoint;
    // this.targetPoint = this.monthdata[0].targetPoint;
    if (this.monthdata[0].targetPoint > this.monthdata[0].achievedPoint) {
      this.status = "open";
    } else {
      this.status = "Closed";
    }
    this.actionPlan = this.monthdata[0].nextActionPlanObject;
    this.nextActionPlan = this.actionPlan.nextActionPlan;
    this.nextActionPlanDate = this.actionPlan.nextActionPlanDate;
    this.rating1 = this.monthdata[0].achievedPoint; //achivedPoint
    this.ratingDate = this.monthdata[0].achievedPointDate;
    this.auditId = this.monthdata[0].childId;
    this.flagColor = this.monthdata[0].flagColor;
    this.allowedToEdit = this.monthdata[0].allowedToEdit;
  }
  submit() {
    let rating = this.MMAForm.controls.rating.value;
    if (0 < parseInt(rating) && parseInt(rating) <= 100) {
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
        "Please enter valid rating point between 0 to 100."
      );
    }
  }

  goBack() {
    this.navCtrl.pop();
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
          // this.actionPlanRequired=res.payload.actionPlanRequired;

          if (
            this.rating > this.targetPoint ||
            this.rating == this.targetPoint
          ) {
            this.ShowNext = false;
            this.utility.showAlert(
              "Warning",
              "Rating inserted, Target is completed"
            );
            this.navCtrl.push(AuditsPage);
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
          console.log(
            "res.payload.actionPlanRequired",
            res.payload.actionPlanRequired
          );
          if (res.payload.actionPlanRequired) {
            this.ShowNext = true;
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

  dateChange(event) {
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
  showHistory() {
    console.log(this.monthdata[0].actionPlanHistory);
    let option = {
      showBackdrop: true,
      enableBackdropDismiss: true,
      cssClass: "modalCss"
    };
    if (this.monthdata[0].actionPlanHistory) {
      let history = this.modalCtrl.create(
        CalendarPage,
        { historyData: this.monthdata[0].actionPlanHistory },
        option
      );

      history.present();
    } else {
      this.utility.showToast("No history data found. ");
    }
  }
}

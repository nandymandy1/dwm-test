import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { DataProvider } from '../../../providers/data/data';
import { UtilityProvider } from '../../../providers/utility/utility';
import { Constant } from '../../../constants/constant';
import { CalendarPage } from '../calendar/calendar';
import { AuditsPage } from '../audits/audits';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


/**
 * Generated class for the FirewallManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firewall-manager',
  templateUrl: 'firewall-manager.html',
})
//used
export class FirewallManagerPage {
  text: any;
  actionPlanDate: string;
  selectedDate: any;
  ShowNext: boolean;
  monthname: { id: number; name: string; }[];
  monthList = [];
  year: any;
  month: any;
  achievedPoint: any;
  monthdata: any;
  status = "Closed";
  ratingDate: any;
  rating1: any;
  title:string="title";
  flagColor:any;
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
  mlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  allowedToEdit = false;
  actionPlanRequired;
  Details: any;
  private MMAForm: FormGroup;
  private actionForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider, public dataProvider: DataProvider,
    public utility: UtilityProvider, private fb: FormBuilder, public modalCtrl: ModalController) {
    this.Details = this.navParams.get("auditdata");
    this.title=this.navParams.get("title");
    this.processName = this.Details.processName;
    this.owner = this.Details.pilotName;
    this.area = this.Details.area;
    this.supplierName = this.Details.supplierName;
    this.location = this.Details.location;
    console.log("audiyData", this.Details);
    this.targetlist = this.Details.childList;
    console.log("this.Details.monthwiseTarget", this.Details.monthwiseTarget);
    this.showMonthData(this.navParams.get("month"), this.navParams.get("year"));

    this.MMAForm = this.fb.group({
      rating: ['', Validators.compose([
        Validators.required,
      ])],
      finalScoreSubmitted: [false, Validators.compose([
        Validators.required,
      ])],
    });

    this.actionForm = this.fb.group({
      text: ['', Validators.compose([
        Validators.required,
      ])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MmaPage');
  }

  getMonth(item) {
    return this.mlist[item - 1];
  }

  monthChange(event) {
    // this.monthdata = this.targetlist.filter(a => a.month == event.month && a.year == event.year);
    // console.log(" this.monthdata", this.monthdata);

    // this.targetPoint = this.monthdata[0].targetPoint;
    // if (this.monthdata[0].targetPoint > this.monthdata[0].achievedPoint) {
    //   this.status = "open";
    // } else {
    //   this.status = "Closed";
    // }
    // this.actionPlan = this.monthdata[0].nextActionPlanObject;
    // this.nextActionPlan = this.actionPlan.nextActionPlan;
    // this.nextActionPlanDate = this.actionPlan.nextActionPlanDate;
    // this.rating1 = this.monthdata[0].achievedPoint;
    // this.ratingDate = this.monthdata[0].achievedPointDate;
    // this.auditId = this.monthdata[0].childId;
    // this.allowedToEdit = this.monthdata[0].allowedToEdit;
  }
  showMonthData(auditMonthData, audityearData) {
    // console.log();

    console.log("auditMonthData", "audityearData", auditMonthData, audityearData);

    this.monthdata = this.targetlist.filter(a => a.month == auditMonthData && a.year == audityearData);
    console.log(" this.monthdata", this.monthdata);
    if (this.monthdata) {
      this.targetPoint = this.monthdata[0].targetPoint;
      if (this.monthdata[0].targetPoint > this.monthdata[0].achievedPoint) {
        this.status = "open";
      } else {
        this.status = "Closed";
      }
      this.actionPlan = this.monthdata[0].nextActionPlanObject;
      this.nextActionPlan = this.actionPlan.nextActionPlan;
      this.nextActionPlanDate = this.actionPlan.nextActionPlanDate;
      this.rating1 = this.monthdata[0].achievedPoint;
      this.flagColor = this.monthdata[0].flagColor;
      this.ratingDate = this.monthdata[0].achievedPointDate;
      this.auditId = this.monthdata[0].childId;
      this.allowedToEdit = this.monthdata[0].allowedToEdit;
    }
  }
  submit() {
    let rating = this.MMAForm.controls.rating.value;
    this.rating = rating;
    if (this.rating.length > 0) {
      this.updateRating(this.auditId, this.rating, this.MMAForm.controls.finalScoreSubmitted.value);
    } else {
      this.utility.showAlert("Failure", "Please enter rating");
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
    }
    this.commonServiceProvider.updateRating(inputdata).subscribe((res) => {
      if (res.success) {
        this.utility.hideLoader();
        if (this.rating > this.targetPoint || this.rating == this.targetPoint) {
          this.ShowNext = false;
          this.utility.showAlert("Warning", "Rating inserted, Target is completed")
          this.navCtrl.pop();
        } else {
          if(!finalScoreSubmitted){
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
          if(res.payload.actionPlanRequired){
            this.ShowNext = true;          
          }         
        }
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
  }
  onSubmit() {
    let text = this.actionForm.controls.text.value;
    this.text = text;
    if (this.actionPlanDate == "undefined" || this.actionPlanDate == null || this.actionPlanDate == '') {
      this.utility.showAlert("Failure", "Please select date");
    } else if (this.text == "undefined" || this.text == null || this.text == '') {
      this.utility.showAlert("Failure", "Please enter description ");
    } else { this.updateActionPlan(this.auditId, this.actionPlan, this.actionPlanDate) }
  }

  public updateActionPlan(auditId, actionPlan, actionPlanDate) {
    this.utility.showLoader("Updating data...");
    let inputdata = {
      auditId: this.auditId,
      actionPlan: this.text,
      actionPlanDate: this.actionPlanDate,
    }
    this.commonServiceProvider.updateActionPlan(inputdata).subscribe((res) => {
      if (res.success) {
        this.utility.hideLoader();
        this.navCtrl.push(AuditsPage);
        this.utility.showAlert("Confirmation", "Action Plan submitted");
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
  showHistory() {
    console.log(this.monthdata[0].actionPlanHistory);
    let option = {
      showBackdrop: true,
      enableBackdropDismiss: true,
      cssClass: 'modalCss'
    }
    if (this.monthdata[0].actionPlanHistory) {
      let history = this.modalCtrl.create(CalendarPage, { historyData: this.monthdata[0].actionPlanHistory }, option);

      history.present();
    } else {
      this.utility.showToast("No history data found. ");
    }

  }

}

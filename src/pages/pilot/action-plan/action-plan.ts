import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../dashboard/dashboard';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { DataProvider } from '../../../providers/data/data';
import { UtilityProvider } from '../../../providers/utility/utility';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuditmmaPage } from '../auditmma/auditmma';
import { AuditsPage } from '../../manager/audits/audits';
/**
 * Generated class for the ActionPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-action-plan',
  templateUrl: 'action-plan.html',
})
export class ActionPlanPage {



  monthArray: { number: string; month: string; }[];
  selectedDate: any;
  ratingDate: any;
  rating1: any;
  nextActionPlanDate: any;
  nextActionPlan: any;
  status: any;

  actionPlan: any;
  actionPlanDate: string;
  text: any;
  auditId: any;
  targetPoint: any;
  targetlist = [];
  location: any;
  supplierName: any;
  area: any;
  owner: any;
  processName: any;
  Details = [];
  private actionForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider, public dataProvider: DataProvider,
    public storage: Storage, public utility: UtilityProvider, private fb: FormBuilder) {

    this.monthArray = [
      { number: '1', month: "Jan" },
      { number: '2', month: "Feb" },
      { number: '3', month: "Mar" },
      { number: '4', month: "Apr" },
      { number: '5', month: "May" },
      { number: '6', month: "Jun" },
      { number: '7', month: "Jul" },
      { number: '8', month: "Aug" },
      { number: '9', month: "Sep" },
      { number: '10', month: "Oct" },
      { number: '11', month: "Nov" },
      { number: '12', month: "Dec" },
    ]

    this.Details = this.navParams.get("auditdata");
    this.targetPoint = this.Details[0].targetPoint;
    this.status = this.Details[0].status;
    this.actionPlan = this.Details[0].nextActionPlanObject;
    this.nextActionPlan = this.actionPlan.nextActionPlan;
    this.nextActionPlanDate = this.actionPlan.nextActionPlanDate;
    this.rating1 = this.actionPlan.rating;
    this.ratingDate = this.actionPlan.ratingDate;
    console.log("this.Details.....: " + JSON.stringify(this.Details));
    this.auditId = this.Details[0].auditId;
    // this.processName = this.Details.processName;
    //   this.owner = this.Details.owner;
    //   this.area = this.Details.area;
    //   this.supplierName = this.Details.supplierName;
    //   this.location = this.Details.location;
    //   this.targetlist = this.Details.monthwiseTarget;
    //   console.log("this.Details....", this.targetlist)
    //   if (this.targetlist) {
    //   this.targetPoint = this.targetlist[0].targetPoint;
    //   this.status = this.targetlist[0].status;
    //   this.actionPlan = this.targetlist[0].nextActionPlanObject;
    //   this.nextActionPlan=this.actionPlan.nextActionPlan;
    //   this.nextActionPlanDate=this.actionPlan.nextActionPlanDate;
    //   this.rating1=this.actionPlan.rating;
    //   this.ratingDate=this.actionPlan.ratingDate;
    //   console.log("this.targetList.....: " + this.nextActionPlan);
    //   this.auditId = this.targetlist[0].auditId;
    //   }

    this.actionForm = this.fb.group({
      text: ['', Validators.compose([
        Validators.required,
      ])]
    });
  }

  dateChange(event) {
    console.log("selectedDate", this.selectedDate)
    console.log("event supChange", event);
    this.actionPlanDate = event.day + "-" + event.month + "-" + event.year;
    console.log("this.actionPlanDate", this.actionPlanDate.length)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionPlanPage');
  }
  onSubmit() {
    let text = this.actionForm.controls.text.value;
    this.text = text;
    console.log("this.actionPlanDate", this.actionPlanDate)
    console.log("text", text.length)
    //this.navCtrl.push(DashboardPage)
    if ( this.actionPlanDate == "undefined" || this.actionPlanDate == null || this.actionPlanDate == '') {
      this.utility.showAlert("Failure", "Please select date");
    }else if (this.text == "undefined" || this.text == null || this.text == '') {
      this.utility.showAlert("Failure", "Please enter description ");
    } else { this.updateActionPlan(this.auditId, this.actionPlan, this.actionPlanDate) }
  }

  public updateActionPlan(auditId,actionPlan,actionPlanDate) {
    this.utility.showLoader("Updating data...");
    let inputdata = {
      auditId: this.auditId,
      actionPlan: this.text,
      actionPlanDate: this.actionPlanDate,
    }
    this.commonServiceProvider.updateActionPlan(inputdata).subscribe((res) => {
      if (res.success) {
        this.utility.hideLoader();
        console.log("update rating", res.success);
        this.navCtrl.push(AuditsPage);
        this.utility.showAlert("Confirmation", "Action Plan submitted");
      } else {
        this.utility.hideLoader();
        //this.utility.showAlert(res.message);
        this.utility.showAlert("System alert", "Action Plan Date cannot be less than Rating submission date")
      }
    })
  }
}

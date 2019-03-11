import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UpdateActionPlanPage } from '../update-action-plan/update-action-plan';
import { ActionPlanPage } from '../action-plan/action-plan';
import { AuditmsesAPage } from '../auditmses-a/auditmses-a';
import { AuditmsesBcPage } from '../auditmses-bc/auditmses-bc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UtilityProvider } from '../../../providers/utility/utility';
import { DataProvider } from '../../../providers/data/data';
import { AuditsPage } from '../../manager/audits/audits';
import { Constant } from '../../../constants/constant';
import { CalendarPage } from '../../manager/calendar/calendar';



@IonicPage()
@Component({
  selector: 'page-msesb-c',
  templateUrl: 'msesb-c.html',
})
export class MsesbCPage {
  monthdata: any;
  ShowNext: boolean;
  text: any;
  selectedDate: any;
  actionPlanDate: string;
  status="Closed";
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
  Details: any;
  mlist = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  private MMAForm: FormGroup;
  private actionForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider, public dataProvider: DataProvider,
    public utility: UtilityProvider, private fb: FormBuilder, public modalCtrl: ModalController) {

      this.Details = this.navParams.get("auditdata");
      this.processName = this.Details[0].processName;
      this.owner = this.Details[0].owner;
      this.area = this.Details[0].area;
      this.supplierName = this.Details[0].supplierName;
      this.location = this.Details[0].location;
      this.targetlist = this.Details[0].monthwiseTarget;
     
    this.MMAForm = this.fb.group({
      rating: ['', Validators.compose([
        Validators.required,
      ])]
    });
    this.actionForm = this.fb.group({
      text: ['', Validators.compose([
        Validators.required,
      ])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MsesAPage');
  }
  getMonth(item) {
    return this.mlist[item - 1];
  }

  monthChange(event) {
    this.monthdata = this.targetlist.filter(a => a.month == event)
    this.targetPoint = this.monthdata[0].targetPoint;
    this.targetPoint = this.monthdata[0].targetPoint;
    this.status = this.monthdata[0].status;
    this.actionPlan = this.monthdata[0].nextActionPlanObject;
    this.nextActionPlan = this.actionPlan.nextActionPlan;
    this.nextActionPlanDate = this.actionPlan.nextActionPlanDate;
    this.rating1 = this.monthdata[0].rating;
    this.ratingDate = this.actionPlan.ratingDate;
    this.auditId = this.monthdata[0].auditId;
  }
 
  submit() {
    let rating = this.MMAForm.controls.rating.value;
    this.rating = rating;

    if (this.rating.length > 0) {
      this.updateMSESRating(this.auditId, this.rating);

    } else {
      this.utility.showAlert("Failure", "Please enter rating");
    }
  }
  goBack(){
    this.navCtrl.setRoot(AuditsPage)
  }
  showHistory(){
    console.log(this.monthdata[0].actionPlanHistory);
    let option={
      showBackdrop:true,
      enableBackdropDismiss:true,
      cssClass:'modalCss'
    }
    if(this.monthdata[0].actionPlanHistory){
      let history = this.modalCtrl.create(CalendarPage, { historyData: this.monthdata[0].actionPlanHistory },option);
      
      history.present();
    }else{
      this.utility.showToast("No history data found. ");
    }
   
  }
  public updateMSESRating(auditId, rating) {
    this.utility.showLoader("Updating data...");
    let inputdata = {
      auditId: this.auditId,
      rating: this.rating,
    }
    this.commonServiceProvider.updateMSESRating(inputdata).subscribe((res) => {
      if (res.success) {
        this.utility.hideLoader();
        if (this.status != "Closed") {
          if(this.rating > this.targetPoint  || this.rating == this.targetPoint){
            this.ShowNext=false;
            this.utility.showAlert("Congratulations", "Target has achieved");
            this.navCtrl.push(AuditsPage);
          }else{
            this.utility.showAlert("Confirmation", "Your rating is less then target value please enter next action plan here.");
            this.ShowNext=true;
         }

        } else {
          this.ShowNext = false;
          this.utility.showAlert("Warning", "Rating already inserted, Target is completed")
        }
      } else {
        this.utility.hideLoader();
        this.utility.showAlert("System alert", res.message);
      }
    },(err)=>{
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
    } else {
      this.updateActionPlan(this.auditId, this.actionPlan, this.actionPlanDate)
    }
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
        this.utility.showAlert("System alert",res.message);
       // this.utility.showAlert("System alert", "Action Plan Date cannot be less than Rating submission date")
      }
    },(err)=>{
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
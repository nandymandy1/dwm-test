import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { UpdateActionPlanPage } from '../update-action-plan/update-action-plan';
import { ActionPlanPage } from '../action-plan/action-plan';
import { AuditmsesAPage } from '../auditmses-a/auditmses-a';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UtilityProvider } from '../../../providers/utility/utility';
import { AuditsPage } from '../../manager/audits/audits';
import { CalendarPage } from '../../manager/calendar/calendar';

@Component({
  selector: 'page-sustenance',
  templateUrl: 'sustenance.html',
})
export class SustenancePage {
  actionPlanDate1: string;
  selectedDate1: any;
  actionPlanDate: string;
  selectedDate: any;
  auditId: any;
  score: any;
  rating: any;
  releaseDate: any;
  auditDate: any;
  auditType: any;
  location: any;
  supplierName: any;
  area: any;
  owner: any;
  processName: any;
  Details: any;
  private MMAForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, public commonServiceProvider: CommonServiceProvider,
    public utility: UtilityProvider, public modalCtrl: ModalController) {
    this.MMAForm = this.fb.group({
      rating: [null, Validators.compose([
        Validators.required,
      ]),],
      score: [null, Validators.compose([
        Validators.required,
      ]),]
    });

    this.Details = this.navParams.get("auditdata");
    console.log("this.Details::",this.Details)
    this.processName = this.Details.processName;
    this.owner = this.Details.owner;
    this.area = this.Details.area;
    this.supplierName = this.Details.supplierName;
    this.location = this.Details.supplierLocation;
    console.log(this.Details.supplierLocation);
    
    this.auditType = this.Details.type;
    this.auditDate = this.Details.plannedRatingDate;
    this.releaseDate = this.Details.plannedReportReleaseDate;
    this.auditId = this.Details.auditId;
  }

  ionViewDidLoad() {
    this.Details = this.navParams.get("auditdata");
    this.processName = this.Details.processName;
    this.owner = this.Details.owner;
    this.area = this.Details.area;
    this.supplierName = this.Details.supplierName;
    this.location = this.Details.supplierLocation;
    this.auditType = this.Details.type;
    this.auditDate = this.Details.plannedRatingDate;
    this.releaseDate = this.Details.plannedReportReleaseDate;
    this.auditId = this.Details.auditId;
    console.log('ionViewDidLoad SustenancePage');
  }

  goBack() {
    this.navCtrl.pop();
  }
  
  submit() {
    let rating = this.MMAForm.controls.rating.value;
    let score = this.MMAForm.controls.score.value;
    this.rating = rating;
    this.score = score;
    // if (this.rating.length > 0 && this.score.length > 0) {
      this.updateSustenanceAudit(this.rating, this.score, this.auditId, this.actionPlanDate, this.actionPlanDate1)
    // } else {
    //   this.utility.showAlert("Failure", "Please enter score and rating")
    // }
  }

  dateChange(event) {
    console.log(event);
    this.actionPlanDate = event.day + "-" + event.month + "-" + event.year;
  }
  dateChange1(event) {
    console.log(event);
    let day = null;
    let month = null;
    if(event.day < 10){
      day='0'+event.day
    } else {
      day = event.day
    }
    if(event.month < 10){
      month='0'+event.month
    } else {
      month = event.month
    }

    this.actionPlanDate1 = day + "-" + month + "-" + event.year;
  }
  updateSustenanceAudit(rating, score, auditId, actionPlanDate, actionPlanDate1) {
    this.utility.showLoader("Updating data...");
    let inputdata = {
      auditId: this.auditId,
      // rating: this.rating,
      // score: parseInt(this.score),
      // actualRatingDate: actionPlanDate,
      actualReportReleaseDate: actionPlanDate1,
      // ratingOrScorePresent:false
    }
    this.commonServiceProvider.updateSustenanceAudit(inputdata).subscribe((res) => {
      this.utility.hideLoader();
      if (res.success) {
        this.navCtrl.pop();
        this.utility.showAlert("Confirmation", "Rating inserted successfully");
        if (res.length > 0) {
          this.utility.showAlert("Failure", "Data not found")
        }
      } else {
        this.utility.showAlert("System alert", res.message);
      }
    }, (err) => {
      this.utility.hideLoader();
      this.utility.showAlert("System alert", "Something went wrong, please try again after some time");
    });
  }

  showHistory(){
    // console.log(this.monthdata[0].actionPlanHistory);
    // let option={
    //   showBackdrop:true,
    //   enableBackdropDismiss:true,
    //   cssClass:'modalCss'
    // }
    // if(this.monthdata[0].actionPlanHistory){
    //   let history = this.modalCtrl.create(CalendarPage, { historyData: this.monthdata[0].actionPlanHistory },option);
      
    //   history.present();
    // }else{
    //   this.utility.showToast("No history data found. ");
    // }
   
  }

}

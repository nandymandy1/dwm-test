import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constant } from '../../../constants/constant';
import { PolicySheetManagerPage } from '../policy-sheet-manager/policy-sheet-manager';
import {Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { DataProvider } from '../../../providers/data/data';
import { UtilityProvider } from '../../../providers/utility/utility';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-request-action-plan',
  templateUrl: 'request-action-plan.html',
})
export class RequestActionPlanPage {
  id:any;
  userList = [];
  generatedTo: any;
  actionPlanForm;
  actionPlanDate: string;
  varianceReason:string;
  actionPlanDetail:string;
  private escalateForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider,
    public dataProvider: DataProvider,
    public storage: Storage,
    private fb: FormBuilder,
    public utility: UtilityProvider
  ) {
    this.actionPlanForm = this.fb.group({
      varianceReason: ["", Validators.compose([Validators.required])],
      actionPlanDetail: ["", Validators.compose([Validators.required])]
    });
    this.id = this.navParams.get("id");
    console.log("this.id",this.id);
    console.log("this.navParams.get(id)",this.navParams.get("id"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerEscalatePage');
  }
  onSubmit(){
    this.requestActionPlan();
  }
  requestActionPlan() {
    this.utility.showLoader("Fetching data ...")
    var data={
      "Id": null,
      "PolicySheetTrackerId": this.id,
      "VarianceReason": this.varianceReason,
      "ActionPlanDetail": this.actionPlanDetail,
      "ActionPlanDate": this.actionPlanDate
      };
    this.commonServiceProvider.requestActionPlan(data).subscribe((res) => {      
      if (res.success) {
        this.navCtrl.setRoot(PolicySheetManagerPage);
        this.utility.hideLoader();
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

}

import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UtilityProvider } from "../../../providers/utility/utility";
import { CommonServiceProvider } from "../../../providers/common-service/common-service";
import { DataProvider } from "../../../providers/data/data";
import { Storage } from "@ionic/storage";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Constant } from "../../../constants/constant";
import { PolicySheetManagerPage } from "../policy-sheet-manager/policy-sheet-manager";


@IonicPage()
@Component({
  selector: 'page-manager-escalate',
  templateUrl: 'manager-escalate.html',
})
export class ManagerEscalatePage {
  escalatData:any;
  userList = [];
  generatedTo: any;
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
    this.escalateForm = this.fb.group({
      text: ["", Validators.compose([Validators.required])]
    });
    this.escalatData = this.navParams.get("escalatData");
    this.getParentUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerEscalatePage');
  }
  getParentUsers() {
    this.utility.showLoader("Fetching data ...")
    this.commonServiceProvider.getParentUsers().subscribe((res) => {
      if (res.success) {
        console.log("resData", res);
        this.userList = res.payload;
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
  onSubmit(){
    this.escalateRecord();
  }
  escalateRecord() {
    this.utility.showLoader("Fetching data ...")
    var data = {
      "policySheetId": this.escalatData.id,
      "GeneratedTo": this.generatedTo,
      "AdditionalComment": this.escalateForm.controls.text.value,
      "LOP":this.escalatData.lop
    };
    this.commonServiceProvider.escalateRecord(data).subscribe((res) => {
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
  userChange(event) {
    console.log("id", event);

    this.generatedTo = event;
  }

}

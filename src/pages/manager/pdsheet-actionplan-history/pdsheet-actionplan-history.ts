import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { UtilityProvider } from "../../../providers/utility/utility";
import { CommonServiceProvider } from "../../../providers/common-service/common-service";
import { Constant } from "../../../constants/constant";

/**
 * Generated class for the PdsheetActionplanHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pdsheet-actionplan-history",
  templateUrl: "pdsheet-actionplan-history.html"
})
export class PdsheetActionplanHistoryPage {
  history = [];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utility: UtilityProvider,
    public commonServiceProvider: CommonServiceProvider
  ) {
    console.log("historyData", this.navParams.get("historyData"));
    this.history = this.navParams.get("historyData");
    console.log("this.history", this.history);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    this.history = this.navParams.get("historyData");
    console.log("ionViewDidLoad CalendarViewPage");
  }
  update(event, list) {
    console.log("click", event, list);
    if (event) {
      this.approveActionPlan(list.id);
    }
  }
  approveActionPlan(id) {
    this.utility.showLoader("Updating data...");
    let inputdata = {
      Id: id,
      PolicySheetTrackerId: this.navParams.get("policySheetId")
    };
    this.commonServiceProvider.approveActionPlan(inputdata).subscribe(
      res => {
        if (res.success) {
          this.utility.hideLoader();
          this.navCtrl.pop();
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
  test(event) {
    console.log("event.target.value", event);
  }
}

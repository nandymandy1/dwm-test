import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UtilityProvider } from "../../../providers/utility/utility";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-traning-report",
  templateUrl: "traning-report.html"
})
export class TraningReportPage {
  summary: any;

  list: any;
  tnf: any;
  noDataFound = "";

  trainingList: any;
  arrReport = [];
  expandFlag = [];
  pilotTrainigList = [];
  role = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utility: UtilityProvider,
    public storage: Storage
  ) {
    //load user type
    this.storage.get("loginDetails").then((data: any) => {
      this.role = data.payload.profile.userType;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TraningReportPage");
    this.list = this.navParams.get("trainingList");
    this.summary = this.navParams.get("summary");
    this.pilotTrainigList = this.navParams.get("pilotTrainigList");
    this.trainingList = this.list;
    console.log("this.list..", this.list);
    console.log(" this.summary...", this.summary);
    console.log("this.trainingList....", this.trainingList);
    console.log(this.summary);
  }

  setVisibilityFlags(index) {
    let temp = this.expandFlag[index];
    this.expandFlag[index] = !temp;
  }
}

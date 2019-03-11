import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DashboardPage } from "../../dashboard/dashboard";
import { Storage } from "@ionic/storage";
import { TraningReportPage } from "../../manager/traning-report/traning-report";
import { CommonServiceProvider } from "../../../providers/common-service/common-service";
import { DataProvider } from "../../../providers/data/data";
import { UtilityProvider } from "../../../providers/utility/utility";
import { Constant } from "../../../constants/constant";

@IonicPage()
@Component({
  selector: "page-training-calendar",
  templateUrl: "training-calendar.html"
})
export class TrainingCalendarPage {
  finalListWithFalse2 = [];
  attendedList2 = [];
  behaviouralList2 = [];
  functionalList2 = [];
  summary = [];
  status1: any;
  finalListPilotWithTrue = [];
  finalListPilot = [];
  trainingId: any;
  Id: any;
  status: any;
  finalList = [];
  finalListWithFalse: any;
  finalListWithTrue: any;
  attendedList = [];
  behaviouralList = [];
  functionalList = [];
  attendedList1 = [];
  behaviouralList1 = [];
  functionalList1 = [];
  list: any;
  profile: any;
  payload: any;
  role: any;
  Details: any;
  arrReport = [];
  expandFlag = [];
  pilotTrainigList = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider,
    public dataProvider: DataProvider,
    public storage: Storage,
    public utility: UtilityProvider
  ) {
    this.storage.get("loginDetails").then((data: any) => {
      this.Details = data;
      this.payload = this.Details.payload;
      this.profile = this.payload.profile;
      this.role = this.profile.userType;
      this.getTraningCalendarList(this.payload);
    });
  }
  // ionViewDidLoad() {
  //  // console.log('ionViewDidLoad TrainingCalendarPage');
  //  this.storage.get('loginDetails').then((data: any) => {
  //   this.Details = data;
  //   this.payload = this.Details.payload;
  //   this.profile = this.payload.profile;
  //   this.role = this.profile.userType;
  //   this.getTraningCalendarList( this.payload);
  // })

  // }

  radioValue(status) {
    // this.status1 = status;
    console.log("fjdgfhgkjd", status);
  }

  dateInBetweenTodaysDate(fromDate, toDate) {
    var currentDate = new Date();
    var minDate = new Date(fromDate);
    var maxDate = new Date(toDate);
    // var dateFrom = fromDate;
    // var dateTo = toDate;
    // var d1 = [];
    // d1 = dateFrom.split("/");
    // var d2 = [];
    // d2 = dateTo.split("/");
    // var c = [];
    // c = dateCheck.split("/");

    // var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
    // var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    // var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    // console.log(check > from && check < to)
    // console.log(check <= from && check >= to)
    if (currentDate > minDate && currentDate < maxDate) {
      return true;
    }
    return false;
  }
  submit(finalListWithTrue) {
    console.log("fjdgfhgkjd", finalListWithTrue);
    if (finalListWithTrue.flag == -1) {
      //please celect
    } else {
      this.status1 = finalListWithTrue.flag;
      this.updateTrainingCalendar(
        finalListWithTrue.item.trainingId,
        this.status1
      );
    }

    // this.trainingId = finalListWithTrue.trainingId;
    // if (this.status1 == "undefined" || this.status1 == null || this.status1 == '') {
    //   this.utility.showAlert("Failure", "Please select radio button first")
    // } else {
    //
    // }
  }
  onRightMenu() {
    this.navCtrl.push(TraningReportPage, {
      trainingList: this.finalListWithFalse,
      summary: this.summary,
      pilotTrainigList: this.pilotTrainigList
    });
  }

  setVisibilityFlags(index) {
    let temp = this.expandFlag[index];
    //this.expandFlag.fill(false)
    this.expandFlag[index] = !temp;
  }

  getTraningCalendarList(profile) {
    this.utility.showLoader("Fetching data...");
    this.commonServiceProvider.getTraningCalendarList(profile).subscribe(
      res => {
        this.utility.hideLoader();
        if (res.success) {
          this.list = res.payload;

          // Prepare the list of the attended trainings
          this.attendedList1 = this.list.statusSubmittedTraining;
          console.log("attendedList1", this.attendedList1);

          // Prepare the list of behaviour and functional trainings individually
          this.behaviouralList1 = this.list.behaviouralTraining;
          this.functionalList1 = this.list.functionalTraining;

          // prepare the list of attended tranings in which allowed to update is true
          this.attendedList2 = this.attendedList1.filter(
            a => a.allowedToUpdateStatus == true
          );
          console.log("attendedList2", this.attendedList2);

          // prepare the list of behavioural tranings in which allowed to update is true
          this.behaviouralList2 = this.behaviouralList1.filter(
            a => a.allowedToUpdateStatus == true
          );

          // prepare the list of functional tranings in which allowed to update is true
          this.functionalList2 = this.functionalList1.filter(
            a => a.allowedToUpdateStatus == true
          );

          this.summary = this.list.summaryList;
          console.log("Summary ", this.summary);
          this.finalListWithFalse = [
            this.attendedList1.filter(a => a.allowedToUpdateStatus == false),
            this.functionalList1.filter(a => a.allowedToUpdateStatus == false),
            this.behaviouralList1.filter(a => a.allowedToUpdateStatus == false)
          ];

          // Fill in the pilot training list accessible only in case of pilot as user
          this.pilotTrainigList = [
            ...res.payload.behaviouralTraining,
            ...res.payload.statusSubmittedTraining,
            ...res.payload.functionalTraining
          ];

          this.finalListWithFalse = this.attendedList1.concat(
            this.behaviouralList1
          );
          this.finalListWithFalse = this.finalListWithFalse.concat(
            this.functionalList1
          );
          this.finalListWithFalse = this.finalListWithFalse.filter(
            a => a.allowedToUpdateStatus == false
          );

          this.finalListWithFalse = this.finalListWithFalse.map(a1 => {
            let Arr;
            if (a1.length != 0) {
              let tnf = this.summary.filter(
                summary => summary.userName == a1.actorName
              )[0];
              Arr = {
                List: a1,
                total: tnf.total,
                tnf: tnf.tnf,
                attended: tnf.attended
              };
              return Arr;
            }
          });

          //   this.finalListWithFalse.push(this.summary)
          console.log("this.finalListWithFalse... : ", this.finalListWithFalse);

          this.finalListWithTrue = this.functionalList1.filter(
            a => a.allowedToUpdateStatus == true
          );
          for (var i = 0; i < this.behaviouralList1.length; i++) {
            this.finalList.push(this.behaviouralList1[i]);
          }

          // for (var i = 0; i < this.finalList.length; i++) {
          //   this.finalListPilot.push(this.finalList[i]);
          // }
          this.finalList = [...this.finalList];
          this.finalListPilotWithTrue = this.finalListPilot.filter(
            a => a.allowedToUpdateStatus == true
          );

          // if (this.finalListPilotWithTrue.length == 0) {
          //   this.utility.showAlert("Failure", "Training details are not available ")
          // }
        } else {
          this.utility.showAlert("System alert", res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateTrainingCalendar(Id, status) {
    this.utility.showLoader("Fetching data...");
    let inputdata = {
      status: status,
      Id: Id
    };
    this.commonServiceProvider.updateTrainingCalendar(inputdata).subscribe(
      res => {
        if (res.success) {
          this.utility.hideLoader();
          this.utility.showAlert(
            "Success",
            "Training report updated successfully"
          );
          this.status = "";
          this.storage.get("loginDetails").then((data: any) => {
            this.Details = data;
            this.payload = this.Details.payload;
            this.profile = this.payload.profile;
            this.role = this.profile.userType;
            this.getTraningCalendarList(this.payload);
          });
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
}

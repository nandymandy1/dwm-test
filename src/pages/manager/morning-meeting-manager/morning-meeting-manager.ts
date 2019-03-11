import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UtilityProvider } from '../../../providers/utility/utility';
import { DataProvider } from '../../../providers/data/data';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MorningMeetingManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-morning-meeting-manager',
  templateUrl: 'morning-meeting-manager.html',
})
export class MorningMeetingManagerPage {
  project: any;
  projectList: any;
  pay: any;
  pilot: any;
  profile: any;
  payload: any;
  Details: any;
  projectid: any;
  userId: any;
  startDate = "";
  endDate = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider, public dataProvider: DataProvider,
    public storage: Storage, public utility: UtilityProvider) {
    this.startDate = "Test";
    //this.getProjectListForManager();
  }
  projectChange(event) {
    console.log("event" + event);
    this.projectid = event;
    console.log("this.projectId....." + this.projectid);
    // this.getPilotList(this.userId, this.projectid);
  }
  dateChange(event) {
    console.log("event1..." + event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorningMeetingManagerPage');
  }

  // public getProjectListForManager() {
  //   console.log("get project")
  //   this.utility.showLoader("Fetching data...");
  //   this.storage.get('loginDetails').then((data) => {
  //     this.Details = data;
  //     this.payload = this.Details.payload;
  //     this.profile = this.payload.profile;
  //     this.userId = this.profile.userId;
  //     this.commonServiceProvider.getProjectListForManager().subscribe((res) => {
  //       if (res) {
  //         this.utility.hideLoader();
  //         this.project = res.payload;
  //         this.projectList = this.project.projectList;
  //         console.log("this.projectList....." + JSON.stringify(this.projectList));
  //       }
  //     },(err)=>{
  //       this.utility.hideLoader();
  //       this.utility.showAlert("System alert", "Something went wrong, please try again after some time");
  //     });
  //   })
  // }
}

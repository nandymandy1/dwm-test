import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { UtilityProvider } from "../../../providers/utility/utility";
import { CommonServiceProvider } from "../../../providers/common-service/common-service";
import { DashboardPage } from "../../dashboard/dashboard";

/**
 * Generated class for the RatingRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *
 */

@IonicPage()
@Component({
  selector: "page-ratings-requests",
  templateUrl: "rating-requests.html"
})
export class RatingRequestsPage {
  payload: any;
  profile: any;
  role: any;
  Details: any;
  ratings: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public utility: UtilityProvider,
    public commonServiceProvider: CommonServiceProvider
  ) {
    this.storage.get("loginDetails").then(data => {
      this.Details = data;
      this.payload = this.Details.payload;
      this.profile = this.payload.profile;
      this.role = this.profile.userType;
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad Rating Requests Page");
    this.getRatingRequests();
  }

  getRatingRequests() {
    this.commonServiceProvider.getRatingRequests().subscribe((res: any) => {
      console.log(res);
      this.ratings = res.payload;
    });
  }

  // Go back to the dashborad
  goBack() {
    this.navCtrl.setRoot(DashboardPage);
  }

  // Approve or reject the request
  approveOrReject(id, requestType) {
    let data = {
      Id: id,
      ApprovalStatus: requestType
    };

    this.commonServiceProvider
      .updateRatingRequestHOD(data)
      .subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          this.utility.showToast("Success", res.message);
          // this.ratings.map(rating => {
          //   if(rating.id == data.Id){
          //     rating.allowedToUpdateStatus == false;
          //   }
          // });
          this.getRatingRequests();
        } else {
          this.showErrorToast(res.message);
        }
      });
  }

  // show error toast
  showErrorToast(message) {
    this.utility.showToast("Success", message);
  }
}

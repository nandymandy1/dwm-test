import { Component, ViewChild } from "@angular/core";
import {
  Platform,
  AlertController,
  NavController,
  App,
  Events
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { DataProvider } from "../providers/data/data";
import { Network } from "@ionic-native/network";
import { AppVersion } from "@ionic-native/app-version";
import { Diagnostic } from "@ionic-native/diagnostic";
import { CommonServiceProvider } from "../providers/common-service/common-service";
import { LoginPage } from "../pages/login/login";
import { DashboardPage } from "../pages/dashboard/dashboard";
import { Storage } from "@ionic/storage";
import { UtilityProvider } from "../providers/utility/utility";
import { RatingRequestsPage } from "../pages/manager/rating-requests/rating-requests";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  pay: any;
  role: any;
  profile: any;
  payload: any;
  Detail: any;
  UserRole: any;
  appversion = "";
  rootPage: any;
  pages: Array<{ title: string; component: any; icon: any }>;
  public isUserExist: boolean = false;
  @ViewChild("rootNavController") nav: NavController;
  constructor(
    public dataProvider: DataProvider,
    private platform: Platform,
    private alertCtrl: AlertController,
    private statusBar: StatusBar,
    public appVersion: AppVersion,
    private diagnostic: Diagnostic,
    public networkStatus: Network,
    public events: Events,
    public splashScreen: SplashScreen,
    private storage: Storage,
    public utility: UtilityProvider,
    public commonServiceProvider: CommonServiceProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      //this.initializeApp();
      this.events.subscribe("callFunction", data => {
        this.sessionCheck("login");
      });
      this.sessionCheck("noLogin");

      platform.registerBackButtonAction(() => {
        //let nav = app.getActiveNavs()[0];
        let activeView = this.nav.getActive();
        if (activeView.instance instanceof DashboardPage) {
          const alert = this.alertCtrl.create({
            title: "App termination",
            message: "Do you want to close the app?",
            buttons: [
              {
                text: "No",
                role: "cancel",
                handler: () => {
                  console.log("Application exit prevented!");
                }
              },
              {
                text: "Close App",
                handler: () => {
                  this.platform.exitApp(); // Close this application
                }
              }
            ]
          });
          alert.present();
        } else {
          if (this.nav.canGoBack()) {
            //Can we go back?
            this.nav.pop();
          } else {
          }
        }
      });
    });
    this.platform.registerBackButtonAction(() => {
      console.log("Back click");
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //TODO: Uncomment in PROd
      this.appVersion.getVersionNumber().then(version => {
        this.appversion = version;
      });

      if (this.networkStatus.type != "none") {
        //Todo: Uncomment in Prod
        this.updateCheck()
          .then(response => {
            //Show force update dialog
            console.log(response);
            this.showForceUpdateDialog(response.DOWNLOADLINK);
          })
          .catch(error => {
            if (error == -1) {
              this.initializeApp();
            } else {
              this.events.subscribe("callFunction", data => {
                this.sessionCheck("login");
              });
              this.sessionCheck("noLogin");
            }
          });
      } else {
        this.utility.showAlert("Try again, no internet connectivity");
        this.platform.exitApp();
      }
    });
  }

  updateCheck(): Promise<any> {
    return new Promise((resolve, reject) => {
      let updateCheckData: any = {};
      this.appVersion.getPackageName().then(pkgName => {
        updateCheckData.PACKAGE_NAME = pkgName;

        if (this.platform.is("android")) {
          updateCheckData.AppType = "ANDROID";
        } else {
          updateCheckData.AppType = "IOS";
        }

        this.commonServiceProvider.updateAppVersion(updateCheckData).subscribe(
          response => {
            console.log(
              "Package Name response",
              response.ResultObject[0].FORCE_UPDATE
            );
            this.utility.hideLoader();
            if (response.ResultObject[0].FORCE_UPDATE) {
              this.appVersion.getVersionNumber().then(version => {
                let versionInt = parseInt(version.replace(/\./g, ""));
                console.log("Local Version", versionInt);
                console.log(
                  "Cloud Version",
                  response.ResultObject[0].VERSION_CODE
                );
                if (versionInt < response.ResultObject[0].VERSION_CODE) {
                  resolve(response.ResultObject[0]);
                } else {
                  reject();
                }
              });
            } else {
              reject();
            }
          },
          err => {
            if (err.status == 0 || err.status == 500) {
              this.utility.hideLoader();
              this.utility.showToast(
                "Please check network connection and try again!!!"
              );
            } else {
              this.utility.hideLoader();
              this.utility.showToast(
                "Something went wrong, please try again after some time"
              );
            }
          }
        );
      });
    });
  }
  showForceUpdateDialog(APP_URL) {
    this.splashScreen.hide();
    let alert = this.alertCtrl.create({
      title: "M-SET Updates",
      message:
        "New version of SBU-Audit is avalible. Please update to latest version and enjoy all the new features.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.platform.exitApp();
          }
        },
        {
          text: "Let's go",
          handler: () => {
            window.open(APP_URL, "_system");
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }

  public onLogout(): void {
    const alert = this.alertCtrl.create({
      title: "Confirmation",
      message: "Do you want to logout?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("Application exit prevented!");
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.storage.remove("loginDetails");
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  sessionCheck(tag) {
    this.storage.get("loginDetails").then(val => {
      console.log("uussseeerrrrrr", val);
      if (val) {
        this.Detail = val;
        this.pay = this.Detail.payload;
        this.profile = this.pay.profile;
        this.role = this.profile.userType;
        this.dataProvider.setUserSessionToken(val);
        if (this.role == "Pilot") {
          this.pages = [
            {
              title: "Dashboard",
              component: DashboardPage,
              icon: "custom-dashboard"
            }
            // { title: 'Audits', component: AuditsPage, icon: "custom-Audit" },
            // { title: 'Monthly Visit Plan(Coming Soon)', component: MonthlyVisitPlanPage, icon: "custom-monthlyVisit" },
            // { title: 'Morning Meeting (Coming Soon)', component: MorningMeetingPage, icon: "custom-morningMeet" },
            //{ title: 'Monthly Visit Plan(Coming Soon)', component: '', icon: "custom-monthlyVisit" },
            //{ title: 'Morning Meeting (Coming Soon)', component: '', icon: "custom-morningMeet" },
            // { title: 'Training Calendar', component: TrainingCalendarPage, icon: "custom-trainingCal" },
            // { title: 'Policy Sheet', component: PolicySheetPage, icon: "custom-policySheet" },
            // { title: 'Consolidated Tracker', component: ConsolidatedPage, icon: "custom-tracker" },
            // { title: 'About Us', component: DashboardPage, icon: "custom-aboutUs" }
          ];
          if (tag == "login") {
            this.nav.setRoot(DashboardPage);
          } else {
            this.rootPage = DashboardPage;
          }
        } else {
          this.pages = [
            {
              title: "Dashboard",
              component: DashboardPage,
              icon: "custom-dashboard"
            }
            // { title: 'Audits', component: AuditsPage, icon: "custom-Audit" },
            // { title: 'Monthly Visit Plan(Coming Soon)', component: ViewMonthlyVisitPlanPage, icon: "custom-monthlyVisit" },
            // { title: 'Morning Meeting(Coming Soon)', component: MorningMeetingManagerPage, icon: "custom-morningMeet" },
            //{ title: 'Monthly Visit Plan(Coming Soon)', component: '', icon: "custom-monthlyVisit" },
            //{ title: 'Morning Meeting(Coming Soon)', component: '', icon: "custom-morningMeet" },
            // { title: 'Training Calendar', component: TrainingCalendarPage, icon: "custom-trainingCal" },
            // { title: 'Policy Sheet', component: PolicySheetManagerPage, icon: "custom-policySheet" },
            // { title: 'Consolidated Tracker', component: ConsolidatedPage, icon: "custom-tracker" },
            // { title: 'About Us', component: DashboardPage, icon: "custom-aboutUs" }
          ];
          if (this.role == "HOD2" || this.role == "Manager") {
            this.pages.push({
              title: "Requests ",
              component: RatingRequestsPage,
              icon: "git-pull-request"
            });
          }
          if (tag == "login") {
            this.nav.setRoot(DashboardPage);
          } else {
            this.rootPage = DashboardPage;
          }
        }
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

  public onBack() {
    this.nav.pop();
  }

  openPage(page) {
    this.navigateTo(page.component);
  }

  navigateTo(PAGE) {
    let current_view = this.nav.getActive();
    if (current_view.instance instanceof PAGE) {
      //Do Nothing
    } else {
      let viewIndex = this.isInStack(PAGE);
      if (viewIndex != -1) {
        if (viewIndex != 0) {
          this.nav.remove(viewIndex).then(_ => {
            this.nav.push(PAGE, { fromSideMenu: true });
          });
        } else {
          this.nav.popToRoot(PAGE);
        }
      } else {
        this.nav.push(PAGE, { fromSideMenu: true });
      }
    }
  }

  isInStack(mPAGE): any {
    let views = this.nav.getViews();
    for (let i = 0; i < views.length; i++) {
      if (views[i].instance instanceof mPAGE) {
        return i;
      }
    }
    return -1;
  }
}

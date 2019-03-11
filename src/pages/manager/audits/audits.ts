import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SustenancePage } from "../../pilot/sustenance/sustenance";
import { MsesAPage } from "../../pilot/mses-a/mses-a";
import { MsesbCPage } from "../../pilot/msesb-c/msesb-c";
import { MmaPage } from "../../pilot/mma/mma";
import { FirewallPage } from "../../pilot/firewall/firewall";
import { AuditSustenancePage } from "../../pilot/audit-sustenance/audit-sustenance";
import { AuditmsesAPage } from "../../pilot/auditmses-a/auditmses-a";
import { AuditmsesBcPage } from "../../pilot/auditmses-bc/auditmses-bc";
import { AuditfirewallPage } from "../../pilot/auditfirewall/auditfirewall";
import { AuditmmaPage } from "../../pilot/auditmma/auditmma";
import { Storage } from "@ionic/storage";
import { SustenanceManagerPage } from "../sustenance-manager/sustenance-manager";
import { MsesAManagerPage } from "../mses-a-manager/mses-a-manager";
import { MsesBcManagerPage } from "../mses-bc-manager/mses-bc-manager";
import { FirewallManagerPage } from "../firewall-manager/firewall-manager";
import { MmaManagerPage } from "../mma-manager/mma-manager";
import { DashboardPage } from "../../dashboard/dashboard";

@Component({
  selector: "page-audits",
  templateUrl: "audits.html"
})
export class AuditsPage {
  profile: any;
  payload: any;
  role: any;
  Details: any;
  UserRole: any;
  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.get("loginDetails").then(data => {
      this.Details = data;
      this.payload = this.Details.payload;
      this.profile = this.payload.profile;
      this.role = this.profile.userType;
      // this.role = 'Manager';
      console.log("audit role", this.role);
    });
  }
  goBack() {
    this.navCtrl.setRoot(DashboardPage);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad AuditsPage");
    console.log("role", this.UserRole);
  }
  sustenance() {
    this.navCtrl.push(AuditSustenancePage);
  }
  msesA() {
    this.navCtrl.push(AuditmsesAPage);
  }
  msesBC() {
    this.navCtrl.push(AuditmsesBcPage);
  }
  firewall() {
    this.navCtrl.push(AuditfirewallPage);
  }
  mma() {
    this.navCtrl.push(AuditmmaPage);
    //this.navCtrl.push(MsesAManagerPage ,{dataType:"MSES-a"})
  }

  msesAManager() {
    this.navCtrl.push(MsesAManagerPage, { dataType: "MSES-A" });
  }
  msesBManager() {
    this.navCtrl.push(MsesAManagerPage, { dataType: "MSES-B/C" });
  }
  sustManager() {
    this.navCtrl.push(SustenanceManagerPage);
  }
  msesManager() {
    // this.navCtrl.push(MsesAManagerPage ,{dataType:"MSES-B/C"})
  }
  msesbcManager() {
    this.navCtrl.push(MsesBcManagerPage);
  }
  firewallManager() {
    //this.navCtrl.push(FirewallManagerPage);
  }
  mmaManager() {
    this.navCtrl.push(MmaManagerPage);
  }
}

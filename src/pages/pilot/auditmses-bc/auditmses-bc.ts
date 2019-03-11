import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MsesbCPage } from '../msesb-c/msesb-c';
import { Storage } from '@ionic/storage';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { DataProvider } from '../../../providers/data/data';
import { UtilityProvider } from '../../../providers/utility/utility';
import { AuditsPage } from '../../manager/audits/audits';
import { Constant } from '../../../constants/constant';

@IonicPage()
@Component({
  selector: 'page-auditmses-bc',
  templateUrl: 'auditmses-bc.html',
})
export class AuditmsesBcPage {

  filteredList: any[];
  noDataFound: string;
  targetPoint: any;
  auditType: string;
  supplierId: any;
  pay1: any;
  supplier: any;
  projectId: any;
  pay: any;
  projectList = [];
  supplierList = [];
  auditList = [];
  targetList: any;
  user: any;
  project: any;
  projectid: string;
  userId: any;
  profile: any;
  Details: any;
  payload: any;

  searchTerm: string = '';

  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonServiceProvider: CommonServiceProvider, public dataProvider: DataProvider,
    public storage: Storage, public utility: UtilityProvider) {
      this.storage.get('loginDetails').then((data) => {
        this.Details = data;
        this.payload = this.Details.payload;
        this.profile = this.payload.profile;
        this.getSupplierListForPilot(this.payload);
        this.setFilteredItems();
      })
  }

  supChange(item) {
    this.auditList = [];
    console.log("event supChange", item.id);
    this.searchTerm = item.name;
    this.filteredList = [];
    this.getAuditListForPilot(item.id);
  }

  ionViewDidLoad() {
    // this.getSupplierListForPilot();
    // this.setFilteredItems();

  }

  onSearchInput() {
    this.setFilteredItems();
  }
  setFilteredItems() {
    this.filteredList = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    return this.supplierList.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }
  continue() {
    console.log("this.targetList.length", this.targetList.length)
    if (this.targetList.length > 0) {
      this.navCtrl.push(MsesbCPage, { auditdata: this.auditList })
      this.noDataFound = "";
    } else {
      this.noDataFound = "Target Not Set"
      //this.utility.showAlert("Failure", "Data not found")
    }
  }

  public getSupplierListForPilot(data) {
    // this.utility.showLoader("Fetching data...");
    // this.commonServiceProvider.getSupplierListForPilot(data).subscribe((res) => {
    //   if (res.success) {
    //     this.utility.hideLoader();
    //     this.supplier = res;
    //     this.pay = this.supplier.payload;
    //     this.supplierList = this.pay.model;
    //     this.filteredList =  this.supplierList;
    //     console.log("supplier new : " + JSON.stringify(this.supplierList));
    //   } else {
    //     this.utility.hideLoader();
    //     this.utility.showAlert("System alert", res.message);
    //   }
    // },(err)=>{
    //   if (err.status == 0 || err.status == 500) {
    //     this.utility.hideLoader();
    //     this.utility.showToast(Constant.MSGS.ERROR_NETWORK_UNAVAILABLE)
    //   } else {
    //     this.utility.hideLoader();
    //     this.utility.showToast("Something went wrong, please try again after some time");
    //   }
    // });

  }
  goBack(){
    this.navCtrl.setRoot(AuditsPage)
  }
  public getAuditListForPilot(supplierId) {
    // this.utility.showLoader("Fetching data...");
    // this.storage.get('loginDetails').then((data) => {
    //   this.Details = data;
    //   this.payload = this.Details.payload;
    //   this.profile = this.payload.profile;
    //   this.userId = this.profile.userId;
    //   this.auditType = "MSES-B/C";
    //   let inputdata = {
    //     supplierId: supplierId,
    //     auditType: this.auditType,
    //    }
    //   this.commonServiceProvider.getAuditListForPilot(inputdata).subscribe((res) => {
    //     if (res.success) {
    //       this.utility.hideLoader();
    //       this.auditList = res.payload;
    //      // this.targetList = res.payload.monthwiseTarget || [];
    //       if (this.auditList.length > 0) {
    //         this.noDataFound = "";
    //         this.targetList = res.payload[0].monthwiseTarget || [];
    //         console.log("this.targetList", this.targetList)
    //         console.log("this.targetList.length11", this.targetList.length)
    //       }else {
    //         this.noDataFound = "No Data Found"
    //       }

    //     } else {
    //       this.utility.hideLoader();
    //       this.noDataFound = "No Data Found"
    //     }
    //   },(err)=>{
    //     if (err.status == 0 || err.status == 500) {
    //       this.utility.hideLoader();
    //       this.utility.showToast(Constant.MSGS.ERROR_NETWORK_UNAVAILABLE)
    //     } else {
    //       this.utility.hideLoader();
    //       this.utility.showToast("Something went wrong, please try again after some time");
    //     }
        
    //   });
    // })
  }

}

import { Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions, Platform } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Injectable()
export class UtilityProvider {

  public loading: any = null;
  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private toast: ToastController,
   private toastCnt: Toast,
    private alertCtrl:AlertController
  ) {
    console.log('Hello DisplayServiceProvider Provider');
  }

  /******************** Show Loader ***************/
  public showLoader(message: string) {
    console.log(message)
    this.loading = this.loadingController.create({ content: message });
    this.loading.present();
  }

  public hideLoader() {
    setTimeout(()=>{
      if(this.loading){
        this.loading.dismissAll();
      }
      this.loading = null;      
    }, 1000);    
  }

  /*********************** Show toast */

  public showToast(message: string, cssClass: string = '', showCloseButton: boolean = false, position: string = 'center', duration: number = 3000): void {
    if (this.platform.is("cordova") && cssClass === "" && !showCloseButton) {
      this.toastCnt.show(message, duration.toString(), position).subscribe(res => {
        console.log("Native toast subscription", res);
      }, err => {
        console.log("Native toast subscription error", err);
      });
    } else {
      let options: ToastOptions = {
        message: message,
        showCloseButton: showCloseButton,
        position: position,
        cssClass: cssClass
      };
      if (!showCloseButton) {
        options.duration = duration;
      }
      let toast = this.toast.create(options);
      toast.present();
    }
  }

  public showAlert(Title="",SubTitle=""){
    this.alertCtrl.create({
      title:"",
      message:SubTitle,
      subTitle: Title,
      buttons:['OK'],
      enableBackdropDismiss:true
    }).present()
  }
}


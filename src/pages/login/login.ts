import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Keyboard, Platform, Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UtilityProvider } from '../../providers/utility/utility';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
import { DataProvider } from '../../providers/data/data';
import { Constant } from '../../constants/constant';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  dataService: any;
  userToken: any;
  password: any;
  userData: { userToken: string; password: string; role: string; };

  private loginForm: FormGroup;
  showPassword: boolean;
  type: string;
  public showKeyboardOffset: boolean = false;
  public keyboardOffsetHeight: number;
  public keyboardShowSubscription: Subscription;
  public keyboardHideSubscription: Subscription;
  public onKeyboardOffsetShow: Subject<void> = new Subject<void>();

  constructor(public navCtrl: NavController,
    private keyboard: Keyboard, private zone: NgZone, public commonServiceProvider: CommonServiceProvider, public dataProvider: DataProvider,
    private platform: Platform, public navParams: NavParams, public utility: UtilityProvider, private storage: Storage,
    private fb: FormBuilder, public events: Events) {
    this.loginForm = this.fb.group({
      //userId: ['211330', Validators.compose([
      //userId: ['23135699', Validators.compose([
      // userId: ['789456', Validators.compose([
      userId: ['123456', Validators.compose([
        Validators.required,
      ])],
      password: ['password', Validators.compose([
        Validators.required,
      ])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  public togglePassword(type: string): any {
    this.type = type;
    this.showPassword = !this.showPassword;
  }
  public onSubmit() {
    this.utility.showLoader("Logging in, please wait...");
    let username = this.loginForm.controls.userId.value;
    let password = this.loginForm.controls.password.value;

    let hash = btoa(password);
    let userData = { "username": username, "password": hash }
    if (this.loginForm.valid) {
      this.commonServiceProvider.loginUser(userData).subscribe((res) => {
        this.utility.hideLoader();
        if (res.success) {
          //  this.dataProvider.setUserSessionToken(res);
          this.storage.set('loginDetails', res).then((data) => {
            this.dataProvider.setUserSessionToken(res);
            this.events.publish("callFunction");
          });
        } else {
          this.utility.showAlert("Login Failed", res.message);
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
    } else {
      // this.storage.set('login', this.userData);
      // this.navCtrl.setRoot(DashboardPage);
      this.utility.showAlert("Warning", "Userid and Password is required.");
    }
  }

  public onTextInputFocus(event): void {
    if (this.platform.is("cordova") && this.platform.is("android")) {
      let element = event.target;
      let i: number = 1;
      while (element) {
        if (i++ > 3) {
          break;
        }
        element = element.parentNode;
        if (element.tagName === "DIV") {
          let subscription: Subscription = this.onKeyboardOffsetShow.subscribe(() => {
            element.scrollIntoView({ behavior: "smooth" });
            subscription.unsubscribe();
          });
          break;
        }
      }
    }
  }

  public onKeyboardShow(event): void {
    this.zone.run(() => {
      this.keyboardOffsetHeight = event.keyboardHeight - 100;
      this.showKeyboardOffset = true;
      setTimeout(() => this.onKeyboardOffsetShow.next(), 0);
    });
  }
  public onKeyboardHide(event): void {
    this.zone.run(() => {
      this.showKeyboardOffset = false;
    });
  }
}

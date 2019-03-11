import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../../dashboard/dashboard';
//import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-morning-meeting',
  templateUrl: 'morning-meeting.html',
})
export class MorningMeetingPage {

  array: Array<{ type: string,  nature: any }>;
  myColor: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams
    //,private datePicker: DatePicker
  ) {
        this.array = [
      { type:'1',  nature: "Direction" },
      { type:'2',  nature: "Information" },
    ]

  }

  ionViewDidLoad() {

  //   this.datePicker.show({
  //     date : new Date(),
  //     mode: 'date',
  //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  //   }).then(
  //     date => console.log('Got date: ', date),
  //     err => console.log('Error occurred while getting date: ', err)
  //   );
  //   console.log('ionViewDidLoad MorningMeetingPage');
  }



  submit(){
    this.navCtrl.push(DashboardPage)
  }
  selectNature(){
    console.log("open page")
  }
  
}

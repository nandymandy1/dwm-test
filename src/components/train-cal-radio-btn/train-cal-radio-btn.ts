
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'train-cal-radio-btn',
  templateUrl: 'train-cal-radio-btn.html'
})
export class TrainCalRadioBtnComponent {
  @Input('trainingData') trainingItem;
  @Output('OnStatus') clicked=new EventEmitter<any>()
  @Output('OnSubmit') submitClicked=new EventEmitter<any>();
  
  expandFlag:false;
  status;
  
    constructor() {
      console.log('Hello RadioGroupComponent Component');
      // this.text = 'Hello World';
      // console.log(this.trainingItem);
    }

    onInit(){
      console.log(this.trainingItem);
    }
  
    setAttended(item){
      this.clicked.emit({
        item,
        status:1
      })
    }
  
    setNotAttended(item){
      this.clicked.emit({
        item,
        status:0
      })
    }
  
    submit(item){
      console.log(this.status)
      if(this.status!=undefined){
        this.submitClicked.emit({
          item,
          flag:this.status
        })
      }else{
        this.submitClicked.emit({
          item,
          flag:-1
        })
      }
     
    }
  
  }
  

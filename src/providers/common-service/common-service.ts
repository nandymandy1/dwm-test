import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Constant } from '../../general/constant';
import { NetworkProvider } from '../network/network';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../../constants/constant';
import { Storage } from '@ionic/storage';
import { Observer } from 'rxjs/Observer';
/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {
  token: any;
  payload: any;
  Details: any;
  private _loginUrl: string = Constant.BASE_URL + 'api/User/Login';
  // project list for pilot
  private _projectListUrl: string = Constant.BASE_URL + 'api/Project/GetProjects';
  // private _supplierListForPilot: string = Constant.BASE_URL + 'api/Supplier/GetSuppliers?limit=1000000&offset=0';
  private _auditListForPilot: string = Constant.BASE_URL + 'api/Activity/GetMSESAudit';
  private _projectSpecificAuditListForPilot: string = Constant.BASE_URL + 'api/Activity/GetProjectSpecificAudit';
  private _updateRating: string = Constant.BASE_URL + 'api/Activity/UpdateProjectSpecificRating';//UpdateProjectSpecificRating
  private _updateMSESRating: string = Constant.BASE_URL + 'api/Activity/UpdateMSESRating ';
  private _updateActionPlan: string = Constant.BASE_URL + 'api/Activity/UpdateNextActionPlan';
  private _getTaskListForPilot: string = Constant.BASE_URL + 'api/Task/GetTaskList';
  private _updateTaskListForPilot: string = Constant.BASE_URL + 'api/Task/UpdateTaskList';
  private _getSustenanceListForPilot: string = Constant.BASE_URL + 'api/Activity/GetSustenanceAudits';
  private _getPolicySheet: string = Constant.BASE_URL + 'api/PolicySheet/GetPolicySheet';
  // private _updatePolicySheet : string=Constant.BASE_URL + 'api/PolicySheet/UpdatePolicySheet';
  private _updateSustenanceAuditForPilot : string=Constant.BASE_URL + 'api/Activity/UpdateSustenanceRating';
  private _getTraningCalendarList: string=Constant.BASE_URL + 'api/TrainingCalendar/GetTrainingCalendars';
  // project list for manager
  private _pilotListForManager: string = Constant.BASE_URL + 'api/Project/GetPilots';
  private _supplierListForManager: string = Constant.BASE_URL + 'api/Project/GetPilotProjectWiseSuppliers';
  private _auditListForManager: string = Constant.BASE_URL + 'api/Project/GetIndividualList';
  private _projectListForManager: string = Constant.BASE_URL + 'api/Project/GetProjectsForManager';
  private _updateTrainingCalendar: string = Constant.BASE_URL + 'api/TrainingCalendar/UpdateTrainingCalendar ';
  private _updateAppVersion: string =Constant.AppVersion;

  /****************************************************************************************************** */
  private _pilotListUrl: string = Constant.BASE_URL + 'api/User/GetPilots';
  private _subActivitiesUrl: string = Constant.BASE_URL + 'api/Activity/GetSubActivities';
  private _supplierListUrl: string = Constant.BASE_URL + 'api/Supplier/GetSuppliers';
  private _auditListUrl: string = Constant.BASE_URL + 'api/Activity/GetAudit';
  private _auditMSESListUrl: string = Constant.BASE_URL + 'api/Activity/GetMSESAudits';
  private _SustenanceAuditsListUrl: string = Constant.BASE_URL + 'api/Activity/GetSustenanceAudits';
  private _getEscalationHistoryUrl: string = Constant.BASE_URL + 'api/PolicySheet/GetEscalationHistory';
  private _getParentUsersUrl: string = Constant.BASE_URL + 'api/User/GetParentUsers';
  private _escalateRecordUrl: string = Constant.BASE_URL + 'api/PolicySheet/GenerateEscalation';
  private _addRemarksUrl: string = Constant.BASE_URL + 'api/PolicySheet/AddRemarks';
  private _getActionPlanTrackersUrl: string = Constant.BASE_URL + 'api/ActionPlan/GetActionPlanTrackers';
  private _getActionPlanHistoryUrl: string = Constant.BASE_URL + 'api/ActionPlan/GetActionPlanHistory';
  private _getRatingRequestsUrl:string = Constant.BASE_URL + 'api/Request/GetRatingRequests';
  private _updateRatingRequestUrl:string = Constant.BASE_URL + 'api/Request/UpdateRatingRequestStatus';


  private _getPDSheetActionPlanHistoryUrl: string = Constant.BASE_URL + 'api/PolicySheet/GetPDSheetActionPlanHistory';
  private _requestActionPlanUrl: string = Constant.BASE_URL + 'api/PolicySheet/RequestActionPlan';
  private _approveActionPlanUrl: string = Constant.BASE_URL + 'api/PolicySheet/ApproveActionPlan';
  constructor(public http: HttpClient, private network: NetworkProvider, public storage: Storage) {
  }

  public loginUser(loginData: any): Observable<any> {
    return this.network.userLogin(this._loginUrl, loginData);
  }
  public getPilotList(data): Observable<any> {
    return this.network.getData(this._pilotListForManager, data);
  }
  // public getSupplierList(data): Observable<any> {
  //   return this.network.getData(this._supplierListForManager, data);
  // }
  public getProjectList(data): Observable<any> {
    return this.network.getAuditDataData(this._projectListUrl, data);
  }
  // public getSupplierListForPilot(data): Observable<any> {
  //   return this.network.getData(this._supplierListForPilot, data);
  // }
  // public getProjectListForManager(): Observable<any> {
  //   return this.network.getData(this._projectListForManager, "");
  // }
  public getAuditListForManager(data): Observable<any> {
    return this.network.getAuditDataData(this._auditListForManager, data);
  }
  // public getAuditListForPilot(data): Observable<any> {
  //   return this.network.getAuditDataData(this._auditListForPilot, data);
  // }
  public getMMAListForPilot(data): Observable<any> {
    return this.network.getAuditDataData(this._projectSpecificAuditListForPilot, data);
  } 
  public updateMSESRating(data): Observable<any> {
    return this.network.postData(this._updateMSESRating, data);
  }
  public updateRating(data): Observable<any> {
    return this.network.postData(this._updateRating, data);
  }
  public updateActionPlan(data): Observable<any> {
    return this.network.postData(this._updateActionPlan, data);
  }
  public getTaskList(): Observable<any> {
    return this.network.getAuditDataData(this._getTaskListForPilot, null);
  }
  public updateTaskList(data): Observable<any> {
    return this.network.postData(this._updateTaskListForPilot, data);
  }
  public getPolicySheet(data): Observable<any> {
    return this.network.getData(this._getPolicySheet, data);
  }
  // public updatePolicySheet(data): Observable<any> {
  //   return this.network.postData(this._updatePolicySheet, data);
  // }
  public getSustenanceListForPilot(data): Observable<any> {
    return this.network.getAuditDataData(this._getSustenanceListForPilot, data);
  }
  public updateSustenanceAudit(data): Observable<any> {
    return this.network.postData(this._updateSustenanceAuditForPilot, data);
  }
  public getTraningCalendarList(data): Observable<any> {
    return this.network.getData(this._getTraningCalendarList, data);
  }
  public updateTrainingCalendar(data): Observable<any> {
    return this.network.postData(this._updateTrainingCalendar, data);
  }
  public updateAppVersion(data): Observable<any> {
    return this.network.checkAppUpdate(this._updateAppVersion, data);
  }
  public getPilotListNew(): Observable<any> {
    return this.network.getAuditDataData(this._pilotListUrl, null);
  }
  public getSubActivities(data): Observable<any> {
    return this.network.getAuditDataData(this._subActivitiesUrl, data);
  }
  public getSupplierListNew(data): Observable<any> {
    return this.network.getAuditDataData(this._supplierListUrl, data);
  }
  public getAuditList(auditId): Observable<any> {
    return this.network.getAuditDataData(this._auditListUrl, { "AuditId" : auditId});
  }
  public getGetMSESAuditsList(auditId): Observable<any> {
    return this.network.getAuditDataData(this._auditMSESListUrl, { "AuditId" : auditId});
  }
  public getSustenanceAuditsList(auditId): Observable<any> {
    return this.network.getAuditDataData(this._SustenanceAuditsListUrl, { "AuditId" : auditId});
  }
  public getEscalationHistory(PolicySheetId): Observable<any> {
    return this.network.getAuditDataData(this._getEscalationHistoryUrl, {"PolicySheetId": PolicySheetId});
  }
  public getParentUsers(): Observable<any> {
    return this.network.getAuditDataData(this._getParentUsersUrl, null);
  }
  public escalateRecord(data): Observable<any> {
    return this.network.postData(this._escalateRecordUrl, data);
  }
  public addRemarks(data): Observable<any> {
    return this.network.postData(this._addRemarksUrl, data);
  }
  public getActionPlanTrackers(): Observable<any> {
    return this.network.getAuditDataData(this._getActionPlanTrackersUrl, null);
  }
  public getActionPlanHistory(data): Observable<any> {
    return this.network.getAuditDataData(this._getActionPlanHistoryUrl, data);
  }
  public getRatingRequests(): Observable<any> {
    return this.network.getAuditDataData(this._getRatingRequestsUrl, null);
  }
  public updateRatingRequestHOD(data):Observable<any>{
    return this.network.postData(this._updateRatingRequestUrl, data);
  }
  public getPDSheetActionPlanHistory(PolicySheetId): Observable<any> {
    return this.network.getAuditDataData(this._getPDSheetActionPlanHistoryUrl, {"PolicySheetId": PolicySheetId});
  }
  public requestActionPlan(data): Observable<any> {    
    return this.network.postData(this._requestActionPlanUrl, data);
  }
  public approveActionPlan(data): Observable<any> {
    return this.network.postData(this._approveActionPlanUrl, data);
  }
}

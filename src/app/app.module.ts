import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { MyApp } from "./app.component";
import { MsesbCPage } from "../pages/pilot/msesb-c/msesb-c";
import { DataProvider } from "../providers/data/data";
import { NetworkProvider } from "../providers/network/network";
import { UtilityProvider } from "../providers/utility/utility";
import { CommonServiceProvider } from "../providers/common-service/common-service";
import { LoginPage } from "../pages/login/login";
import { DashboardPage } from "../pages/dashboard/dashboard";
import { AuditsPage } from "../pages/manager/audits/audits";
import { SustenancePage } from "../pages/pilot/sustenance/sustenance";
import { MonthlyVisitPlanPage } from "../pages/pilot/monthly-visit-plan/monthly-visit-plan";
import { PolicySheetPage } from "../pages/pilot/policy-sheet/policy-sheet";
import { MorningMeetingPage } from "../pages/pilot/morning-meeting/morning-meeting";
import { ActionPlanPage } from "../pages/pilot/action-plan/action-plan";
import { UpdateActionPlanPage } from "../pages/pilot/update-action-plan/update-action-plan";
import { MmaPage } from "../pages/pilot/mma/mma";
import { AuditmsesAPage } from "../pages/pilot/auditmses-a/auditmses-a";
import { MsesAPage } from "../pages/pilot/mses-a/mses-a";
import { ViewMonthlyVisitPlanPage } from "../pages/manager/view-monthly-visit-plan/view-monthly-visit-plan";
import { FirewallPage } from "../pages/pilot/firewall/firewall";
import { IonicStorageModule } from "@ionic/storage";
import { PolicySheetManagerPage } from "../pages/manager/policy-sheet-manager/policy-sheet-manager";
import { MorningMeetingManagerPage } from "../pages/manager/morning-meeting-manager/morning-meeting-manager";
import { TrainingCalendarPage } from "../pages/pilot/training-calendar/training-calendar";
import { AuditSustenancePage } from "../pages/pilot/audit-sustenance/audit-sustenance";
import { AuditfirewallPage } from "../pages/pilot/auditfirewall/auditfirewall";
import { AuditmmaPage } from "../pages/pilot/auditmma/auditmma";
import { AuditmsesBcPage } from "../pages/pilot/auditmses-bc/auditmses-bc";
import { UpdateMonthlyPlanPage } from "../pages/pilot/update-monthly-plan/update-monthly-plan";
import { ViewMonthlyPlanManagerPage } from "../pages/manager/view-monthly-plan-manager/view-monthly-plan-manager";
import { ConsolidatedPage } from "../pages/pilot/consolidated/consolidated";
import { SustenanceManagerPage } from "../pages/manager/sustenance-manager/sustenance-manager";
import { MsesAManagerPage } from "../pages/manager/mses-a-manager/mses-a-manager";
import { MsesBcManagerPage } from "../pages/manager/mses-bc-manager/mses-bc-manager";
import { FirewallManagerPage } from "../pages/manager/firewall-manager/firewall-manager";
import { MmaManagerPage } from "../pages/manager/mma-manager/mma-manager";
import { Toast } from "@ionic-native/toast";

import { Network } from "@ionic-native/network";
import { AppVersion } from "@ionic-native/app-version";
import { Diagnostic } from "@ionic-native/diagnostic";

import { TraningReportPage } from "../pages/manager/traning-report/traning-report";
import { HttpClientModule } from "@angular/common/http";
import { CalendarPage } from "../pages/manager/calendar/calendar";
import { ComponentsModule } from "../components/components.module";
import { ManagerEscalatePage } from "../pages/manager/manager-escalate/manager-escalate";
import { EscalationHistoryPage } from "../pages/manager/escalation-history/escalation-history";
import { ActionPlanHistoryPage } from "../pages/manager/action-plan-history/action-plan-history";
import { RatingRequestsPage } from "../pages/manager/rating-requests/rating-requests";
import { PdsheetActionplanHistoryPage } from "../pages/manager/pdsheet-actionplan-history/pdsheet-actionplan-history";
import { RequestActionPlanPage } from "../pages/manager/request-action-plan/request-action-plan";

@NgModule({
  declarations: [
    MyApp,
    MsesbCPage,
    LoginPage,
    DashboardPage,
    PolicySheetPage,
    MorningMeetingPage,
    PolicySheetManagerPage,
    AuditsPage,
    TraningReportPage,
    AuditmsesAPage,
    SustenancePage,
    MmaPage,
    MsesAPage,
    FirewallPage,
    AuditmmaPage,
    ViewMonthlyPlanManagerPage,
    MonthlyVisitPlanPage,
    ActionPlanPage,
    UpdateActionPlanPage,
    ViewMonthlyVisitPlanPage,
    AuditmsesBcPage,
    ConsolidatedPage,
    MorningMeetingManagerPage,
    AuditSustenancePage,
    AuditfirewallPage,
    UpdateMonthlyPlanPage,
    CalendarPage,
    RequestActionPlanPage,
    SustenanceManagerPage,
    MsesAManagerPage,
    MsesBcManagerPage,
    FirewallManagerPage,
    MmaManagerPage,
    ManagerEscalatePage,
    EscalationHistoryPage,
    ActionPlanHistoryPage,
    PdsheetActionplanHistoryPage,
    RequestActionPlanPage,
    RatingRequestsPage,
    TrainingCalendarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalendarPage,
    MsesbCPage,
    LoginPage,
    DashboardPage,
    AuditsPage,
    MonthlyVisitPlanPage,
    PolicySheetManagerPage,
    ViewMonthlyPlanManagerPage,
    TraningReportPage,
    AuditmsesAPage,
    SustenancePage,
    PolicySheetPage,
    MmaPage,
    FirewallPage,
    MorningMeetingManagerPage,
    ConsolidatedPage,
    MorningMeetingPage,
    ActionPlanPage,
    UpdateActionPlanPage,
    MsesAPage,
    AuditfirewallPage,
    AuditmmaPage,
    AuditmsesBcPage,
    ViewMonthlyVisitPlanPage,
    AuditSustenancePage,
    UpdateMonthlyPlanPage,
    RequestActionPlanPage,
    SustenanceManagerPage,
    MsesAManagerPage,
    MsesBcManagerPage,
    FirewallManagerPage,
    MmaManagerPage,
    ManagerEscalatePage,
    EscalationHistoryPage,
    ActionPlanHistoryPage,
    PdsheetActionplanHistoryPage,
    RequestActionPlanPage,
    RatingRequestsPage,
    TrainingCalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    NetworkProvider,
    Network,
    AppVersion,
    Diagnostic,
    UtilityProvider,
    CommonServiceProvider
  ]
})
export class AppModule {}

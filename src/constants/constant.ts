
export class Constant {
    storage: any;
    static BASE_URL = "/ProxyBase/";
    // static AppVersion="/AppVersion/"
   
   static AppVersion="https://forceupdate.azurewebsites.net/api/ForceUpdate/GetAppDetails"
    // static BASE_URL="https://dwm-website.azurewebsites.net/"

    // PROD static BASE_URL="https://dwm-website.azurewebsites.net"
    // static BASE_URL="https://rgmobility-epdi-uat.azurewebsites.net/"
    // static BASE_URL="https://dwm-website-uat.azurewebsites.net/"
    static MSGS = {
        ERROR_NETWORK_UNAVAILABLE: 'Unable to connect the server. Please check your network connection.'
    }

    public say() {
        return "hi"
    }
}
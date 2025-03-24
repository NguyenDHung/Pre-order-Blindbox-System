import SignalRService from "./SignalRService";

class PreorderCampaignDetailService extends SignalRService {
    constructor() {
        super(`${import.meta.env.VITE_PREORDERBLINDBOX_API_Hub_URL}/OrderInCampaign`);
    }

    addOrderUpdateListener(callback) {
        this.hubConnection.on("ReceiveOrderUpdate", (orderInfo) => {
            callback(orderInfo); 
        });
    }
    addOrderCartPageListener(callback) {
        this.hubConnection.on("CampaignUpdated", (preorderCampaginUpdate) => {
            callback(preorderCampaginUpdate); 
        });
    }
}

export default new PreorderCampaignDetailService();

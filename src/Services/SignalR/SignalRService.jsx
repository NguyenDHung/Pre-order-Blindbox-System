import * as signalR from "@microsoft/signalr";

class SignalRService {
    constructor(hubUrl) {
        this.hubUrl = hubUrl;
        this.hubConnection = null;
        this.isConnected = false;
    }

    // Khởi động kết nối
    async startConnection() {
        if (this.isConnected) return;

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl)
            .withAutomaticReconnect() // Tự động thử kết nối lại
            .configureLogging(signalR.LogLevel.Information)
            .build();

        try {
            await this.hubConnection.start();
            console.log(`SignalR Connected to Hub: ${this.hubUrl}`);
            this.isConnected = true;
        } catch (err) {
            console.error(`SignalR Connection Error (${this.hubUrl}):`, err);
            setTimeout(() => this.startConnection(), 5000); // Tự động thử lại nếu lỗi
        }
    }

    // Tham gia Group
    async joinGroup(groupName) {
        try {
            if (!this.hubConnection?.connectionId) await this.startConnection();
            await this.hubConnection.invoke("AddToGroup", groupName);
            console.log(`Đã tham gia nhóm: ${groupName}`);
        } catch (err) {
            console.error("Lỗi khi tham gia nhóm:", err);
        }
    }

    // Rời khỏi Group
    async leaveGroup(groupName) {
        try {
            if (!this.hubConnection?.connectionId) return;
            await this.hubConnection.invoke("RemoveFromGroup", groupName);
            console.log(`Đã rời khỏi nhóm: ${groupName}`);
        } catch (err) {
            console.error("Lỗi khi rời khỏi nhóm:", err);
        }
    }

    // Thêm Listener để nhận dữ liệu từ server
    addMessageListener(callback) {
        if (!this.hubConnection) return;
        this.hubConnection.on("ReceiveMessage", (message) => {
            callback(message);
        });
    }

    // Dừng kết nối
    async stopConnection() {
        try {
            if (this.hubConnection) {
                await this.hubConnection.stop();
                console.log(`Ngắt kết nối khỏi Hub: ${this.hubUrl}`);
                this.isConnected = false;
            }
        } catch (err) {
            console.error("Lỗi khi ngắt kết nối:", err);
        }
    }
}

export default SignalRService;

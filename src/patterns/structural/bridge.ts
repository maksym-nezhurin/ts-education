interface IProvider {
    sendMessage(message: string): void;
    connect(config: unknown): void;
    disconnect(): void;
}

class TelegramProvider implements IProvider {
    sendMessage(message: string) {
        console.log(message)
    }
    connect(config: string) {
        console.log(config)
    }
    disconnect() {
        console.log('disconnected TG')
    }
}

class WhatsUpProvider implements IProvider {
    sendMessage(message: string) {
        console.log(message)
    }
    connect(config: string) {
        console.log(config)
    }
    disconnect() {
        console.log('disconnected WU')
    }
}

class NotificationSender {
    constructor(private provider: IProvider) {}

    send() {
        this.provider.connect('connect');
        this.provider.sendMessage('message');
        this.provider.disconnect();
    }
}

class DelayNotificationSender extends NotificationSender {
    constructor(provider: IProvider) {
        super(provider);
    }
    sendDelayed() {
        setTimeout(() => {
            console.log('sent after 500 ms');
            this.send();
        }, 500)

    }
}

const sender = new NotificationSender(new TelegramProvider() as IProvider);
sender.send();

const sender2 = new DelayNotificationSender(new WhatsUpProvider() as IProvider);
sender2.sendDelayed();
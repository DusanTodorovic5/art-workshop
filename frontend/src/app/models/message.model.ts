export class Chat {
    users: Array<string>;
    messages: Array<Message>;
    opened: boolean = false;
    image: string;
    current_message = "";
}

export class Message {
    from: string;
    text: string;
    timestamp: number;
}

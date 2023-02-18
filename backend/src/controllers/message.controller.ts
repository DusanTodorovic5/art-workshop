import * as express from 'express';
import Message from '../models/message'

export class MessageController {

    isJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    send = (from, to, text) => {
        Message.findOne({ "$and": [{ "users": from }, { "users": to }] }, (err, user) => {
            if (err) {
                const new_messages = new Message({
                    "users": [from, to],
                    "messages": [{
                        "from": from,
                        "text": text,
                        "timestamp": Math.floor(Date.now() / 1000)
                    }]
                });

                new_messages.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            else {
                Message.updateOne(
                    { "$and": [{ "users": from }, { "users": to }] },
                    {
                        "$push": {
                            "messages": {
                                "from": from,
                                "text": text,
                                "timestamp": Math.floor(Date.now() / 1000)
                            }
                        }
                    }, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
            }
        });
    }

    get = (username, ws) => {
        Message.find({ "users": username }, (err, messages) => {
            if (err) {
                ws.send(JSON.stringify([]));
            }
            else {
                ws.send(JSON.stringify(messages));
            }
        });
    }

    handle = (data, ws, clients) => {
        if (this.isJsonString(data)) {
            let parsed_data = JSON.parse(data);
            let from = parsed_data.from;

            if (from != null && clients.get(from) != null) {
                let to = parsed_data.to;
                let from = parsed_data.from;
                let text = parsed_data.text;
                if (to != null && from != null && text != null) {
                    if (clients.get(to) != null) {
                        clients.get(to).send(JSON.stringify(parsed_data));
                    }
                    this.send(from, to, text);
                    ws.send(JSON.stringify(parsed_data));
                }
            } else if (parsed_data.username != null) {
                let username = parsed_data.username;
                clients.set(username, ws);
                this.get(username, ws);
            }
        }
    }
}
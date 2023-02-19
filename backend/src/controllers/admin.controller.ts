import * as express from 'express';
import User from '../models/user'

export class AdminController { 
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ 'username': username, 'password': password, 'type':"admin"}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        });
    }

    get_users = (req: express.Request, res: express.Response) => {
        User.find({'type' : { $ne: "admin" }}, (err, users) => {
            if (err) console.log(err);
            else res.json(users)
        });
    }

    accept_user = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.updateOne({ 'username': username },
            { "status": "active" },
            (err, user) => {
                if (err) { console.log(err); res.json({ "message": "fail" }); }
                else {
                    res.json({ "message": "success" });
                }
            });
    }

    reject_user = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.updateOne({ 'username': username },
            { "status": "rejected" },
            (err, user) => {
                if (err) { console.log(err); res.json({ "message": "fail" }); }
                else {
                    res.json({ "message": "success" });
                }
            });
    }

    delete_user = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.updateOne({ 'username': username },
            { "status": "deleted" },
            (err, user) => {
                if (err) { console.log(err); res.json({ "message": "fail" }); }
                else {
                    res.json({ "message": "success" });
                }
            });
    }
}
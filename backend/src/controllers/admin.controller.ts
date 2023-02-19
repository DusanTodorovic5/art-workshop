import * as express from 'express';
import { get_workshop_icons, main_image_to_base64 } from '../imager';
import User from '../models/user'
import Workshop from '../models/workshop'

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

    get_all_workshops = (req: express.Request, res: express.Response) => {
        Workshop.find({ }, (err, workshops) => {
            if (err) console.log(err);
            else {
                for (let workshop of workshops) {
                    workshop.main_icon = main_image_to_base64(workshop.name)
                    workshop.icons = get_workshop_icons(workshop.name);
                }
                res.json(workshops);
            }
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

        User.deleteOne({ 'username': username },
            (err, user) => {
                if (err) { console.log(err); res.json({ "message": "fail" }); }
                else {
                    res.json({ "message": "success" });
                }
            });
    }

    accept_workshop = (req: express.Request, res: express.Response) => {
        let workshop = req.body.workshop;

        Workshop.updateOne({ 'name': workshop },
            { "status": "active" },
            (err, user) => {
                if (err) { console.log(err); res.json({ "message": "fail" }); }
                else {
                    res.json({ "message": "success" });
                }
            });
    }

    reject_workshop = (req: express.Request, res: express.Response) => {
        let workshop = req.body.workshop;

        Workshop.updateOne({ 'name': workshop },
            { "status": "rejected" },
            (err, user) => {
                if (err) { console.log(err); res.json({ "message": "fail" }); }
                else {
                    res.json({ "message": "success" });
                }
            });
    }

    delete_workshop = (req: express.Request, res: express.Response) => {
        let workshop = req.body.workshop;

        Workshop.deleteOne({ 'workshop': workshop },
            (err, user) => {
                if (err) { console.log(err); res.json({ "message": "fail" }); }
                else {
                    res.json({ "message": "success" });
                }
            });
    }
}
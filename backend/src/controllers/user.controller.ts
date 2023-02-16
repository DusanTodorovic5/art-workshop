import * as express from 'express';
import { base64_to_image, check_size, image_to_base64 } from '../imager';
import { send_password } from '../mailer';
import User from '../models/user';
import Workshop from '../models/workshop';
import Comment from '../models/comment';
export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let type = req.body.type;

        User.findOne({ 'username': username, 'password': password, 'type': type, $or: [{ 'password_valid': 0 }, { 'password_valid': { $gt: (Math.floor(Date.now() / 1000) - 1800) } }] }, (err, user) => {
            if (err) { console.log(err); res.json({ "message": "error" }); }
            else res.json(user)
        })
    }

    password_change = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let new_password = req.body.new_password;


        User.updateOne({ 'username': username, 'password': password }, {
            'password': new_password,
            'password_valid': 0
        }, (err) => {
            if (err) { console.log(err); res.json({ "message": "error" }); }
            else {
                res.json({ "message": "success" });
            }
        });
    }

    forgot_password = (req: express.Request, res: express.Response) => {
        let email = req.body.email;

        const password = (Math.random() + 1).toString(36).substring(32);
        User.updateOne({
            'email': email
        },
            {
                'password': password,
                'password_valid': Math.floor(Date.now() / 1000) + 1800
            }, (err) => {
                if (err) { console.log(err); res.json({ "message": "error" }); }
                else {
                    send_password(email, password)
                    res.json({ "message": "success" });
                }
            });
    }

    register = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let surname = req.body.surname;
        let username = req.body.username;
        let password = req.body.password;
        let number = req.body.number;
        let email = req.body.email;
        let type = req.body.type;
        let image = req.body.image;

        if (!name || !surname || !password || !username || !number || !email || !type) {
            res.json({ "message": "fields missing." });
            return;
        }

        let org = req.body.org;
        if (type == "org" && (!org.name || !org.address || !org.number)) {
            res.json({ "message": "fields missing." });
            return;
        }

        check_size(image).then((val) => {
            if (!val) {
                res.json({ "message": "bad image format." });
                return;
            }

            User.findOne({ 'username': username }, (err, username_user) => {
                if (err) { console.log(err); }
                else {
                    if (username_user) {
                        res.json({ "message": "username taken!" });
                        return;
                    }

                    User.findOne({ 'email': email }, (err, email_user) => {
                        if (err) { console.log(err); }
                        else {
                            if (email_user) {
                                res.json({ "message": "email taken!" });
                                return;
                            }

                            const new_user = new User({
                                "username": username,
                                "password": password,
                                "name": name,
                                "surname": surname,
                                "number": number,
                                "email": email,
                                "type": type,
                                "organization": org ? null : {
                                    "name": org.name,
                                    "address": org.address,
                                    "number": org.number
                                },
                                "password_valid": 0,
                                "status": "pending"
                            });

                            new_user.save(function (err) {
                                if (err) {
                                    res.json({ "message": "error while inserting!" });
                                } else {
                                    if (image) base64_to_image(image, username);
                                    res.json({ "message": "success" });
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    get_image_for_user = (req: express.Request, res: express.Response) => {
        if (req.body.username == null) {
            res.json({"message": "no username given"});
        }
        res.json({ "image": image_to_base64(req.body.username) });
    }

    update = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        if (!username) {
            res.json({ "message": "username missing." });
            return;
        }

        let name = req.body.name;
        let surname = req.body.surname;
        let number = req.body.number;
        let email = req.body.email;
        let image = req.body.image;

        if (!name && !surname && !number && !email && !image) {
            res.json({ "message": "fields missing." });
            return;
        }

        User.findOne({ 'username': username }, (err, user) => {
            if (err) { console.log(err); }
            else {
                if (name) user.name = name;
                if (surname) user.surname = surname;
                if (number) user.number = number;
                if (email) user.email = email;
                if (image) base64_to_image(username, image);
                
                user.save();
                res.json({ "message": "success" });
            }
        });
    }

    actions = (req: express.Request, res: express.Response) => {
        let username  = req.body.username;

        User.findOne({ 'username': username }, (err, username_user) => {
            if (err) { console.log(err); }
            else {
                Comment.find({'username': username}, (err, comments) => {
                    if (err) { res.json({"likes": username_user.likes, "comments": []}); }
                    else {
                        res.json({"likes": username_user.likes, "comments": comments});
                    }
                });
            }
        });
    }
}
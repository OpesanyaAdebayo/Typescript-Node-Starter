import {
    Request,
    Response
} from "express";
import { NextFunction } from 'connect';
import { validationResult } from 'express-validator/check';
import mongoose from 'mongoose';
import {default as User, userModel,} from '../models/User';

export let getLogin = (req: Request, res: Response) => {
    let { userID } = req.session!;
    if (userID) {
        return res.redirect("/");
    }
    res.render("login", {
        title: "Login"
    });
}

export let postLogin = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            error: errors.array()
        });
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });


    User.findOne({ email: req.body.email }, (err, existingUser:any) => {
        if (err) { return next(err) };
        if (existingUser) {
            existingUser.comparePassword(req.body.password, (err: Error, isMatch: boolean) => {
                if (err) { return next(err) };
                if (isMatch) {
                    req.session!.userID = existingUser._id.toString();
                    return res.redirect('/');
                }
                else {
                    return res.status(401).json({ error: "Incorrect username and/or password." });
                }
            })
        }
        else {
            return res
                .status(401)
                .json({ error: "Incorrect username and/or password." });
        }
    })

}
export let getSignup = (req: Request, res: Response) => {
    let { userID } = req.session!;
    if (userID) {
        res.redirect("/");
    }
    res.render("signup", {
        title: "Signup"
    });
}

export let postSignup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({
      error: errors.array()
    });
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) {
      res
        .status(401)
        .json({ error: "account with that email already exists." });
    }
    user
      .save()
        .then(savedUser => {
            req.session!.userID = savedUser._id.toString();
        return res.redirect("/");
      })
      .catch(err => {
        if (err) return next(err);
      });
  });
};

export let getChangePassword = (req: Request, res: Response, next: NextFunction) => {
    let { userID } = req.session!;
    if (!userID) {
        res
          .status(401)
          .json({ error: "You must be logged in to view this page" });
    }
    res.redirect('/');
}

export let postChangePassword = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json({
            error: errors.array()
        });
    }
    let { userID } = req.session!;
    if (!userID) {
        res
            .status(403)
            .json({ error: "You must be logged in to view this page" });
    }
    else {
        User.findById(req.session!.userID, (err, user: userModel) => {
            if (err) {
                return next(err)
            }
            user.password = req.body.password;
            user.save(err => {
                if (err) { return next(err) }
                else {
                    res.redirect("/");
                }
            })
        });
    }
}
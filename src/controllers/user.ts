import { Request, Response, NextFunction } from "express";
import validator from 'express-validator';

let userID: string;

export let getLogin = (req: Request, res: Response) => {
    let { userID } = req.session!;
    if(userID) {
        res.redirect("/");
    }
    res.render("login", {
        title: "Login"
    });
}
// export let postLogin = (req: Request, res: Response, next: NextFunction) => {

// }
export let getSignup = (req: Request, res: Response) => {
    let { userID } = req.session!;
    if(userID) {
        res.redirect("/");
    }
    res.render("signup", {
        title: "Signup"
    });
}


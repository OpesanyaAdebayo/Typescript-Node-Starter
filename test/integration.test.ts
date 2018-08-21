import request from 'supertest';
import app from "../src/app";
import mongoose from "mongoose";
import MongoDBMemoryServer from "mongodb-memory-server";
import User from '../src/models/User';

// May require additional time for downloading MongoDB binaries.
// Visit https://github.com/nodkz/mongodb-memory-server tof details
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;


let con;
let db;
let mongoServer;
beforeAll(async () => {
    mongoServer = new MongoDBMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(mongoUri, (err) => {
        if (err) console.error(err);
    });
});

afterAll(() => {
    mongoose.disconnect();
    mongoServer.stop();
});

describe("Single mongoServer", () => {
    it("should start mongo server", async () => {
        const cnt = await User.estimatedDocumentCount();
        expect(cnt).toEqual(0);
    });
});

describe("Signup", () => {
    it("should create a user", async () => {
        let res = await request(app)
            .post("/signup")
            .send({ email: "meetus@gmail.com" })
            .send({ password: "zbgccdd" });
        expect(res.body.error).toBe(undefined);
        await User.findOne({ email: "meetus@gmail.com" }, (err, doc) => {
            expect(doc._id).not.toBe(undefined);
        })
    });
    it("should return error if user tries to sign up with same email", async () => {
        let res = await request(app)
            .post("/signup")
            .send({ email: "meetus@gmail.com" })
            .send({ password: "zbgccdd" });
        expect(res.body.error).toBe("account with that email already exists.");

    });
});
describe("Login", () => {
    it("should redirect a user to dashboard when logged in", async () => {
        let res = await request(app)
            .post("/login")
            .send({ email: "meetus@gmail.com" })
            .send({ password: "zbgccdd" });
        expect(res.status).toBe(302);
    });

    it("should return error if user tries to login with incorrect password", async () => {
        let res = await request(app)
            .post("/login")
            .send({ email: "meetus@gmail.com" })
            .send({ password: "zbgccde" });
        expect(res.body.error).toBe("Incorrect username and/or password.");

    });

    it("should return error if user tries to login with unregistered email", async () => {
        let res = await request(app)
            .post("/login")
            .send({ email: "appcation@gmail.com" })
            .send({ password: "zbgccdd" });
        expect(res.body.error).toBe("Incorrect username and/or password.");

    });
});

describe("Change Password", () => {
    it("should return error when user isn't logged in.", async () => {
        let res = await request(app)
            .post("/changePassword")
            .send({ password: "zbgccdd" })
            .send({ confirmPassword: "zbgccdd" });
        expect(res.status).toBe(403);
        expect(res.body.error).toBe("You must be logged in to view this page");
    });

});
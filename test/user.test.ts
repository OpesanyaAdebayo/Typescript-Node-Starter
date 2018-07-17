import request from 'supertest';
import app from "../src/app";

describe("GET /login", () => {
  it("should return 200 OK", (done) => {
    return request(app).get("/login")
      .expect(200, done);
  });
});

describe("POST /login", () => {
  it("should return error when password is less than 7 characters.", (done) => {
    return request(app)
      .post("/login")
      .send("email=meet@me.com")
      .send("password=zcqwpo")
      .expect(401)
      .end(function(err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      });
  });
  it("should return error when email is invalid.", (done) => {
    return request(app)
      .post("/login")
      .send("email=meetme.com")
      .send("password=vbrmtws")
      .expect(401)
      .end(function(err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      })
  });
  it("should return some defined error message with valid parameters", (done) => {
    return request(app).post("/login")
      .send("email=john@me.com")
      .send("password=qwerty3")
      .expect(401)
      .end(function (err, res) {
        expect(res.body.error).not.toBe(undefined)
        done();
      });

  });
});


describe("GET /signup", () => {
  it("should return 200 OK", (done) => {
    return request(app).get("/signup")
      .expect(200, done);
  });
});


describe("POST /signup", () => {
  it("should return error when password is less than 7 characters.", (done) => {
    return request(app)
      .post("/signup")
      .send("email=fre")
      .send("password=vbrmts")
      .expect(302)
      .end(function(err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      });
  });

  it("should return error when email is invalid.", (done) => {
    return request(app)
      .post("/signup")
      .send("email=bayytfg")
      .send("password=vbrijims")
      .expect(302)
      .end(function(err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      });
  });
})


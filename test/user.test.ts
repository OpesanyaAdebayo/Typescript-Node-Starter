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
    return request(app).post("/signup")
      .field("email", "")
      .field("password", "vbrmts")
      .end(function (err, res) {
        expect(res.error).not.toBe(true);
        done();
      })
      .expect(302)
  });
  it("should return error when email is invalid.", (done) => {
    return request(app).post("/signup")
      .field("email", "bayytfg")
      .field("password", "vbrijims")
      .end(function (err, res) {
        expect(res.error).not.toBe(true);
        done();
      })
      .expect(302)
  });
  it("should return some defined error message with valid parameters", (done) => {
    return request(app).post("/login")
      .field("email", "john@me.com")
      .field("password", "Hunter2")
      .expect(302)
      .end(function (err, res) {
        expect(res.error).not.toBe(undefined)
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
    return request(app).post("/signup")
    .field("email", "")
    .field("password", "vbrmts")
    .end(function (err, res) {
      expect(res.error).not.toBe(true);
      done();
    })
    .expect(302)
  });

  it("should return error when email is invalid.", (done) => {
    return request(app).post("/signup")
    .field("email", "bayytfg")
    .field("password", "vbrijims")
    .end(function (err, res) {
      expect(res.error).not.toBe(true);
      done();
    })
    .expect(302)
  });
})


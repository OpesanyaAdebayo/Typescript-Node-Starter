import request from 'supertest';
import app from "../src/app";

describe("GET /login", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/login")
      .expect(200, done);
  });
});

describe("GET /signup", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/signup")
      .expect(200, done);
  });
});


describe("POST /signup", () => {
  it("should return error when passowrd is less than 7 characters.", (done) => {
    request(app).post("/signup")
    .field("email", "")
    .field("password", "vbrmts")
    .end(function (err, res) {
      expect(res.error).not.toBe(undefined);
      done();
    })
    .expect(302)
  });

  it("should return error when email is invalid.", (done) => {
    request(app).post("/signup")
    .field("email", "kjfnfksg")
    .field("password", "vbrijims")
    .end(function (err, res) {
      expect(res.error).not.toBe(undefined);
      done();
    })
    .expect(302)
  });
})

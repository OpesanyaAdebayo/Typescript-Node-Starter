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
      .send({email: "meet@me.com"})
      .send({password: "zcqwpo"})
      .expect(401)
      .end(function(err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      });
  });
  it("should return error when email is invalid.", (done) => {
    return request(app)
      .post("/login")
      .send({ email: "meetme.com" })
      .send({ password: "zcqwpfo" })
      .expect(401)
      .end(function(err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      })
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
      .send({ email: "meet@me.com" })
      .send({ password: "zcqwpo" })
      .expect(302)
      .end(function(err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      });
  });

  it("should return error when email is invalid.", (done) => {
    return request(app)
      .post("/signup")
      .send({ email: "meetme.com" })
      .send({ password: "zcqwpo4" })
      .expect(302)
      .end(function(err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      });
  });
})

describe("POST /changePassword", () => {
  it("should return error when password is less than 7 characters.", done => {
    return request(app)
      .post("/changePassword")
      .send({ password: "zcqwpo" })
      .send({ confirmPassword: "zcqwpo" })
      .expect(401)
      .end(function(err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      });
  });
  it("should return error when passwords do not match.", done => {
    return request(app)
      .post("/changePassword")
      .send({ password: "zcqwpo7" })
      .send({ confirmPassword: "zcqwp7o" })
      .expect(401)
      .end(function(err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      });
  });

});
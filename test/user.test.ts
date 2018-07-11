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

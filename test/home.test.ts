import request from 'supertest';
import app from "../src/app";

describe("GET /", () => {
  it("should return 200 OK", (done) => {
    return request(app).get("/")
      .expect(200, done);
  });
});

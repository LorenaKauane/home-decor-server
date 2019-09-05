const request = require("supertest");
const app = require("../../app");
const dropDataBase = require("../dropDataBase");
const UserRepository = require("../../src/repository/UserRepository");

describe("Routes User", () => {
  const UserFake = {
    name: "User 1",
    file: "image123.jpg",
    about: "This is a true about"
  };

  const URL = "/home-decor/user";

  beforeEach(async done => {
    jest.setTimeout(10000);
    await dropDataBase();
    done();
  });

  describe("POST /user", () => {
    it("should not create an user when missing some required fields", async done => {
      request(app)
        .post(URL)
        .field("name", UserFake.name)
        .attach("file", `${__dirname}/image/12.jpg`)
        .end((err, res) => {
          expect(res.statusCode).toBe(500);
          expect(res.body).toHaveProperty("message");
          expect(typeof res.body.message).toBe("string");
          expect(res.body.message).toBe(
            "User validation failed: about: Path `about` is required."
          );
          done(err);
        });
    });

    it("should create an user", async done => {
      request(app)
        .post(URL)
        .field("name", UserFake.name)
        .field("about", UserFake.about)
        .attach("file", `${__dirname}/image/12.jpg`)
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("user");
          expect(res.body.user).toHaveProperty("_id");
          done(err);
        });
    });
  });

  describe("GET /user", () => {
    it("should return empty array", done => {
      request(app)
        .get(URL)
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(Array.isArray(res.body.users)).toBe(true);
          expect(res.body.users).toHaveLength(0);
          done(err);
        });
    });

    it("should not return a user because the id is not valid", done => {
      request(app)
        .get(URL.concat("/123abc456123abc456123abc"))
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty("message");
          expect(typeof res.body.message).toBe("string");
          done(err);
        });
    });

    it("should return a valid user", async done => {
      const user = await UserRepository.create(UserFake);
      request(app)
        .get(URL.concat("/", user._id))
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.user).toHaveProperty("_id");
          expect(res.body.user).toHaveProperty("name");
          done(err);
        });
    });
  });

  describe("PUT /user", () => {
    it("should return 404 HTTP status code if the user doesn't exists", done => {
      request(app)
        .put(URL.concat("/123abc456123abc456123abc"))
        .send(UserFake)
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty("message", "User not found");
          expect(res.body.users).toBeUndefined();
          done(err);
        });
    });

    it("should update an user", async done => {
      const user = await UserRepository.create(UserFake);
      UserFake.about = "This is about Update";
      request(app)
        .put(URL.concat("/", user._id))
        .send(UserFake)
        .end((err, res) => {
          expect(res.res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("user");
          expect(res.body.user).toHaveProperty("_id");
          expect(res.body.user).toHaveProperty("about");
          expect(res.body.user.about).toBe("This is about Update");
          done();
        });
    });
  });

  describe("DELETE /user", () => {
    it("should remove when exists valid Id", async done => {
      const user = await UserRepository.create(UserFake);
      request(app)
        .delete(URL.concat("/", user._id))
        .end(async (err, res) => {
          expect(res.statusCode).toBe(200);
          const userDeleted = await UserRepository.readById(user._id);
          expect(userDeleted).toBeNull();
          done(err);
        });
    });

    it("should return 404 HTTP status code if the user doesn't exists", done => {
      request(app)
        .delete(URL.concat("/123abc456123abc456123abc"))
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty("message", "User not found");
          expect(res.body.users).toBeUndefined();
          done(err);
        });
    });
  });
});

const request = require("supertest");
const app = require("../../app");
const dropDataBase = require("../dropDataBase");
const PostRepository = require("../../src/repository/PostRepository");
const UserRepository = require("../../src/repository/UserRepository");

describe("Routes Post", () => {
  let UserFake = {
    name: "User 1",
    file: "image123.jpg",
    about: "This is a true about"
  };

  const PostFake = {
    user: "",
    title: "Title Post 1",
    postImage: "image123.jpg",
    description: "This is my room",
    category: "Closet"
  };

  const URL = "/home-decor/post";

  beforeEach(async done => {
    jest.setTimeout(10000);
    await dropDataBase();
    let { _id } = await UserRepository.create(UserFake);
    UserFake._id = String(_id);
    PostFake.user = UserFake._id;
    done();
  });

  describe("POST /post", () => {
    it("should not create an post when missing some required fields", async done => {
      request(app)
        .post(URL)
        .field("description", PostFake.description)
        .field("category", PostFake.category)
        .field("user", UserFake._id)
        .attach("file", `${__dirname}/image/12.jpg`)
        .end((err, res) => {
          expect(res.statusCode).toBe(500);
          expect(res.body).toHaveProperty("message");
          expect(typeof res.body.message).toBe("string");
          expect(res.body.message).toBe(
            "Post validation failed: title: Path `title` is required."
          );
          done(err);
        });
    });

    it("should not create an post when missing image required fields", async done => {
      request(app)
        .post(URL)
        .field("description", PostFake.description)
        .field("category", PostFake.category)
        .field("user", UserFake._id)
        .field("title", PostFake.title)
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty("message");
          expect(typeof res.body.message).toBe("string");
          expect(res.body.message).toBe("Image is required");
          done(err);
        });
    });

    it("should create an post", async done => {
      request(app)
        .post(URL)
        .field("description", PostFake.description)
        .field("category", PostFake.category)
        .field("user", UserFake._id)
        .field("title", PostFake.title)
        .attach("file", `${__dirname}/image/12.jpg`)
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          done(err);
        });
    });
  });

  describe("GET /post", () => {
    it("should return empty array", done => {
      request(app)
        .get(URL)
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(Array.isArray(res.body.posts)).toBe(true);
          expect(res.body.posts).toHaveLength(0);
          done(err);
        });
    });

    it("should not return a post because the id is not valid", done => {
      request(app)
        .get(URL.concat("/123abc456123abc456123abc"))
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty("message");
          expect(typeof res.body.message).toBe("string");
          done(err);
        });
    });

    it("should return a valid post", async done => {
      const post = await PostRepository.create(PostFake);
      request(app)
        .get(URL.concat("/", post._id))
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.post).toHaveProperty("_id");
          expect(res.body.post).toHaveProperty("title");
          done(err);
        });
    });
  });

  describe("PUT /post", () => {
    it("should return 404 HTTP status code if the post doesn't exists", done => {
      request(app)
        .put(URL.concat("/123abc456123abc456123abc"))
        .send(PostFake)
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty("message", "Post not found");
          expect(res.body.users).toBeUndefined();
          done(err);
        });
    });

    it("should update an post", async done => {
      const post = await PostRepository.create(PostFake);
      PostFake.title = "This is title Update";
      request(app)
        .put(URL.concat("/", post._id))
        .send(PostFake)
        .end((err, res) => {
          expect(res.res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("post");
          expect(res.body.post).toHaveProperty("_id");
          expect(res.body.post).toHaveProperty("title");
          expect(res.body.post.title).toBe("This is title Update");
          done();
        });
    });
  });

  describe("DELETE /post", () => {
    it("should remove when exists valid Id", async done => {
      const post = await PostRepository.create(PostFake);
      request(app)
        .delete(URL.concat("/", post._id))
        .end(async (err, res) => {
          expect(res.statusCode).toBe(200);
          const postDeleted = await PostRepository.readById(post._id);
          expect(postDeleted).toBeNull();
          done(err);
        });
    });

    it("should return 404 HTTP status code if the post doesn't exists", done => {
      request(app)
        .delete(URL.concat("/123abc456123abc456123abc"))
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body).toHaveProperty("message", "Post not found");
          expect(res.body.users).toBeUndefined();
          done(err);
        });
    });
  });

  describe("GET /post/categories", () => {
    it("should not return a post using the categories is not valid", done => {
      request(app)
        .get(URL.concat("/categories?categories=teste"))
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("posts");
          expect(Array.isArray(res.body.posts)).toBe(true);
          expect(res.body.posts).toHaveLength(0);
          done(err);
        });
    });

    it("should return the posts that matches with the given categories", async done => {
      await PostRepository.create(PostFake);
      request(app)
        .get(URL.concat(`/categories?categories=${PostFake.category}`))
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(Array.isArray(res.body.posts)).toBe(true);
          expect(res.body.posts).toHaveLength(1);
          done(err);
        });
    });
  });
});

import Express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import session from "express-session";
import { sequelize } from "./database.js";
import { User, User_Post } from "../models/models.js";


import Post from "../entitles/Post.js";

export default (PORT) => {
  const app = new Express();

  const modules = { User, User_Post }

  //Подключение к базе данных
  const start = async () => {
    try {
      await sequelize.authenticate()
      await sequelize.sync()
      console.log(`Соединение с базой данных успешно установлено ${process.env.DB_NAME}`)
      app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
    } catch (error) {
      console.log(`Ошибка подключения к базе данных: ${error}`)
    }
  }  

  start()

  app.use("/static", Express.static("node_modules"));

  // Использование сессий
  app.use(
    session({
      secret: "my-secret-key",
      resave: false,
      saveUninitialized: false,
    })
  );

  // Использование morgan для логирования запросов
  app.use(morgan(':method :url :status'));

  //Примеры постов
  let posts = [
    new Post("Гари", "how are your?"),
    new Post("nodejs", "story about nodejs"),
  ];

  // Middleware для парсинга JSON
  app.use(bodyParser.json());

  // Установка Pug в качестве шаблонизатора
  app.set("view engine", "pug");
  app.use(bodyParser.urlencoded({ extended: false }));

  // Подключение Bootstrap
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathway = path.join(__dirname, "public");
  app.use("/assets", Express.static(pathway));
  app.use(
    "/bootstrap",
    Express.static(path.join(__dirname, "../node_modules/bootstrap/dist"))
  );

  // Реализация постов
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/posts", (_req, res) => {
    res.render("posts/index", { posts });
  });

  app.get("/posts/new", (_req, res) => {
    res.render("posts/new_post", { form: {}, errors: {} });
  });

  app.get("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id.toString() === req.params.id);
    res.render("posts/show", { post });
  });

  app.post("/posts", (req, res) => {
    const { title, body } = req.body;

    const errors = {};
    if (!title) {
      errors.title = "Can't be blank";
    }

    if (!body) {
      errors.body = "Can't be blank";
    }

    if (Object.keys(errors).length === 0) {
      const post = new Post(title, body);
      posts.push(post);
      res.redirect(`/posts/${post.id}`);
      return;
    }

    res.status(422);
    res.render("posts/new_post", { form: req.body, errors });
  });

  app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find((p) => p.id.toString() === req.params.id);
    res.render("posts/edit", { post, form: post, errors: {} });
  });

  app.patch("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id.toString() === req.params.id);
    const { title, body } = req.body;

    const errors = {};
    if (!title) {
      errors.title = "Can't be blank";
    }

    if (!body) {
      errors.body = "Can't be blank";
    }

    if (Object.keys(errors).length > 0) {
      res.status(422);
      res.render("posts/edit", { post, form: req.body, errors });
      return;
    }

    post.title = title;
    post.body = body;
    res.redirect(`/posts/${post.id}/edit`);
  });

  app.delete("/posts/:id", (req, res) => {
    posts = posts.filter((post) => post.id.toString() !== req.params.id);
    res.redirect("/posts");
  });

  // Регистрация пользователя
  app.get("/register", (req, res) => {
    res.render("posts/register");
  });

  app.post("/register", async (req, res) => {
    //Реализация нового пользователя
  });

  // Авторизация пользователя
  app.post("/login", (req, res) => {
    // Реализация авторизации пользователя
  });

  // Получение списка записей с пагинацией
  app.get("/posts", (req, res) => {
    // Реализация получения списка записей с пагинацией
    res.render("post/app");
  });

  // Создание новой записи
  app.post("/posts", (req, res) => {
    // Реализация создания новой записи
  });

  return app;
};

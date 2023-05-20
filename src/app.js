import Express from "express";
import morgan from "morgan";
import { sequelize } from "./database.js";
import cors from "cors";
import errorHandler from "../middleware/ErrorHandingMiddlewere.js";
import { Users, Posts } from "../models/models.js";
import * as bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

import router from "../routes/index.js";

export default (PORT) => {
  const app = new Express();

  app.use(cors());
  app.use(Express.json());
  app.use("/api", router);
  app.use("/api/uploads", Express.static("uploads"));
  app.use(errorHandler);

  const start = async () => {
    try {
      const generateJWT = (id, email) => {
        return Jwt.sign({ id, email }, process.env.SECRET_KEY, {
          expiresIn: "30d",
        });
      };
      await sequelize.authenticate();
      await sequelize.sync();

      const admin = {
        email: "admin@example.com",
        password: "qwerty",
        name: "Admin",
      };
      const userCandidate = await Users.findOne({
        where: { email: admin.email },
      });
      if (!userCandidate) {
        const hashPassword = await bcrypt.hash(admin.password, 10);
        const user = await Users.create({
          email: admin.email,
          name: admin.name,
          password: hashPassword,
        });
        const token = generateJWT(user.id, user.name, user.email);

        const post1 = await Posts.create({
          author: user.id,
          title: "Мой пост",
          text: `Привет, мир! Я ${user.name}`,
        });

        const post2 = await Posts.create({
          author: user.id,
          title: "Мой второй пост",
          text: `Привет, мир! Я ${user.name}`,
        });
        console.log(
          `Данные для пользователя ADMIN\nlogin: ${admin.email}\npassword: ${admin.password}\ntoken: ${token}`
        );
      }
      console.log(
        `Соединение с базой данных успешно установлено ${process.env.DB_NAME}
        \nДанные для пользователя ADMIN\nlogin: ${admin.email}\npassword: ${admin.password}`
      );

      app.listen(PORT, () => {
        console.log(
          `Server is running on port ${PORT}
        \nhttp://localhost:${PORT}/api`);
      });
    } catch (error) {
      console.log(`Ошибка подключения к базе данных: ${error}`);
    }
  };

  start();

  app.use(morgan(":method :url :status"));

  return app;
};

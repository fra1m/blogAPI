import Express from "express";
import morgan from "morgan";
import session from "express-session";
import { sequelize } from "./database.js";
import { User, User_Post, Posts} from "../models/models.js";
import cors from 'cors';
import errorHandler from "../middleware/ErrorHandingMiddlewere.js";


import router from "../routes/index.js";
import Post from "../entitles/Post.js";

const modules = { User, User_Post, Posts }


export default (PORT) => {
  const app = new Express();
  app.use(cors())
  app.use(Express.json())
  app.use('/api',router)

  app.use(errorHandler)




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






  // Установка Pug в качестве шаблонизатора


  // Использование morgan для логирования запросов
  app.use(morgan(':method :url :status'));

  return app;
};

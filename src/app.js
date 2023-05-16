import Express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

import Post from '../entitles/Post.js'
import {importCJSFile} from './scripts.js'

export default () => {
const app = new Express();
  
// Определение модели для записи блога
const { User, sequelize } = importCJSFile('../models/Users.cjs');
const Users = new User(sequelize)


// Middleware для парсинга JSON
app.use(bodyParser.json());


// Установка Pug в качестве шаблонизатора
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

// Подключение Bootstrap
//app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

app.get('/', (req, res) => {
  res.render('layouts/app')
})

app.get('/register', (req, res) => {
  res.render('posts/register');
});

// Регистрация пользователя
app.post('/register', async (req, res) => {
  const { name, login, password } = req.body;

  const existingUser = await User.findOne({
    where: {
      login: login
    }
  });

  if (existingUser) {
    // Пользователь уже существует, отправка сообщения об ошибке
    res.status(400).json({ error: 'Пользователь с таким логином уже зарегистрирован' });
    return;
  }

  try {
    // Создание нового пользователя
    const newUser = await User.create({
      name,
      login,
      password,
    });

    // Отправка ответа с данными нового пользователя
    res.json({
      id: newUser.id,
      name: newUser.name,
      login: newUser.login,
      registered: true,
    });
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
});


// Авторизация пользователя
app.post('/login', (req, res) => {
  // Реализация авторизации пользователя
});

// Получение списка записей с пагинацией
app.get('/posts', (req, res) => {
  // Реализация получения списка записей с пагинацией
  res.render('post/app')
});

// Создание новой записи
app.post('/posts', (req, res) => {
  // Реализация создания новой записи
});

return app
}

import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import {importCJSFile} from './scripts.js'

const app = express();

// Определение модели для записи блога
const { User, sequelize } = importCJSFile('../entities/Post.cjs');

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Подключение Bootstrap
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

// Регистрация пользователя
app.post('/register', (req, res) => {
  // Реализация регистрации пользователя
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

export default app;

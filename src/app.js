import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { Sequelize, DataTypes } from 'sequelize';
import definePostModel from '../entities/Post.js'

const app = express();

// Подключение к базе данных PostgreSQL
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

// Определение модели для записи блога
const Post = new definePostModel(sequelize);

// Middleware для парсинга JSON
app.use(bodyParser.json());

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
});

// Создание новой записи
app.post('/posts', (req, res) => {
  // Реализация создания новой записи
});

export default app;

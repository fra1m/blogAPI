import { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';
// Создание объекта sequelize для установки соединения
const sequelize = new Sequelize('MyBlogAPI', 'myblogdb', '100797', {
  host: 'localhost',
  dialect: 'postgres',
});

// Проверка соединения
sequelize
  .authenticate()
  .then(() => {
    console.log('Соединение с базой данных успешно установлено');
  })
  .catch((error) => {
    console.error('Ошибка подключения к базе данных:', error);
  });


// Определение модели User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'username' // Указываем соответствующее поле в таблице
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password' // Указываем соответствующее поле в таблице
  }
}, {
  tableName: 'D_B' // Указываем имя существующей таблицы
});

// Получение всех пользователей
User.findAll()
  .then(users => {
    console.log('Все пользователи:', users);
  })
  .catch(error => {
    console.error('Ошибка при получении пользователей:', error);
  });

// Экспорт модели
module.exports = { User, sequelize };
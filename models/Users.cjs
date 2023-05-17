const { Sequelize, DataTypes } = require("sequelize");

// Создание объекта sequelize для установки соединения
const sequelize = new Sequelize("myblogdb", "vasili", "100797", {
  host: "localhost",
  dialect: "postgres",
});

// Проверка соединения
sequelize
  .authenticate()
  .then(() => {
    console.log("Соединение с базой данных успешно установлено");
  })
  .catch((error) => {
    console.error("Ошибка подключения к базе данных:", error);
  });

// Определение модели User

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = { User, sequelize };

import { sequelize } from "../src/database.js";
import { DataTypes } from "sequelize";

const Users = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Posts = sequelize.define("posts", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  author: {
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
    allowNull: false,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING },
});

Users.hasMany(Posts);
Posts.belongsTo(Users);

export { Users, Posts };

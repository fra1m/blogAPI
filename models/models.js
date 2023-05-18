import { sequelize } from "../src/database.js"
import { DataTypes } from "sequelize"

const Posts = sequelize.define('posts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    authors: {type: DataTypes.STRING},
    posts: {type: DataTypes.STRING, allowNull: false},
})

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const User_Post = sequelize.define('user_post',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    author: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE},
    text: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING},
})

Posts.hasMany(User)
User.belongsTo(Posts)

Posts.hasMany(User_Post)
User_Post.belongsTo(Posts)

User.hasMany(User_Post)
User_Post.belongsTo(User)

export { User, User_Post, Posts}
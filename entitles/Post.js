import {importCJSFile} from '../src/scripts.js'

const { User, sequelize } = importCJSFile('../models/Users.cjs');


export default class Post {
    constructor(title, body, date, media) {
        this.title = title;
        this.body = body;
        this.date = date;
        this.media = media;
        Post.getAllUserNames().then(names => {
            this.username = names;
        }).catch(error => {
            console.error('Ошибка при получении имен пользователей:', error);
        });
        this.sequelize = sequelize;
        this.postId = Post.generateId();
    }
  
    static generatePostId() {
      if (!Post.currentId) {
        Post.currentId = 1;
      } else {
        Post.currentId++;
      }
  
      return Post.currentId;
    }

    static async getAllUserNames() {
        try {
          const users = await this.sequelize.models.User.findAll();
          return users.map(user => user.name);
        } catch (error) {
          console.error('Ошибка при получении имен пользователей:', error);
          return [];
        }
      }
}


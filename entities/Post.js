export default class Post {
    constructor (title, body) {
      this.title = title,
      this.body = body,
      this.id = Post.generateId()
    }
  
    static generateId () {
      if (!Post.currectId) {
        Post.currectId = 1
      } else {
        Post.currectId ++
      }
  
      return Post.currectId
    }
  }
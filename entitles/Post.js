class Post {
    constructor(title, body) {
      this.id = Post.id;
      Post.id += 1;
      this.title = title;
      this.body = body;
    }
  }
  
  Post.id = 1;
  
  export default Post;
  
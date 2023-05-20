import { Posts, Users } from "../models/models.js";
import ApiError from "../error/ApiError.js";

export const get = async (req, res, next) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    const getPosts = await Posts.findAll({ limit, offset });
    res.json({ getPosts });
  } catch (error) {
    console.log(error);
    next(ApiError.badRequest(`Не удалось получить статьи`));
  }
};

export const getOne = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const getPosts = await Posts.findByPk(postId);
    if (!getPosts) {
      return next(ApiError.badRequest(`Не удалось найти статью!`));
    }
    res.json(getPosts);
  } catch (error) {
    console.log(error);
    next(ApiError.internal(`Не удалось найти статью!`));
  }
};

export const update = async (req, res, next) => {
  try {
    const { title, text, img } = req.body;
    const postId = req.params.id;
    const author = await Users.findByPk(req.user);
    const post = await Posts.findByPk(postId);
    if (post.author !== author.id) {
      return next(ApiError.badRequest(`Отказано в доступе!`));
    }
    await Posts.update(
      { title, author: author.id, text, img },
      { where: { author: post.author } }
    );
    res.json({ message: `Статься обновлена!` });
  } catch (error) {
    console.log(error);
    next(ApiError.internal(`Статься не найдена или удалена!`));
  }
};

export const create = async (req, res, next) => {
  try {
    const { title, text, img } = req.body;
    const author = await Users.findByPk(req.user);
    const newPost = await Posts.create({ title, author: author.id, text, img });

    return res.json({ newPost });
  } catch (error) {
    console.log(error);
    next(ApiError.internal(`Не удалось создать статью!`));
  }
};

export const remove = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const delPost = await Posts.findByPk(postId);
    const author = await Users.findByPk(req.user);
    if (!delPost) {
      return next(ApiError.badRequest(`Статься не найдена или удалена!`));
    }
    if (delPost.author !== author.id) {
      return next(ApiError.badRequest(`Отказано в доступе!`));
    }
    await Posts.destroy({ where: { id: postId } });
    res.json({ message: `Статься удалена!` });
  } catch (error) {
    console.log(error);
    next(ApiError.internal(`Статься не найдена или удалена!!!`));
  }
};

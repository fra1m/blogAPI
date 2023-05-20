import ApiError from "../error/ApiError.js";
import { Users } from "../models/models.js";
import * as bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const generateJWT = (id, email) => {
  return Jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: "30d" });
};

export const registration = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const candidate = await Users.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest(
          `Пользователь с таким email:${email} уже существует`
        )
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ email, name, password: hashPassword });
    const token = generateJWT(user.id, user.name, user.email);
    return res.json({ user, token });
  } catch (error) {
    console.log(error);
    next(ApiError.internal(`Не удолось зарегестрироваться`));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal(`Неверный логин или паролью`));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal(`Неверный логин или пароль.`));
    }
    const token = generateJWT(user.id, user.email, user.name);
    return res.json({ user, token });
  } catch (error) {
    console.log(error);
    next(ApiError.internal(`Не удолось авторизоваться`));
  }
};

export const check = async (req, res, next) => {
  const user = await Users.findByPk(req.user);
  if (!user) {
    next(ApiError.badRequest("Пользователь не найден!"));
  }
  res.json(user);
};

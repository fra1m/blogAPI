import { validationResult } from "express-validator";

// Экспортируем функцию-миддлвэр, которая проверяет валидацию запроса на наличие ошибок
// Если валидация не прошла, то возвращаем ошибку
export default (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    // проверяем наличие ошибок в результате валидации
    return next(ApiError.badRequest(`Некорректный email или password`)); // возвращаем ошибку и сообщение об ошибке
  }

  next(); // переходим к следующему мидлвэру
};

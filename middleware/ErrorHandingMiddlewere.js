import ApiError from "../error/ApiError.js";

// Экспортируем функцию-миддлвэр для обработки ошибок
export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    // Проверяем, является ли ошибка ApiError
    return res.status(err.status).json({ message: err.message }); // Если да, то возвращаем ошибку с соответствующим кодом и сообщением
  }

  return res.status(500).json({ message: `Unknow error!\n${err}` }); // В противном случае возвращаем ошибку 500 Internal Server Error и сообщение об ошибке
};

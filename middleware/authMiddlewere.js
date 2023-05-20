import Jwt from "jsonwebtoken";

// Экспортируем функцию-миддлвэр для проверки авторизации пользователя
export default function (req, res, next) {
  try {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, ""); // Получаем токен из заголовка запроса и удаляем префикс "Bearer"
    if (!token) {
      // Если токен отсутствует, возвращаем ошибку 401 Unauthorized
      return res.status(401).json({ message: `Нет доступа!` });
    }
    const decoded = Jwt.verify(token, process.env.SECRET_KEY); // Расшифровываем токен
    req.user = decoded.id; // Получаем идентификатор пользователя из расшифрованного токена и добавляем его в объект запроса
    next(); // Переходим к следующему мидлвэру
  } catch (error) {
    // Если произошла ошибка, возвращаем ошибку 401 Unauthorized
    res.status(401).json({ message: `Не авторизован!` });
  }
}

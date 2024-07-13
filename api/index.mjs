import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/User.js'; // Импортируем модель пользователя
import Booster from './models/Booster.js'; // Импортируем модель бустера
import cors from 'cors';
import helmet from 'helmet'; // Для управления заголовками безопасности, включая CSP

const PORT = process.env.PORT || 3000;
const app = express();

// Используем Helmet для добавления Content Security Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-eval'"], // Разрешаем использование unsafe-eval, если необходимо
    // Другие директивы, включая styleSrc, imgSrc, fontSrc, и т.д.
  }
}));

// Middleware для установки заголовков CSP и CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Пропускать опции предзапросы
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Обработчик GET запроса на корневой URL /
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

app.use(express.json()); // Парсинг JSON тела запроса
app.use(cors()); // Разрешаем CORS для всех запросов
app.use(bodyParser.json()); // Middleware для парсинга JSON

// Подключение к базе данных MongoDB
const uri = "mongodb+srv://vercel-admin-user:AhEmrqRrzo2o0aPp@cluster0.6ire3pk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});

// Эндпоинт для проверки наличия пользователя
app.get('/api/v1/checkUser', async (req, res) => {
  try {
    const { user_id } = req.query;
    const existingUser = await User.findOne({ user_id });
    if (existingUser) {
      return res.status(200).json({ exists: true });
    }
    res.status(200).json({ exists: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Эндпоинт для создания пользователя, если его нет в базе
app.post('/api/v1/createUser', async (req, res) => {
  try {
    const { user_id } = req.body;
    const existingUser = await User.findOne({ user_id });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким user_id уже существует' });
    }

    const newUser = new User({
      user_id,
      name: '', // Пустое имя
      rank: '', // Пустой ранг
      total_coins: 0, // Нулевое количество монет
      tap_coins: 1, // Нулевое количество кликов
      total_taps: 100, // Значение по умолчанию для total_taps
      allCoins: 0, // Нулевое количество всех монет
      firelimit: 1
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Эндпоинт для получения данных пользователя, если он существует
app.post('/api/v1/getUserDetails', async (req, res) => {
  try {
    const { user_id } = req.body;
    const existingUser = await User.findOne({ user_id });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    res.status(404).json({ message: 'Пользователь не найден' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

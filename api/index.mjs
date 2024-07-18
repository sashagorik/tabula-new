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
app.post('/api/v1/checkUser', async (req, res) => {
  try {
    const { user_id } = req.body;
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
app.post('/api/v1/addUser', async (req, res) => {
  try {
    const { user_id } = req.body;
    const existingUser = await User.findOne({ user_id });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким user_id уже существует' });
    }

    const newUser = new User({
      user_id,
    });

    const newBooster = new Booster({
      user_id,
      multiTap: 1,
      firelimit: 1,
      flashSpeed: 1,
      hireAnt: false,
      recharge: 1,
      turbo: 3
    });

    const savedUser = await newUser.save();
    const savedBooster = await newBooster.save();
    
    res.status(201).json({ savedUser, savedBooster });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Эндпоинт для получения данных пользователя, если он существует
app.get('/api/v1/getUserDetails', async (req, res) => {
  try {
    const { user_id } = req.query; // Получаем user_id из query параметров запроса
    const existingUser = await User.findOne({ user_id });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    res.status(404).json({ message: 'Пользователь не найден' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Эндпоинт для получения данных бустера
app.get('/api/v1/boosterDetails', async (req, res) => {
  const { user_id } = req.query;
  try {
    const booster = await Booster.findOne({ user_id });
    if (booster) {
      res.json(booster);
    } else {
      res.status(404).json({ message: 'Booster not found' });
    }
  } catch (error) {
    console.error('Error fetching booster details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Эндпоинт для получения только recharge и turbo из бустера
app.get('/api/v1/getFreeBoosterApi', async (req, res) => {
  const { user_id } = req.query;
  try {
    const booster = await Booster.findOne({ user_id }, 'recharge turbo');
    if (booster) {
      res.json(booster);
    } else {
      res.status(404).json({ message: 'Booster not found' });
    }
  } catch (error) {
    console.error('Error fetching booster details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Эндпоинт для обновления монет в базе
app.post('/api/v1/updateCoins', async (req, res) => {
  try {
    const { user_id, total_coins } = req.body;
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    user.allCoins = total_coins;
    await user.save();

    res.status(200).json({ message: 'Монеты успешно обновлены' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;


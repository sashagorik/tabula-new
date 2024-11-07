import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/User.js'; // Импортируем модель пользователя
import Booster from './models/Booster.js'; // Импортируем модель бустера
import cors from 'cors';
//import { userInfo } from 'os';
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
const uri = "mongodb+srv://sashagorik1982:bk8a2KDylgrENyI5@cluster0.6ire3pk.mongodb.net/?appName=Cluster0";
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
      profitPerHour:0.01
    });

    const newBooster = new Booster({
      user_id,
      multiTap: 1,
      firelimit: 1,
      flashSpeed: 1,
      hireAnt: false,
      recharge: 1,
      turbo: 3,
      profitPerHour:0.01
    });

    const savedUser = await newUser.save();
    const savedBooster = await newBooster.save();
    
    res.status(201).json({ savedUser, savedBooster });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

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

// Эндпоинт для получения данных пользователя
app.get('/api/v1/userDetails', async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id parameter' });
  }

  try {
    const user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Предположим, что ваша модель пользователя (User) имеет свойства user_id, name, total_coins и ton_coins
    const userData = {
      user_id: user.user_id,
      name: user.name,
      total_coins: user.total_coins,
      total_taps: user.total_taps
      // ton_coins: user.ton_coins,
      // Добавьте другие свойства пользователя по необходимости
    };

    res.json({ success: true, data: userData });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Эндпоинт для сохранения данных пользователя
app.post('/api/v1/userDetails', async (req, res) => {
  const userData = req.body;

  try {
    let user = await User.findOne({ user_id: userData.user_id });

    if (!user) {
      // Если пользователь не найден, создаем нового
      user = new User({
        user_id: userData.user_id,
        name: userData.name,
        total_coins: userData.total_coins,
        total_taps: userData.total_taps
      });
      await user.save();

      // После создания пользователя также создаем запись о бустерах
      const booster = new Booster({
        user_id: userData.user_id,
        multiTap: 0,
        fireLimit: 0,
        flashSpeed: 0,
        hireAnt: false,
        recharge: 3, // Пример начального значения для recharge
        turbo: 3 // Пример начального значения для turbo
      });
      await booster.save();
    } else {
      // Обновляем данные пользователя, если он уже существует
      user = Object.assign(user, userData);
      await user.save();
    }

    res.json({ success: true, data: user });
  } catch (err) {
    console.error('Error saving user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Эндпоинт для обновления количества монет totalcoins
app.post('/api/v1/updateCoins', async (req, res) => {
  const { user_id, coins } = req.body;

  try {
    let user = await User.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Обновляем количество монет
    user.total_coins += coins;

    await user.save();
    res.json({ success: true, data: user });
  } catch (err) {
    console.error('Error updating coins:', err); // Выводим ошибку в консоль
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Эндпоинт для получения данных о бустерах
app.get('/api/v1/boosterDetails', async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id parameter' });
  }

  try {
    const booster = await Booster.findOne({ user_id });
    if (!booster) {
      return res.status(404).json({ error: 'Booster data not found' });
    }
    res.json({ success: true, data: booster });
  } catch (err) {
    console.error('Error fetching booster data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Эндпоинт для обновления данных о бустерах
app.post('/api/v1/updateBooster', async (req, res) => {
  const { user_id, boosterData } = req.body;

  try {
    let booster = await Booster.findOne({ user_id });
    if (!booster) {
      return res.status(404).json({ error: 'Booster data not found' });
    }

    // Обновляем данные о бустерах
    booster = Object.assign(booster, boosterData);

    await booster.save();
    res.json({ success: true, data: booster });
  } catch (err) {
    console.error('Error updating booster data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Эндпоинт для апгрейда бустера
app.post('/api/v1/upgradeBooster', async (req, res) => {
  const { user_id, boosterType } = req.body;

  try {
    let user = await User.findOne({ user_id });
    let booster = await Booster.findOne({ user_id });

    if (!user || !booster) {
      return res.status(404).json({ error: 'User or Booster data not found' });
    }

    const boosterLevels = {
      multiTap: booster.multiTap,
      fireLimit: booster.fireLimit,
      flashSpeed: booster.flashSpeed,
      hireAnt: booster.hireAnt
    };

    const boosterPrices = {
      multiTap: (boosterLevels.multiTap + 1) * 200,
      fireLimit: (boosterLevels.fireLimit + 1) * 200,
      flashSpeed: (boosterLevels.flashSpeed + 1) * 200,
      hireAnt: 200000
    };

    const price = boosterPrices[boosterType];

    if (user.total_coins < price) {
      return res.status(400).json({ error: 'Not enough coins' });
    }

    user.total_coins -= price;
    booster[boosterType] += 1;

    // Если апгрейдируем fireLimit, увеличиваем total_taps
    if (boosterType === 'fireLimit') {
      user.total_taps += 100; // Добавляем 100 очков за каждый уровень fireLimit
    }

    await user.save();
    await booster.save();

    res.json({ success: true, data: { user, booster } });
  } catch (err) {
    console.error('Error upgrading booster:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Эндпоинт для получения уровня бустера пользователя
app.get('/api/v1/boosterLevel', async (req, res) => {
  const { user_id, booster } = req.query;
  if (!user_id || !booster) {
    return res.status(400).json({ error: 'Missing user_id or booster parameter' });
  }

  try {
    const boosterData = await Booster.findOne({ user_id });
    if (!boosterData) {
      return res.status(404).json({ error: 'Booster data not found' });
    }
    const boosterLevel = boosterData[booster];
    if (boosterLevel === undefined) {
      return res.status(400).json({ error: 'Invalid booster type' });
    }
    res.json({ success: true, level: boosterLevel });
  } catch (err) {
    console.error('Error fetching booster level:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Эндпоинт Обновление total_taps пользователя
app.post('/api/v1/updateTotalTaps', async (req, res) => {
  const { user_id, total_taps } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ user_id }, { total_taps }, { new: true });
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating total taps:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Получение данных о ежедневных вознаграждениях
app.get('/api/dailyRewardDetails/:userId', async (req, res) => {
  try {
      const user = await User.findOne({ user_id: req.params.userId });
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.json(user.dailyRewards);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Обновление данных о ежедневных вознаграждениях
app.post('/api/updateDailyReward/:userId', async (req, res) => {
  try {
      const user = await User.findOne({ user_id: req.params.userId });
      if (!user) {
          return res.status(404).send('User not found');
      }

      const today = new Date();
      const lastClaimDate = new Date(user.dailyRewards.lastClaimDate);
      const isSameDay = today.getDate() === lastClaimDate.getDate() &&
                        today.getMonth() === lastClaimDate.getMonth() &&
                        today.getFullYear() === lastClaimDate.getFullYear();

      if (!isSameDay) {
          user.dailyRewards.claimDays += 1;
          user.dailyRewards.isClaimed = false;
      }

      user.dailyRewards.lastClaimDate = today;
      user.total_coins += req.body.coins;
      user.dailyRewards.isClaimed = req.body.isClaimed;

      await user.save();
      res.json(user.dailyRewards);
  } catch (error) {
      res.status(500).send(error);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

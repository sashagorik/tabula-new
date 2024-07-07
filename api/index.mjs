import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

const PORT = process.env.PORT || 3000;
const app = express();

// Используем Helmet для добавления Content Security Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-eval'"],
  }
}));

// Middleware для установки заголовков CSP и CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Обработка JSON тела запроса
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://sashagorik1982:bk8a2KDylgrENyI5@cluster0.6ire3pk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let db;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

// Middleware для проверки подключения к базе данных
function checkDbConnection(req, res, next) {
  if (!db) {
    return res.status(500).json({ error: 'Database connection not established' });
  }
  next();
}

// Используем промежуточное ПО перед всеми запросами, требующими подключения к базе данных
app.use(checkDbConnection);

app.get('/api/v1/userDetails', async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id parameter' });
  }

  try {
    const collection = db.collection('users');
    const user = await collection.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = {
      user_id: user.user_id,
      name: user.name,
      total_coins: user.total_coins,
      total_taps: user.total_taps
    };

    res.json({ success: true, data: userData });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/userDetails', async (req, res) => {
  const userData = req.body;

  try {
    const collection = db.collection('users');
    let user = await collection.findOne({ user_id: userData.user_id });

    if (!user) {
      await collection.insertOne(userData);
      await db.collection('boosters').insertOne({
        user_id: userData.user_id,
        multiTap: 0,
        fireLimit: 0,
        flashSpeed: 0,
        hireAnt: false,
        recharge: 3,
        turbo: 3
      });
    } else {
      await collection.updateOne({ user_id: userData.user_id }, { $set: userData });
    }

    res.json({ success: true, data: userData });
  } catch (err) {
    console.error('Error saving user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/updateCoins', async (req, res) => {
  const { user_id, coins } = req.body;

  try {
    const collection = db.collection('users');
    let user = await collection.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.total_coins += coins;

    await collection.updateOne({ user_id }, { $set: { total_coins: user.total_coins } });

    res.json({ success: true, data: user });
  } catch (err) {
    console.error('Error updating coins:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/v1/boosterDetails', async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id parameter' });
  }

  try {
    const collection = db.collection('boosters');
    const booster = await collection.findOne({ user_id });

    if (!booster) {
      return res.status(404).json({ error: 'Booster data not found' });
    }

    res.json({ success: true, data: booster });
  } catch (err) {
    console.error('Error fetching booster data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/updateBooster', async (req, res) => {
  const { user_id, boosterData } = req.body;

  try {
    const collection = db.collection('boosters');
    let booster = await collection.findOne({ user_id });

    if (!booster) {
      return res.status(404).json({ error: 'Booster data not found' });
    }

    booster = Object.assign(booster, boosterData);

    await collection.updateOne({ user_id }, { $set: booster });

    res.json({ success: true, data: booster });
  } catch (err) {
    console.error('Error updating booster data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/upgradeBooster', async (req, res) => {
  const { user_id, boosterType } = req.body;

  try {
    const usersCollection = db.collection('users');
    const boostersCollection = db.collection('boosters');

    let user = await usersCollection.findOne({ user_id });
    let booster = await boostersCollection.findOne({ user_id });

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

    if (boosterType === 'fireLimit') {
      user.total_taps += 100;
    }

    await usersCollection.updateOne({ user_id }, { $set: user });
    await boostersCollection.updateOne({ user_id }, { $set: booster });

    res.json({ success: true, data: { user, booster } });
  } catch (err) {
    console.error('Error upgrading booster:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/dailyReward', async (req, res) => {
  const { user_id } = req.body;

  try {
    const collection = db.collection('users');
    let user = await collection.findOne({ user_id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const reward = 100;
    user.total_coins += reward;

    await collection.updateOne({ user_id }, { $set: { total_coins: user.total_coins } });

    res.json({ success: true, data: user });
  } catch (err) {
    console.error('Error processing daily reward:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

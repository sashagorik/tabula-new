import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/User.js';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http'; // Для создания HTTP сервера
import { Server as SocketIOServer } from 'socket.io'; // Импортируем Server из socket.io

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app); // Создаем HTTP сервер на основе Express
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
  }
});

// Используем Helmet и middleware для управления заголовками безопасности
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-eval'"],
    // Другие директивы, включая styleSrc, imgSrc, fontSrc, и т.д.
  }
}));

// Middleware для CORS и установки заголовков
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});

// WebSocket обработчик
io.on('connection', (socket) => {
  console.log(`Client connected with ID: ${socket.id}`);

  socket.on('join', ({ user_id }) => {
    console.log(`User ${user_id} joined`);
    // Дополнительная логика по необходимости, например, отправка данных обратно клиенту
    socket.emit('response', { antHire: 'some data' });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected with ID: ${socket.id}`);
  });
});

// Эндпоинты для Express
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// Эндпоинты для работы с пользователями (check, create, get details, update)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

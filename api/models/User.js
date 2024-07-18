import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // id пользователя
  user_id: {
    type: String,
    required: true,
    unique: true
  },

  // имя пользователя
  name: {
    type: String,
    default: 'name' // значение по умолчанию
  },

  // ранг пользователя
  rank: {
    type: String,
    default: 'newbie' // значение по умолчанию
  },
 
  // общее количество накликанных монет
  total_coins: {
    type: Number,
    default: 1 // значение по умолчанию
  },

  // количество монет за 1 клик
  tap_coins: {
    type: Number,
    default: 1 // значение по умолчанию
  },

  // количество доступных кликов в прогресс баре
  total_taps: {
    type: Number,
    default: 500 // значение по умолчанию
  },

  // количество использованных кликов в прогресс баре
  used_taps: {
    type: Number,
    default: 500 // значение по умолчанию
  },

  // общее количество монет у пользователя
  allCoins: {
    type: Number,
    default: 1 // значение по умолчанию
  }
});

const User = mongoose.model('User', userSchema);

export default User;


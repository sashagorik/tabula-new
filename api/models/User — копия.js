import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true
  },
  no_of_taps: {
    type: Number,
    required: true
  },
  total_coins: {
    type: Number,
    required: true
  },
  tap_coins: {
    type: Number,
    required: true
  },
  total_taps: {
    type: Number,
    required: true
  },
  flash_speed: {
    type: Number,
    required: true
  },
  recharge: {
    type: Number,
    required: true
  },
  turbo: {
    type: Number,
    required: true
  },
  allCoins: {
    type: Number,
    required: true
  },
});

const User = mongoose.model('User', userSchema);

export default User;

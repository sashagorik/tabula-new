import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    
  },
  rank: {
    type: String,
    
  },
  no_of_taps: {
    type: Number,
    
  },
  total_coins: {
    type: Number,
    
  },
  tap_coins: {
    type: Number,
    
  },
  total_taps: {
    type: Number,
    
  },
  flash_speed: {
    type: Number,
    
  },
  recharge: {
    type: Number,
    
  },
  turbo: {
    type: Number,
    
  },
  allCoins: {
    type: Number,
    
  },
});

const User = mongoose.model('User', userSchema);

export default User;

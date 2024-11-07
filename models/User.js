import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,  // Изменяем на Number, если user_id числовой
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  
  total_coins: {
    type: Number,
    required: true
  },
  
  profitPerHour: {
    type: Number,
    required: true
  },

  registrationDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  lastLoginDate: {
    type: Date,
    default: Date.now,
    required: true
  }
});
// Обновляем `lastLoginDate` каждый раз, когда пользователь входит в систему
userSchema.methods.updateLastLogin = function() {
  this.lastLoginDate = new Date();
  return this.save();
};

const User = mongoose.model('User', userSchema);

export default User;


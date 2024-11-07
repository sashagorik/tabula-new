import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  
  profitPerHour: {
    type: Number,
    required: true
  },

  // Новые поля для даты и времени
  registrationDate: {
    type: Date,
    default: Date.now,  // Устанавливаем текущую дату при регистрации
    required: true
  },
  lastLoginDate: {
    type: Date,
    default: Date.now,  // Инициализация последнего входа при создании
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

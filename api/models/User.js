import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },

  first_name: {
    type: String,
    required: true,
    
  },

  last_name: {
    type: String,
    required: true,
    
  },

  username: {
    type: String,
    required: true,
    
  },

  

  is_premium: {
    type: Boolean,
    required: true,
    
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
  },


  total_coins: {
    type: Number,
    required: true
  },

  profitPerHour: {
    type: Number,
    required: true
  },

});

// Обновляем `lastLoginDate` каждый раз, когда пользователь входит в систему
userSchema.methods.updateLastLogin = function() {
  this.lastLoginDate = new Date();
  return this.save();
};

const User = mongoose.model('User', userSchema);

export default User;


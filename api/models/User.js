import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },

  firstName: {
    type: String,
   
    
  },

  lastName: {
    type: String,
    
    
  },

  username: {
    type: String,
    
    
  },

  

  isPremium: {
    type: Boolean,
   
    
  },
 
 

  // Новые поля для даты и времени
  registrationDate: {
    type: Date,
    default: Date.now,  // Устанавливаем текущую дату при регистрации
    
  },
  lastLoginDate: {
    type: Date,
    default: Date.now,  // Инициализация последнего входа при создании
    
  },


  totalCoins: {
    type: Number,
    
  },

  profitPerHour: {
    type: Number,
    
  },

});

// Обновляем `lastLoginDate` каждый раз, когда пользователь входит в систему
userSchema.methods.updateLastLogin = function() {
  this.lastLoginDate = new Date();
  return this.save();
};

const User = mongoose.model('User', userSchema);

export default User;


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  //id пользователя
  user_id: {
    type: String,
    required: true,
    unique: true
  },

  //имя пользователя
  name: {
    type: String,
    
  },

  //ранг пользователя
  rank: {
    type: String,
    
  },
 
  //общее количество накликанных монет
  total_coins: {
    type: Number,
  
    //количество монет за 1 клик
  },
  tap_coins: {
    type: Number,
   
    //количество доступных кликов в прогресс баре
  },
  total_taps: {
    type: Number,
    
  },
   //количество использованных кликов в прогресс баре
  //used_taps: {
   // type: Number,
    
 // },

  //общее количествш монет у пользователя
  allCoins: {
    type: Number,
    
  },

 // firelimit: {
   // type: Number,
 // }
});

const User = mongoose.model('User', userSchema);

export default User;

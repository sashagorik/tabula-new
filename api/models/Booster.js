import mongoose from 'mongoose';

const boosterSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  profitPerHour: {
    type: Number,
    
  },
});

const Booster = mongoose.model('Booster', boosterSchema);

export default Booster;
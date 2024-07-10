import mongoose from 'mongoose';

const boosterSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  multiTap: { type: Number, default: 1 },
  fireLimit: { type: Number, default: 1 },
  flashSpeed: { type: Number, default: 1 },
  hireAnt: { type: Boolean, default: false },
  recharge: { type: Number, default: 3 },
  turbo: { type: Number, default: 3 }
});

const Booster = mongoose.model('Booster', BoosterSchema);

export default Booster;
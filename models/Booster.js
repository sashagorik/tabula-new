import mongoose from 'mongoose';

const BoosterSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  multiTap: { type: Number, default: 0 },
  fireLimit: { type: Number, default: 0 },
  flashSpeed: { type: Number, default: 0 },
  hireAnt: { type: Boolean, default: false },
  recharge: { type: Number, default: 3 }, // example initial value
  turbo: { type: Number, default: 3 } // example initial value
});

const Booster = mongoose.model('Booster', BoosterSchema);

export default Booster;
import mongoose from 'mongoose';

const BoosterSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
});

const Booster = mongoose.model('Booster', BoosterSchema);

export default Booster;
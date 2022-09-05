import mongoose from 'mongoose';
const MechanicSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  city: {type: String, required: true},
  address: {type: String},
  phone_no: {type: Number, required: true},
  service: [
    {
      serviceName: String,
      category: String,
      price: Number,
      discount: Number,
      unit: String,
    },
  ],
  password: {type: String},
  avgRating: {type: Number, default: 0},
});
const Mechanic_Model = mongoose.model('mechanic', MechanicSchema);
export default Mechanic_Model;

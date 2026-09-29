const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ek email se ek hi account ban sakta hai
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user' // By default sab normal user honge, admin nahi
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

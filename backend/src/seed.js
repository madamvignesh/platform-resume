const path = require('path');

// force dotenv to load from backend/.env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('MONGO_URI from env:', process.env.MONGO_URI); // debug log

const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');


async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const email = 'hire-me@anshumat.org';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Demo user already exists.');
    process.exit(0);
  }
  const passwordHash = await bcrypt.hash('HireMe@2025!', 10);
  await User.create({ name: 'Demo Hire', email, passwordHash });
  console.log('Demo user created:', email);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });

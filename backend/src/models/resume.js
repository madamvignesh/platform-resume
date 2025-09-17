const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VersionSchema = new Schema({
  title: { type: String, default: 'Resume' },
  personal: {
    fullName: String,
    email: String,
    phone: String,
    summary: String,
    location: String
  },
  education: [{ school: String, degree: String, start: String, end: String, details: String }],
  experience: [{ company: String, role: String, start: String, end: String, details: String }],
  skills: [String],
  updatedAt: { type: Date, default: Date.now }
});

const ResumeSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  versions: { type: [VersionSchema], default: [] },  // 👈 add default: []
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Resume', ResumeSchema);

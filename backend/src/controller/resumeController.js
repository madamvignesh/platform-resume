const Resume = require('../models/resume');

exports.create = async (req, res) => {
  const { version } = req.body; // version = initial VersionSchema object
  const resume = await Resume.create({ owner: req.user.id, versions: [version] });
  res.status(201).json(resume);
};

exports.list = async (req, res) => {
  const resumes = await Resume.find({ owner: req.user.id });
  res.json(resumes);
};

exports.get = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  if (!resume || resume.owner.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });
  res.json(resume);
};

exports.update = async (req, res) => {
  // support adding a new version or updating an existing version by index
  const { action, version, versionIndex } = req.body;
  const resume = await Resume.findById(req.params.id);
  if (!resume || resume.owner.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });
  if (action === 'add') {
    resume.versions.push(version);
  } else if (action === 'update' && typeof versionIndex === 'number') {
    resume.versions[versionIndex] = version;
    resume.versions[versionIndex].updatedAt = new Date();
  }
  await resume.save();
  res.json(resume);
};

exports.remove = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  if (!resume || resume.owner.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });
  await resume.remove();
  res.json({ message: 'Deleted' });
};

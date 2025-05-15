require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing in .env');
  process.exit(1);
}

const app = express(); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const requestLogSchema = new mongoose.Schema({
  uniqueDevice: { type: String, unique: true, sparse: true },
  uniqueIp: { type: String, unique: true, sparse: true },
  location: {type: String},
  timestamp: { type: Date, default: Date.now },
  requestCount: { type: Number, default: 1 }
});
const RequestLog = mongoose.model('RequestLog', requestLogSchema);

app.post("/", async (req, res) => {
  const { ip, device, city } = req.body;
  const timestamp = new Date().toISOString();
  if (!ip && !uniqueDevice) return res.status(400).json({ error: "Missing uniqueDevice" });

  try {
    let log = await RequestLog.findOne({ uniqueDevice: device });
    if (!log) {
      log = await RequestLog.findOne({ uniqueIp: ip });
    }
    if (log) {
      log.uniqueDevice = device;
      log.uniqueIp = ip;
      log.location = city,
      log.timestamp = timestamp;
      log.requestCount += 1;
      await log.save();
    } else {
      // New entry
      await RequestLog.create({
        uniqueDevice: device,
        uniqueIp: ip,
        location: city,
        timestamp,
        requestCount: 1
      });
    }

    res.json({ message: 'Your Device Has Been Registered In Server' });

  } catch (err) {
    console.error('Logging Error:', err);
    res.status(500).json({ error: 'Server error occurred' });
  }
});

app.get('/logs', async (req, res) => {
  try {
    const logs = await RequestLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error('❌ Middleware Error:', err.stack);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

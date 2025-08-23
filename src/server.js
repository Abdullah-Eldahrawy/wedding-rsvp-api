require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rsvpRoutes = require('./rsvpR'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/rsvps', rsvpRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
.catch(err => console.error('❌ MongoDB connection error:', err));

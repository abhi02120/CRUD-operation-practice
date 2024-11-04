const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors());         // For handling CORS

// Connect to MongoDB
mongoose.connect('mongodb+srv://internnoida01:joUXVJn8Ee2AjRFU@cluster0.csvmu.mongodb.net/practiceDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Transaction, Client } = require('./models'); // Assuming models are defined in './models'

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Example API endpoints

// Fetch all transactions
app.get('/api/transactions', (req, res) => {
  Transaction.find()
    .then(transactions => res.json(transactions))
    .catch(err => console.error(err));
});

// Fetch a specific client by ID
app.get('/api/clients/:id', (req, res) => {
  Client.findById(req.params.id)
    .then(client => res.json(client))
    .catch(err => console.error(err));
});

// Create a new transaction
app.post('/api/transactions', (req, res) => {
  const { date, amount, description, category } = req.body;
  const newTransaction = new Transaction({ date, amount, description, category });

  newTransaction.save()
    .then(transaction => res.json(transaction))
    .catch(err => console.error(err));
});

// Create a new client
app.post('/api/clients', (req, res) => {
  const { name, email, phone, address } = req.body;
  const newClient = new Client({ name, email, phone, address });

  newClient.save()
    .then(client => res.json(client))
    .catch(err => console.error(err));
});

// Update a transaction by ID
app.put('/api/transactions/:id', (req, res) => {
  Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(transaction => res.json(transaction))
    .catch(err => console.error(err));
});

// Update a client by ID
app.put('/api/clients/:id', (req, res) => {
  Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(client => res.json(client))
    .catch(err => console.error(err));
});

// Delete a transaction by ID
app.delete('/api/transactions/:id', (req, res) => {
  Transaction.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => console.error(err));
});

// Delete a client by ID
app.delete('/api/clients/:id', (req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => console.error(err));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
// Schema for transactions with validation
const TransactionSchema = new Schema({
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }
  });
  
  // Example validation error handling
  newTransaction.save()
    .then(transaction => res.json(transaction))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(422).json(err.errors);
      } else {
        res.status(500).json({ error: 'Server error' });
      }
    });
    

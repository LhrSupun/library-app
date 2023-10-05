const express = require('express');
const connectDB = require('./config/database');
const books = require('./routes/api/books');
const cors = require('cors');
const app = express()
let port;

if (process.env.NODE_ENV === 'development') {
  port = 5000;
} else {
  port = 10000;
}

connectDB();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use('/api/books', books);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// gracefully shutdown
process.on('SIGINT', () => {
  console.log('Caught interrupt signal');
  process.exit();
});
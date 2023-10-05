const express = require('express');
const connectDB = require('./config/database,js');
const app = express()
let port;

if (process.env.NODE_ENV === 'development') {
  port = 5000;
} else {
  port = 10000;
}

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// gracefully shutdown
process.on('SIGINT', () => {
  console.log('Caught interrupt signal');
  process.exit();
});
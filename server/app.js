const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes/api/routes');
const cors = require('cors');
const app = express();
const path = require("path");
let port;

if (process.env.NODE_ENV === 'development') {
  port = 5000;
} else {
  port = 10000;
}

connectDB();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));


app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.use('/', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
  console.log(`Library app listening on port ${port}`)
})

// gracefully shutdown
process.on('SIGINT', () => {
  console.log('Caught interrupt signal');
  process.exit();
});
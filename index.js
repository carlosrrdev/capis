require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors')
const app = express();
const port = 3000;


const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100
})

const dummyData = {
  "name": "Carlos",
  "type": "admin",
  "message": "Success"
}

app.use(limiter)
app.use(cors({
  origin: "http://localhost:3000"
}))
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if(apiKey === process.env.API_KEY) {
    next()
  } else {
    res.status(403).send("Forbidden: Invalid API Key")
  }
})

app.use(express.json())

app.get('/', (req, res) => {
  res.send(dummyData);
});

app.listen(port, () => {
  console.log(`CAPIs is listening at http://localhost:${port}`);
});

module.exports = app;
const express = require('express');
const app = express();
const port = process.env.port || 3001;
const cors = require('cors');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');
require('dotenv').config();
const apiKey = process.env.API_KEY;
const client = yelp.client(apiKey);

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

function getRandomResult(results) {
  const random = Math.floor(Math.random() * results.length);
  const result = results[random];
  return JSON.stringify(result, null, 2);
}

app.post('/api', (req, res) => {
  console.table(req.body);

  client.search(req.body).then(response => {
    let results = response.jsonBody.businesses;

    let rating = req.body.rating;
    if (rating > 4.5) rating = 4.5; // Fudge results a little
    results = results.filter(result => result.rating >= rating);

    const result = getRandomResult(results);
    res.json(result);
  }).catch(e => {
    console.error(e);
  })
});

app.post('/reroll', (req, res) => {
  res.json({
    message: 'This endpoint is currently unavailable.'
  });
  return;

  // TODO: Send results (in addition to final pick) to user. On reroll, send results array back here for processing.
  let results = req.body.results;
  results = results.filter(result => result.id !== req.body.id);
  const result = getRandomResult(results);
  res.json(result);
});

module.exports = app;

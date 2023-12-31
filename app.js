const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const yelp = require('yelp-fusion');
const apiKey = 'oSldbNmG36meLbE645co-NNejWIAEuvVTexQKRgurlmHQNUYk1efTV9oPtqqIhvP73jYz_RZNdfyPmN5u14kXOPwoqm-ccgSCIJMDZq3aMaL807PDztU2BVCKrU0XXYx';
const client = yelp.client(apiKey);

app.use(cors());

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.get('/api', (req, res) => {
  client.search({
    location: 'san francisco',
  }).then(response => {
    res.json(response.jsonBody.businesses);
  }).catch(e => {
    console.error(e);
  })
});

module.exports = app;

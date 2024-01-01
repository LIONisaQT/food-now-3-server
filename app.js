const express = require('express');
const app = express();
const port = process.env.port || 3001;
const cors = require('cors');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');
const apiKey = 'oSldbNmG36meLbE645co-NNejWIAEuvVTexQKRgurlmHQNUYk1efTV9oPtqqIhvP73jYz_RZNdfyPmN5u14kXOPwoqm-ccgSCIJMDZq3aMaL807PDztU2BVCKrU0XXYx';
const client = yelp.client(apiKey);

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.post('/api', (req, res) => {
  client.search(req.body).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    res.json(prettyJson);
  }).catch(e => {
    console.error(e);
  })
});

module.exports = app;

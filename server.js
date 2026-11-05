
const express = require('express');
const { TikTokLiveConnector } = require('tiktok-live-connector');
const app = express();

 
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

let connector = null;
let score = 0;

app.post('/connect', async (req, res) => {
  const { username } = req.body;
  connector = new TikTokLiveConnector(username);
  connector.on('gift', (gift) => {
 score += gift.diamondCount;
  });
  connector.connect();
  res.send({status: 'connected'});
});

app.get('/score', (req, res) => {
  res.send({score: score});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```




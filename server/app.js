require('dotenv').config();
const express = require('express');
const fetchRedditMentions = require('./reddit');
const fetchTwitterMentions = require('./twitter');
const cors=require("cors")

const app = express();
const PORT = 3000;
app.use(cors());

app.get('/mentions', async (req, res) => {
  const { handle } = req.query;
  if (!handle) return res.status(400).send({ error: 'Missing handle' });

  try {
    const [redditMentions, twitterMentions] = await Promise.all([
      fetchRedditMentions(handle),
      fetchTwitterMentions(handle)
    ]);

    const result = [...redditMentions, ...twitterMentions];
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

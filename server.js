const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

const tokenFirstSeen = new Map();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const { timestamp, signature, events = [] } = req.body;

  if (!Array.isArray(events)) {
    console.error(`[${timestamp}] ❌ Invalid events format`, req.body);
    return res.status(400).send('Expected events array');
  }

  console.log(`📦 Received:`, JSON.stringify(req.body, null, 2));

  events.forEach(event => {
    if (event?.type === 'SWAP' && event.tokenTransfers?.length) {
      const boughtToken = event.tokenTransfers.find(t => t.action === 'INCREASE');
      if (boughtToken?.mint) {
        console.log(`[${timestamp}] 🟢 SWAP ${boughtToken.mint.slice(0, 4)}...`);
      }
    }
  });

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

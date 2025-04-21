const express = require('express');
const app = express();
app.use(express.json());

// Helius Webhook Endpoint
app.post('/webhook', (req, res) => {
  try {
    console.log('📦 Received:', {
      timestamp: new Date().toISOString(),
      signature: req.body?.signature,
      events: req.body?.events?.map(e => ({
        type: e.type,
        mint: e.mint || 'N/A'
      }))
    });

    // Add your sniper logic here
    if (req.body?.events?.some(e => e.type === 'SWAP')) {
      console.log('🚨 SWAP DETECTED!');
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).send('Error');
  }
});

// Health check
app.get('/', (req, res) => res.send('Webhook Online'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
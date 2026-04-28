const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// Create checkout session
router.post('/create-checkout-session', auth, async (req, res) => {
  const { amount, description } = req.body; // amount in cents

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: description || 'Nexus Payment',
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    // Save transaction
    const transaction = new Transaction({
      userId: req.user.id,
      amount: amount / 100, // convert to dollars
      stripeSessionId: session.id,
      description,
      status: 'Pending'
    });
    await transaction.save();

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await Transaction.findOneAndUpdate({ stripeSessionId: session.id }, { status: 'Completed' });
  }

  res.json({ received: true });
});

// Get transaction history
router.get('/history', auth, async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id }).sort({ timestamp: -1 });
  res.json(transactions);
});

module.exports = router;
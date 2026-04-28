import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'method not allowed' });
    }

    const { name, email } = req.body || {};

    try {
        const params = {
            ui_mode: 'embedded',
            mode: 'payment',
            line_items: [{ price: process.env.STRIPE_PRICE_ID_IGNITE, quantity: 1 }],
            metadata: {
                name: name || '',
                event: 'ohio-ignite',
                event_date: '2026-05-16',
                location: 'columbus-oh',
            },
            return_url: `${req.headers.origin}/thank-you/?session_id={CHECKOUT_SESSION_ID}`,
        };
        if (email) params.customer_email = email;
        const session = await stripe.checkout.sessions.create(params);

        res.status(200).json({ clientSecret: session.client_secret });
    } catch (err) {
        console.error('stripe session error:', err);
        res.status(500).json({ error: err.message });
    }
}

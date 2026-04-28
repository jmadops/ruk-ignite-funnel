// Returns public config values that the frontend needs.
// Only public keys live here (publishable key is safe in the browser).

export default function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.status(200).json({
        stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    });
}

# Ohio Ignite Funnel

Landing page and Stripe embedded checkout for Ohio Ignite — the 1-day Christian men's experience hosted by Coach Matt Monteverde, Saturday May 16 in the Columbus, OH area.

## Structure

```
.
├── ohio-ignite-lp/           # the landing page (HTML/CSS/assets)
├── shared/funnel.js          # frontend wiring — mounts Stripe Embedded Checkout
├── api/
│   ├── config.js             # returns public Stripe publishable key
│   └── create-checkout-session.js   # creates a Stripe checkout session
├── vercel.json               # rewrites: / and /ignite -> /ohio-ignite-lp/
└── package.json
```

## Required env vars (Vercel)

See `.env.example`. Three keys:

| Key | What |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret (server-side) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable (browser-safe) |
| `STRIPE_PRICE_ID_IGNITE` | Price ID for the $50 one-time charge |

## Local dev

```
npm install
vercel dev
```

Then visit `http://localhost:3000/ignite` (or `/`).

## Deploy

```
vercel --prod
```

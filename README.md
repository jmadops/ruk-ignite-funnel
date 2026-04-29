# Ohio Ignite Funnel

Landing page for Ohio Ignite — the 1-day Christian men's experience hosted by Coach Matt Monteverde, Saturday May 16 in the Columbus, OH area.

Checkout is handled externally by Ontraport (`https://go.riseupkings.com/ignitecheckout`). All CTAs on the LP point there.

## Structure

```
.
├── ohio-ignite-lp/   # the landing page (HTML/CSS/assets)
└── vercel.json       # rewrites: / and /ignite -> /ohio-ignite-lp/
```

## Tracking installed on the LP

- Meta Pixel (`810857032715875`) — `PageView` + `iglander` events
- Hyros universal script
- VWO SmartCode (account `894922`) — for split testing

## Deploy

Static site — Vercel auto-deploys from `main`.

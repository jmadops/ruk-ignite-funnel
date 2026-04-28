// ============================================
// IGNITE FUNNEL — frontend wiring
// Mounts Stripe Embedded Checkout on page load.
// Mirrors the KSP 2-day event funnel pattern.
//
// Usage: <script src="/shared/funnel.js" defer></script>
// Requires: <script src="https://js.stripe.com/v3/"></script>
// ============================================

(function () {
    'use strict';

    const EVENT_KEY = 'ohio-ignite';

    async function post(path, body) {
        try {
            const r = await fetch(path, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body || {}),
            });
            if (!r.ok) return null;
            return await r.json();
        } catch (e) {
            return null;
        }
    }

    async function mountStripe() {
        const mount = document.getElementById('checkout');
        if (!mount) return;

        const cfg = await (async () => {
            try { const r = await fetch('/api/config'); if (!r.ok) return null; return r.json(); }
            catch { return null; }
        })();
        const pk = cfg && cfg.stripePublishableKey;
        if (!pk) return;
        if (typeof Stripe !== 'function') {
            console.warn('[funnel] Stripe.js not loaded');
            return;
        }

        const stripe = Stripe(pk);
        const session = await post('/api/create-checkout-session', { event: EVENT_KEY });

        if (!session || !session.clientSecret) {
            mount.innerHTML = '<p style="color:#c2a859;text-align:center;padding:20px;">Could not load checkout. Please refresh or email support@riseupkings.com.</p>';
            return;
        }

        mount.innerHTML = '';
        try {
            const checkout = await stripe.initEmbeddedCheckout({
                clientSecret: session.clientSecret,
            });
            checkout.mount('#checkout');
        } catch (err) {
            console.error('[funnel] Stripe mount error:', err);
            mount.innerHTML = '<p style="color:#c2a859;text-align:center;padding:20px;">Could not load checkout. Please refresh.</p>';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountStripe);
    } else {
        mountStripe();
    }
})();

# Setup & handover

Everything that still needs real values lives in one file:
**`src/app/core/site-config.ts`**. Nothing else needs editing to go live.

---

## 1. Paystack

### Public key

Paystack dashboard → **Developers → API Keys & Webhooks** → copy the
**public key**.

```ts
paystack: {
  publicKey: 'pk_test_xxxxxxxxxxxxxxxxx',   // use pk_test_ first
```

The public key is safe in the browser bundle. **Never put the secret key
in this project** — it would ship to every visitor.

Until a key is set, the donate and shop pages stay usable and show a
"card payment is being connected, please use bank transfer" notice.

### Recurring donation plans

A Paystack Plan has a **fixed amount**, so recurring giving is offered as
tiers. For each amount below, create a Plan in
**Recurring → Plans** with the matching interval and amount, then paste
its `PLN_...` code beside it.

| Frequency | Amounts to create |
|-----------|-------------------|
| Weekly    | ₦1,000 · ₦2,500 · ₦5,000 |
| Monthly   | ₦2,000 · ₦5,000 · ₦10,000 · ₦25,000 |
| Yearly    | ₦25,000 · ₦50,000 · ₦100,000 |

```ts
monthly: [
  { amount: 2000,  code: 'PLN_abc123' },
  { amount: 5000,  code: '' },          // empty = hidden from the site
```

Tiers with an empty code are simply not shown, so you can launch with
only the plans you have created. A frequency with no codes at all shows
a "not switched on yet" notice instead of a broken button.

**One-off giving needs no plans** — donors can enter any amount.

> The existing payment pages *"Subscription only"* and *"Smart watch +
> subscription"* are separate app products. The donate page does not use
> them.

---

## 2. Images to add

Drop these into `public/images/` using **exactly** these names and they
appear automatically. Missing files fall back to a placeholder rather
than a broken image, so nothing looks wrong while you gather them.

| File | What it is |
|------|-----------|
| `team/victoria.jpg` | Victoria Chidinma Chukwu portrait |
| `team/joyce.jpg` | Joyce Ugochinyere Anyanwu portrait |
| `team/damilare.jpg` | Olagunju Damilare Elijah portrait |
| `products/smart-watch.jpg` | Blue watch on the stand (main shot) |
| `products/smart-watch-colours.jpg` | Tray photo, pink + blue stock |
| `launch-flyer.jpg` | The app launch flyer |

`qr-install.png` is already in place — extracted from
`Smart Response QR CODE (2).pdf`.

For a portrait added later, also set its `photo:` path in
`src/app/data/trustees.ts`. For the flyer, set `launch.flyer` in
`site-config.ts`.

---

## 3. Still missing

- **Phone number** — `contact.phone` is still `+234 XXX XXX XXXX`.
- **Web app URL** — `links.appDownload` is empty, so the "Install the web
  app" button is hidden. This should be whatever the install QR points to.
- **Donald** — photo and short bio, then add him to
  `src/app/data/trustees.ts`.
- **Smart watch specs** — the feature list was written from the SOS /
  anti-kidnapping / GPS description. Verify before launch.
- **Terms & Privacy** — solid drafts, but have a Nigerian lawyer review
  them.

---

## 4. Running it

```bash
npm install
npm start           # http://localhost:4200
npm run build       # production build
npx ng test --watch=false
```

---

## 5. Deploying to Vercel

`vercel.json` is already configured:

- Build command `npm run build`
- Output directory `dist/smartresponse-ngo/browser`
- A rewrite sending all routes to `index.html`

**That rewrite matters.** Without it, only the home page works — going
straight to `/donate` or refreshing on `/blog/why-dignity-matters` would
return a 404, because Angular handles routing in the browser.

After the first deploy, add the custom domain in
**Vercel → Project → Settings → Domains** and point the registrar's DNS
at Vercel.

---

## 6. Currencies

The four GTB accounts (NGN / USD / EUR / GBP) are shown for direct
transfer. Paystack card checkout charges in **NGN** unless multicurrency
is enabled on the account, so USD/EUR/GBP are transfer-only for now.

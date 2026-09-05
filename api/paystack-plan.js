/**
 * Returns a Paystack Plan code for a given amount + interval, creating the
 * plan the first time that combination is asked for.
 *
 * Paystack Plans carry a fixed amount, so free-choice recurring giving is
 * only possible if plans can be minted on demand. That needs the SECRET key,
 * which must never reach the browser — hence this function.
 *
 * Requires the PAYSTACK_SECRET_KEY environment variable in Vercel.
 */

const PAYSTACK = 'https://api.paystack.co';

/** Site frequency -> Paystack interval. */
const INTERVALS = {
  weekly: 'weekly',
  monthly: 'monthly',
  yearly: 'annually'
};

const MIN_NAIRA = 100;
const MAX_NAIRA = 10000000;

module.exports = async function handler(request, response) {

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret) {
    return response.status(500).json({
      error: 'Recurring giving is not configured yet.'
    });
  }

  const body = typeof request.body === 'string'
    ? safeParse(request.body)
    : request.body || {};

  const amount = Number(body.amount);
  const interval = INTERVALS[body.frequency];

  if (!interval) {
    return response.status(400).json({ error: 'Unknown giving frequency.' });
  }

  if (!Number.isInteger(amount) || amount < MIN_NAIRA || amount > MAX_NAIRA) {
    return response.status(400).json({ error: 'Amount is out of range.' });
  }

  const kobo = amount * 100;

  const auth = {
    Authorization: `Bearer ${secret}`,
    'Content-Type': 'application/json'
  };

  try {
    // Reuse an existing plan for this amount + interval where one exists,
    // so repeat donors do not create duplicate plans.
    const lookup = await fetch(
      `${PAYSTACK}/plan?interval=${interval}&amount=${kobo}&perPage=50`,
      { headers: auth }
    );

    const existing = await lookup.json();

    if (lookup.ok && Array.isArray(existing.data)) {
      const match = existing.data.find(
        plan => plan.amount === kobo && plan.interval === interval
      );

      if (match) {
        return response.status(200).json({ plan: match.plan_code });
      }
    }

    const created = await fetch(`${PAYSTACK}/plan`, {
      method: 'POST',
      headers: auth,
      body: JSON.stringify({
        name: `Save Her Dignity — ${labelFor(interval)} ₦${amount}`,
        amount: kobo,
        interval,
        currency: 'NGN'
      })
    });

    const plan = await created.json();

    if (!created.ok || !plan.data || !plan.data.plan_code) {
      return response.status(502).json({
        error: plan.message || 'Could not set up the recurring gift.'
      });
    }

    return response.status(200).json({ plan: plan.data.plan_code });

  } catch {
    return response.status(502).json({
      error: 'Could not reach Paystack. Please try again.'
    });
  }
};

function labelFor(interval) {
  return interval === 'annually' ? 'yearly' : interval;
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

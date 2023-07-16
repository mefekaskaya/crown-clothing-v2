import { loadStripe } from '@stripe/stripe-js';

// eslint-disable-next-line no-undef
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

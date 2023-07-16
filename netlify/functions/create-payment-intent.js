require('dotenv').config();
// eslint-disable-next-line no-undef
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// eslint-disable-next-line no-undef
exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);
        const payload = {
            amount,
            currency: 'usd',
            payment_method_types: ['card']
        };
        const paymentIntent = await stripe.paymentIntents.creete(payload);
        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent })
        };
    } catch (error) {
        console.log({ error });
        return {
            statusCode: 400,
            body: JSON.stringify({ error })
        };
    }
};

import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

const PRICE_IDS = {
    pro: "price_1Tl4QjHhkzS0Vh7VFMSjCF2Q",
    premium: "price_1Tl8DpHhkzS0Vh7Vg90xPunI",
}

const PLAN_PRICES = {
    pro: 9.99,
    premium: 19.99,
}

export async function POST(req) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')


        const userSession = await auth.api.getSession({
            headers: await headers()
        })

        const user = userSession?.user;
        const formData = await req.formData();
        const plan = formData.get('plan');
        const purchaseDate = formData.get('purchaseDate');

        const PRICE_ID = PRICE_IDS[plan];

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                plan,
                priceID: PRICE_ID,
                price: PLAN_PRICES[plan],
                userID: user?.id,
                userEmail: user?.email,
                userName: user?.name,
                paymentType: 'subscription',
                purchaseDate,
            },
            mode: 'subscription',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}
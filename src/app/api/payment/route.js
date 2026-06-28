import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const userSession = await auth.api.getSession({
            headers: await headers()
        })

        const user = userSession?.user;
        const formData = await request.formData();
        const price = formData.get('price');
        const title = formData.get('title');
        const productId = formData.get('productId');
        const artist = formData.get('artist');
        const artistId = formData.get('artistId');
        const image = formData.get('image')
        const purchaseDate = formData.get('purchaseDate');
        

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: Number(price) * 100,
                        product_data: {
                            name: title,
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                price: Number(price),
                userID: user?.id,
                userEmail: user?.email,
                userName: user?.name,
                paymentType: 'purchase',
                title,
                productId,
                artist,
                artistId,
                image,
                purchaseDate,
            },
            mode: 'payment',
            success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { subscription } from '@/lib/actions/payment'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)')
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    const status = session?.status
    const metadata = session?.metadata || {}
    const customerEmail = session?.customer_details?.email
    // Get the line items to show what they actually bought
    const lineItems = session?.line_items?.data || []

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        await subscription({ ...metadata, sessionId: session_id })

        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center transition-all">

                    {/* Success Icon */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-6">
                        <svg
                            className="h-10 w-10 text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                        Payment Successful!
                    </h1>
                    <p className="text-slate-500 text-sm mb-6">
                        Thank you for your payment. Your order has been processed.
                    </p>

                    {/* Order Summary Box */}
                    <div className="bg-slate-50 rounded-xl p-5 text-left border border-slate-100 mb-8 space-y-4">
                        <div>
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                                Sent To
                            </span>
                            <span className="text-sm font-medium text-slate-800 break-all">
                                {customerEmail || 'Your registered email'}
                            </span>
                        </div>

                        {lineItems.length > 0 && (
                            <div className="border-t border-slate-200/60 pt-3">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                                    Items Purchased
                                </span>
                                <ul className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                                    {lineItems.map((item) => (
                                        <li key={item.id} className="text-sm text-slate-700 flex justify-between items-center">
                                            <span className="truncate mr-2 font-medium">
                                                {item.description}
                                            </span>
                                            {/* <span className="text-xs text-slate-500 shrink-0">
                                                Qty: {item.quantity}
                                            </span> */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Helpful Notice */}
                    <p className="text-xs text-slate-400 mb-8 leading-relaxed">
                        A confirmation email is on its way. Have questions? Reach out anytime at{' '}
                        <a href="mailto:orders@example.com" className="text-indigo-600 hover:text-indigo-500 font-medium underline underline-offset-2">
                            orders@example.com
                        </a>.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/"
                            className="flex-1 justify-center inline-flex items-center px-5 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-colors duration-150"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    // Modern Fallback UI
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center border border-slate-100">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-50 mb-4">
                    <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
                <p className="text-sm text-slate-500 mb-6">We couldn't verify this checkout session. Please try again or check your account status.</p>
                <Link href="/" className="inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    &larr; Go Back
                </Link>
            </div>
        </main>
    )
}
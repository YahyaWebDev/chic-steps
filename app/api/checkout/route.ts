import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  maxNetworkRetries: 2
})

interface CartItem {
  productId: string;
  size: string;
  quantity: number;
  price?: number; 
  name?: string;  
}

export async function POST(request: Request) {
  try {
    const { items, userId, userEmail }: { items: CartItem[], userId: string, userEmail: string } = await request.json();

    // Explicitly type the map callback
    const line_items = items.map((item: CartItem) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name || `Product ${item.productId}`,
            metadata: {
              productId: item.productId,
              size: item.size
            }
          },
          unit_amount: item.price ? Math.round(item.price * 100) : 1000, 
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      customer_email: userEmail,
    });

    return NextResponse.json({ sessionId: session.id });

  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json(
      { error: 'Payment failed', details: err instanceof Error ? err.message : '' },
      { status: 500 }
    );
  }
}
'use client';
import { useUser } from '@clerk/nextjs';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
  const { isLoaded, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<{
    productId: string;
    size: string;
    quantity: number;
  }[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (err) {
        console.error('Error parsing cart', err);
      }
    }
  }, []);

 const handleCheckout = async () => {
  if (!user) {
    alert('Please sign in to checkout')
    return
  }
  if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

  setLoading(true)

  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cart,
        userId: user.id,
        userEmail: user.primaryEmailAddress?.emailAddress,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Payment failed')
    }

    const { sessionId } = await response.json()
    const stripe = await stripePromise
    
    if (!stripe) throw new Error('Stripe initialization failed')
    
    const { error } = await stripe.redirectToCheckout({ sessionId })
    
    if (error) throw error

  } catch (err) {
    console.error('Checkout error:', err)
    alert(`Payment failed: ${err instanceof Error ? err.message : 'Please try again'}`)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-6 text-white">Complete Your Purchase</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map((item, index) => (
                <div key={`${item.productId}-${index}`} className="border-b pb-4">
                  <p>Product ID: {item.productId}</p>
                  <p>Size: {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
              className={`w-full py-3 rounded-lg font-bold transition-colors ${
                loading || cart.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? 'Processing...' : 'Pay with Stripe'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
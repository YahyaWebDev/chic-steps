'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

// Wrap the content that uses searchParams in a separate component
function SuccessContent() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [orderId, setOrderId] = useState<string | null>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId && user) {
      // Clear cart and create order
      localStorage.removeItem('cart');
      
      // Create order in database
      fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          sessionId, 
          userId: user.id 
        }),
      })
      .then(res => res.json())
      .then(data => setOrderId(data.orderId))
      .catch(console.error);
    }
  }, [sessionId, user]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-6">Thank you for your purchase.</p>
      {orderId && <p>Order ID: {orderId}</p>}
      <p className="mt-4">
        A receipt has been sent to your email.
      </p>
    </div>
  );
}

// Main page component with Suspense boundary
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-4 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

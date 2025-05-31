// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import Stripe from 'stripe';

// Initialize clients
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Type Definitions
interface OrderRequest {
  sessionId: string;
  userId: string;
}

interface OrderItem {
  product: {
    name: string;
  };
  size: string;
  price: number;
  quantity: number;
}

interface OrderWithItems {
  id: string;
  items: OrderItem[];
  total: number;
  user: {
    email: string;
  };
}

export async function POST(request: Request) {
  try {
    // Validate request
    const { sessionId, userId }: OrderRequest = await request.json();
    if (!sessionId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    // Create order in database with proper typing
    const order = await prisma.order.create({
      data: {
        userId,
        total: (session.amount_total || 0) / 100,
        paymentId: session.payment_intent as string,
        status: 'completed',
        items: {
          create: lineItems.data.map(item => {
            // Extract size from metadata or description
            const size = item.description?.match(/Size: (US \d+)/)?.[1] || 'One Size';
            
            return {
              productId: item.price?.product as string,
              quantity: item.quantity || 1,
              price: (item.price?.unit_amount || 0) / 100,
              size: size
            };
          })
        }
      },
      include: {
        user: {
          select: {
            email: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true
              }
            }
          }
        }
      }
    }) as unknown as OrderWithItems;

    // Generate type-safe email content
    const emailHtml = generateOrderConfirmationEmail(order);

    // Send confirmation email
    await resend.emails.send({
      from: 'orders@yourdomain.com',
      to: order.user.email,
      subject: `Order Confirmation #${order.id}`,
      html: emailHtml
    });

    return NextResponse.json({ 
      success: true,
      orderId: order.id 
    });

  } catch (error: unknown) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { 
        error: 'Error processing order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function for email generation
function generateOrderConfirmationEmail(order: OrderWithItems): string {
  return `
    <h1>Thank you for your order!</h1>
    <p>Order ID: ${order.id}</p>
    <h2>Items:</h2>
    <ul>
      ${order.items.map(item => `
        <li>
          ${item.product.name} - Size: ${item.size} - 
          $${item.price.toFixed(2)} x ${item.quantity}
        </li>
      `).join('')}
    </ul>
    <p>Total: $${order.total.toFixed(2)}</p>
    <p>We'll notify you when your items ship.</p>
  `;
}
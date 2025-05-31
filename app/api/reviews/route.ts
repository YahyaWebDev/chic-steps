import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(reviews)
}

export async function POST(request: Request) {
  const { name, email, rating, comment } = await request.json()
  
  const newReview = await prisma.review.create({
    data: {
      name,
      email,
      rating,
      comment
    }
  })
  
  return NextResponse.json(
    { message: 'Thank you for your review!' },
    { status: 201 }
  )
}
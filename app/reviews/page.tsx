"use client";

import { useState } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Alex Johnson',
      rating: 5,
      comment: 'The most comfortable shoes I\'ve ever worn!'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      rating: 4,
      comment: 'Great style and quality. Would buy again.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      rating: 5,
      comment: 'Perfect fit and excellent customer service.'
    }
  ]);

  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this to your backend
    const newReview = {
      id: reviews.length + 1,
      name,
      rating,
      comment
    };
    
    // Normally you would update state here, but we're not showing the new review
    // setReviews([...reviews, newReview]);
    
    // Clear form and show thank you message
    setName('');
    setRating(5);
    setComment('');
    setSubmitted(true);
    
    // Hide thank you message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Chic Steps Customer Reviews</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What Our Customers Say</h2>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="font-medium">{review.name}</div>
                  <div className="ml-2 text-yellow-500">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">Add Your Review</h2>
        
        {submitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Thank you for your review! We appreciate your feedback.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="rating" className="block mb-1 font-medium">Rating</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="px-3 py-2 border rounded-md"
                required
              >
                <option className='text-yellow-400' value="5">5 ★</option>
                <option className='text-yellow-400' value="4">4 ★</option>
                <option className='text-yellow-400' value="3">3 ★</option>
                <option className='text-yellow-400' value="2">2 ★</option>
                <option className='text-yellow-400' value="1">1 ★</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="comment" className="block mb-1 font-medium">Your Review</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
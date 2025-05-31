// app/products/page.tsx
'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
};
type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};

const products: Product[] = [
  {
    id: '1',
    name: 'Nike Vomero 18',
    price: 155,
    description: 'Women Road Running Shoes',
    image: '/images/W-NIKE-VOMERO.avif',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
  },
  {
    id: '2',
    name: 'Nike Air Force 1 Flyknit 2.0',
    price: 119.99,
    description: 'men class shoe',
    image: '/images/AIR+FORCE+1+FLYKNIT+2.0.avif',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
  },
  {
    id: '3',
    name: 'Nike C1TY "Sand"',
    price: 105,
    description: 'lifestyle shoe',
    image: '/images/NIKE+C1TY.avif',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
  },
  {
    id: '4',
    name: 'Air Jordan 3 Retro "Rare Air"',
    price: 210,
    description: 'lifestyle shoe',
    image: '/images/AIR+JORDAN+3+RETRO+OG.avif',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
  },
  {
    id: '5',
    name: 'Nike Air Pegasus Wave',
    price: 170,
    description: 'Men shoes',
    image: '/images/NIKE+AIR+PEGASUS+WAVE.avif',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
  },
  {
    id: '6',
    name: 'Nike Metcon 9 AMP',
    price: 99.99,
    description: 'Women Road Running Shoes',
    image: '/images/M+NIKE+METCON+9+AMP.avif',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
  },
  
];

export default function ProductsPage() {
  const { user } = useUser();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = () => {
    if (!selectedProduct || !selectedSize) {
      alert('Please select a product and size');
      return;
    }

    const newItem: CartItem = {
      productId: selectedProduct.id,
      size: selectedSize,
      quantity: quantity
    };

    const updatedCart = [...cart, newItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    setSelectedProduct(null);
    setSelectedSize(null);
    setQuantity(1);
    alert('Item added to cart!');
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Our Products</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowCart(true)}
            className="relative px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          {!user && (
            <Link href="/sign-in" className="px-4 py-2 bg-gray-200 rounded">
              Sign In
            </Link>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div 
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Selection Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-black">{selectedProduct.name}</h2>
            <div className="mb-4">
              <label className="block mb-2 text-black">Select Size:</label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size ? 'bg-blue-500 text-black' : 'text-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4 text-black">
              <label className="block mb-2">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="border p-2 w-20"
              />
            </div>
            <button
              onClick={addToCart}
              disabled={!selectedSize}
              className={`w-full py-2 rounded ${
                selectedSize ? 'bg-green-500 cursor-pointer' : 'bg-blue-500 cursor-pointer'
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="w-full mt-2 py-2 bg-red-600 cursor-pointer rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => {
                  const product = products.find(p => p.id === item.productId);
                  return (
                    <div key={index} className="border-b pb-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-bold">{product?.name}</p>
                          <p>Size: {item.size}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ${product ? (product.price * item.quantity).toFixed(2) : '0.00'}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setShowCart(false)}
                className="px-4 py-2 bg-blue-500 rounded cursor-pointer"
              >
                Continue Shopping
              </button>
              {cart.length > 0 && (
                <Link 
                  href="/payment" 
                  onClick={() => setShowCart(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Proceed to Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
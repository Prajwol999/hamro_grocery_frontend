import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartPage from '../pages/CartPage';

describe('CartPage Component', () => {
  const mockCartContext = {
    cartItems: [],
    updateQuantity: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
  };

  test('shows "Your cart is empty" when cart is empty', () => {
    render(
      <CartContext.Provider value={{ ...mockCartContext, cartItems: [] }}>
        <BrowserRouter><CartPage /></BrowserRouter>
      </CartContext.Provider>
    );
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('renders cart items when not empty', () => {
    const items = [{ _id: '1', name: 'Banana', price: 50, quantity: 2, imageUrl: 'banana.jpg' }];
    render(
      <CartContext.Provider value={{ ...mockCartContext, cartItems: items }}>
        <BrowserRouter><CartPage /></BrowserRouter>
      </CartContext.Provider>
    );
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('₹50')).toBeInTheDocument();
  });

  test('calculates and displays the correct total', () => {
    const items = [
      { _id: '1', name: 'Banana', price: 50, quantity: 2, imageUrl: 'banana.jpg' },
      { _id: '2', name: 'Apple', price: 100, quantity: 1, imageUrl: 'apple.jpg' }
    ];
    render(
      <CartContext.Provider value={{ ...mockCartContext, cartItems: items }}>
        <BrowserRouter><CartPage /></BrowserRouter>
      </CartContext.Provider>
    );
    expect(screen.getByText('₹200.00')).toBeInTheDocument(); // Subtotal
    expect(screen.getByText('₹250.00')).toBeInTheDocument(); // Total
  });

  test('displays "Proceed to Checkout" button when cart has items', () => {
    const items = [{ _id: '1', name: 'Banana', price: 50, quantity: 2, imageUrl: 'banana.jpg' }];
    render(
      <CartContext.Provider value={{ ...mockCartContext, cartItems: items }}>
        <BrowserRouter><CartPage /></BrowserRouter>
      </CartContext.Provider>
    );
    expect(screen.getByRole('link', { name: /proceed to checkout/i })).toBeInTheDocument();
  });
  
  test('displays "Start Shopping" button when cart is empty', () => {
    render(
      <CartContext.Provider value={{ ...mockCartContext, cartItems: [] }}>
        <BrowserRouter><CartPage /></BrowserRouter>
      </CartContext.Provider>
    );
    expect(screen.getByRole('link', { name: /start shopping/i })).toBeInTheDocument();
  });
});
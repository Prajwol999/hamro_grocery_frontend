import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../auth/AuthContext';

describe('Navbar Component', () => {
  const mockLogout = vi.fn();

  test('renders logo and navigation links', () => {
    render(
      <AuthContext.Provider value={{ user: null }}>
        <BrowserRouter><Navbar /></BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByAltText('Grocery Logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
  });

  test('shows Login button when user is not authenticated', () => {
    render(
      <AuthContext.Provider value={{ user: null }}>
        <BrowserRouter><Navbar /></BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  test('shows user name and Logout button when authenticated', () => {
    const fakeUser = { fullName: 'Dipen' };
    render(
      <AuthContext.Provider value={{ user: fakeUser, logout: mockLogout }}>
        <BrowserRouter><Navbar /></BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText(/welcome, dipen/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('calls logout function on click', () => {
    const fakeUser = { fullName: 'Dipen' };
    render(
      <AuthContext.Provider value={{ user: fakeUser, logout: mockLogout }}>
        <BrowserRouter><Navbar /></BrowserRouter>
      </AuthContext.Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
  
  test('scrolls to section on nav link click', () => {
    const mockScrollIntoView = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    });
    
    render(
      <AuthContext.Provider value={{ user: null }}>
        <BrowserRouter><Navbar /></BrowserRouter>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /products/i }));
    expect(document.getElementById).toHaveBeenCalledWith('featured-products');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});

describe('Footer Component', () => {
  test('renders the logo and description', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>);
    expect(screen.getByAltText('Hamro Grocery Logo')).toBeInTheDocument();
    expect(screen.getByText(/Your daily dose of freshness/i)).toBeInTheDocument();
  });

  test('renders "Quick Links" section', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  test('renders "Contact Us" section', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText(/hamrogrocery10@gmail.com/i)).toBeInTheDocument();
  });

  test('renders the copyright information', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>);
    expect(screen.getByText(/© \d{4} Hamro Grocery. All Rights Reserved./i)).toBeInTheDocument();
  });
});
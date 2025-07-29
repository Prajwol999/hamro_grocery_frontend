import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../components/auth/LoginPage';
import { SignupPage } from '../components/auth/SignupPage';
import { AuthContext } from '../auth/AuthContext';

// Mock custom hooks and toast
const mockLogin = vi.fn();
const mockRegister = vi.fn();
vi.mock('../hooks/useLoginUser', () => ({
  useLoginUser: () => ({ login: mockLogin, isLoading: false }),
}));
vi.mock('../hooks/useRegisterUser', () => ({
  useRegisterUser: () => ({ mutate: mockRegister, isLoading: false }),
}));
vi.mock('react-toastify', () => ({ toast: { error: vi.fn(), success: vi.fn() } }));
import { toast } from 'react-toastify';

const renderWithContext = (component) => {
  return render(
    <AuthContext.Provider value={{ user: null, logout: vi.fn() }}>
      <BrowserRouter>{component}</BrowserRouter>
    </AuthContext.Provider>
  );
};

describe('LoginPage Component', () => {
  beforeEach(() => { vi.clearAllMocks() });

  test('renders login form correctly', () => {
    renderWithContext(<LoginPage />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('allows user to type in fields', () => {
    renderWithContext(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@test.com' } });
    expect(screen.getByLabelText(/email address/i).value).toBe('test@test.com');
  });

  test('shows error toast on empty submission', async () => {
    renderWithContext(<LoginPage />);
    const form = screen.getByRole('button', { name: /login/i }).closest('form');
    await act(async () => { fireEvent.submit(form); });
    expect(toast.error).toHaveBeenCalledWith('Please enter both email and password.');
  });

  test('calls login hook on valid submission', async () => {
    renderWithContext(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    const form = screen.getByRole('button', { name: /login/i }).closest('form');
    await act(async () => { fireEvent.submit(form); });
    expect(mockLogin).toHaveBeenCalled();
  });
});

describe('SignupPage Component', () => {
  beforeEach(() => { vi.clearAllMocks() });

  test('renders signup form correctly', () => {
    renderWithContext(<SignupPage />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /i agree to the/i })).toBeInTheDocument();
  });

  test('shows error toast for empty fields on submission', async () => {
    renderWithContext(<SignupPage />);
    const form = screen.getByRole('button', { name: /create account/i }).closest('form');
    await act(async () => { fireEvent.submit(form); });
    expect(toast.error).toHaveBeenCalledWith('Please fill in all fields.');
  });

  test('shows error toast if terms are not agreed to', async () => {
    renderWithContext(<SignupPage />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass' } });
    const form = screen.getByRole('button', { name: /create account/i }).closest('form');
    await act(async () => { fireEvent.submit(form); });
    expect(toast.error).toHaveBeenCalledWith('You must agree to the Terms and Conditions to sign up.');
  });

  test('calls register hook on valid submission', async () => {
    renderWithContext(<SignupPage />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('checkbox'));
    const form = screen.getByRole('button', { name: /create account/i }).closest('form');
    await act(async () => { fireEvent.submit(form); });
    expect(mockRegister).toHaveBeenCalled();
  });
});
import React from 'react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignInPage from './page';

describe('SignInPage', () => {
  beforeAll(() => {
    vi.mock('next/navigation', () => ({
      useRouter: vi.fn,
      useSearchParams: vi.fn(() => ({
        get: vi.fn(),
      })),
    }));
  });

  it('should render correctly', async () => {
    render(<SignInPage />);

    expect(screen.getByTestId('login-form')).toBeDefined();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});

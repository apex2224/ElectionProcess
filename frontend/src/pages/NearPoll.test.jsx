import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NearPoll from './NearPoll';

// Mock fetch for Nominatim
const mockSuggestions = [
  {
    display_name: "New Delhi, Delhi, India",
    lat: "28.6139",
    lon: "77.2090"
  }
];

describe('NearPoll Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuggestions),
      })
    ));
  });

  it('renders the search input', () => {
    render(<NearPoll />);
    expect(screen.getByPlaceholderText(/Enter your Pincode, City or Locality/i)).toBeInTheDocument();
  });

  it('shows suggestions when typing', async () => {
    render(<NearPoll />);
    const input = screen.getByPlaceholderText(/Enter your Pincode, City or Locality/i);
    
    fireEvent.change(input, { target: { value: 'New Delhi' } });

    await waitFor(() => {
      expect(screen.getByText(/New Delhi, Delhi, India/i)).toBeInTheDocument();
    }, { timeout: 2000 }); // Account for debounce
  });

  it('displays booth list and map after selecting a location', async () => {
    const { container } = render(<NearPoll />);
    const input = screen.getByPlaceholderText(/Enter your Pincode, City or Locality/i);
    
    fireEvent.change(input, { target: { value: 'New Delhi' } });

    const suggestion = await screen.findByText(/New Delhi, Delhi, India/i);
    fireEvent.click(suggestion);

    expect(screen.getByText(/Nearby Stations/i)).toBeInTheDocument();
    expect(screen.getByText(/Govt. Senior Secondary School/i)).toBeInTheDocument();
    
    // Check if map iframe exists
    const map = container.querySelector('iframe');
    expect(map).toBeInTheDocument();
    expect(map.src).toContain('maps.google.com');
  });
});

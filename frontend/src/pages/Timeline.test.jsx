import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Timeline from './Timeline';

const mockTimelineData = {
  title: "18th Lok Sabha Elections",
  subtitle: "2024 General Elections",
  events: [
    {
      date: "19 April 2024",
      icon: "how_to_vote",
      title: "Phase 1 Begins",
      desc: "Voting commenced across 102 constituencies in 21 states and union territories."
    },
    {
      date: "04 June 2024",
      icon: "analytics",
      title: "Counting Day",
      desc: "The Election Commission of India declared the results for all 543 Lok Sabha seats."
    }
  ]
};

describe('Timeline Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTimelineData),
      })
    ));
  });

  it('renders the timeline header', () => {
    render(<Timeline />);
    expect(screen.getByText(/Electoral/i)).toBeInTheDocument();
    expect(screen.getByText(/Continuum/i)).toBeInTheDocument();
  });

  it('fetches and displays timeline events', async () => {
    render(<Timeline />);
    await waitFor(() => {
      expect(screen.getByText(mockTimelineData.title)).toBeInTheDocument();
    });
    expect(screen.getByText(mockTimelineData.events[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockTimelineData.events[1].title)).toBeInTheDocument();
  });

  it('updates selection and triggers new fetch', async () => {
    render(<Timeline />);
    await waitFor(() => screen.getByText(mockTimelineData.title));

    const regionSelect = screen.getByDisplayValue(/National/i);
    fireEvent.change(regionSelect, { target: { value: 'Maharashtra' } });
    
    const yearSelect = screen.getByDisplayValue('2024');
    fireEvent.change(yearSelect, { target: { value: '2019' } });

    const analyzeBtn = screen.getByRole('button', { name: /Analyze/i });
    fireEvent.click(analyzeBtn);

    expect(fetch).toHaveBeenCalled();
  });
});

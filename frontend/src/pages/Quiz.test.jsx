import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Quiz from './Quiz';

// Mock firebase
vi.mock('../firebase', () => ({
  logAnalyticsEvent: vi.fn(),
}));

// Mock fetch
const mockQuizData = {
  question: "What is the minimum age to vote in India?",
  options: ["A: 16", "B: 18", "C: 21", "D: 25"],
  correctAnswer: "B: 18",
  explanation: "The voting age was lowered from 21 to 18 by the 61st Amendment Act, 1988."
};

describe('Quiz Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockQuizData),
      })
    ));
  });

  it('renders the quiz header', () => {
    render(<Quiz />);
    expect(screen.getByText(/Sovereign/i)).toBeInTheDocument();
    expect(screen.getByText(/Intelligence Quiz/i)).toBeInTheDocument();
  });

  it('fetches and displays a question', async () => {
    render(<Quiz />);
    await waitFor(() => {
      expect(screen.getByText(mockQuizData.question)).toBeInTheDocument();
    });
    mockQuizData.options.forEach(opt => {
      // The component splits the option string opt.substring(3)
      expect(screen.getByText(opt.substring(3))).toBeInTheDocument();
    });
  });

  it('allows selecting an answer and checking it', async () => {
    render(<Quiz />);
    await waitFor(() => screen.getByText(mockQuizData.question));

    const correctOption = screen.getByText(mockQuizData.options[1].substring(3));
    fireEvent.click(correctOption);

    const checkBtn = screen.getByRole('button', { name: /Check Answer/i });
    fireEvent.click(checkBtn);

    await waitFor(() => {
      expect(screen.getByText(/Analysis:/i)).toBeInTheDocument();
      expect(screen.getByText(mockQuizData.explanation)).toBeInTheDocument();
    });
  });

  it('opens report modal when clicking report button', async () => {
    render(<Quiz />);
    const reportBtn = screen.getByRole('button', { name: /Report Question/i });
    fireEvent.click(reportBtn);

    expect(screen.getByText(/Question Reported/i)).toBeInTheDocument();
    
    // Both the icon and the text button have "close" in their accessible name
    const closeBtns = screen.getAllByRole('button', { name: /Close/i });
    fireEvent.click(closeBtns[0]);
    
    expect(screen.queryByText(/Question Reported/i)).not.toBeInTheDocument();
  });
});

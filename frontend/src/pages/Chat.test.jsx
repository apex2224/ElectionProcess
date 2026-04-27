import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Chat from './Chat';
import { logAnalyticsEvent } from '../firebase';

// Mock firebase
vi.mock('../firebase', () => ({
  logAnalyticsEvent: vi.fn(),
}));

const mockChatReply = {
  reply: "The voting process in India involves several steps, starting from voter registration to casting the vote at a polling booth using an EVM."
};

describe('Chat Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockChatReply),
      })
    ));
  });

  it('renders the initial AI greeting', () => {
    render(<Chat />);
    expect(screen.getByText(/ElectionIQ Intelligence Engine/i)).toBeInTheDocument();
  });

  it('allows user to send a message and receive AI reply', async () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText(/Query the intelligence engine/i);
    const sendBtn = screen.getByLabelText(/Send message to AI assistant/i);

    fireEvent.change(input, { target: { value: 'How do I vote?' } });
    fireEvent.click(sendBtn);

    // Check user message
    expect(screen.getByText('How do I vote?')).toBeInTheDocument();
    expect(logAnalyticsEvent).toHaveBeenCalledWith('chat_message_sent', expect.any(Object));

    // Check AI response
    await waitFor(() => {
      expect(screen.getByText(mockChatReply.reply)).toBeInTheDocument();
    });
  });

  it('allows deleting a message', async () => {
    render(<Chat />);
    const greeting = screen.getByText(/ElectionIQ Intelligence Engine/i);
    expect(greeting).toBeInTheDocument();

    // There might be multiple delete buttons if there are multiple messages
    const deleteBtns = screen.getAllByLabelText(/Delete this message/i);
    fireEvent.click(deleteBtns[0]);

    expect(greeting).not.toBeInTheDocument();
  });

  it('opens and closes the history modal', () => {
    render(<Chat />);
    const historyBtn = screen.getByLabelText(/View session history/i);
    fireEvent.click(historyBtn);

    expect(screen.getByText(/Intelligence Archives/i)).toBeInTheDocument();
    
    // There are multiple 'close' symbols (delete buttons on messages). 
    // Find the one in the modal or use a more specific selector.
    const closeBtn = screen.getAllByText('close').find(el => el.closest('.fixed'));
    fireEvent.click(closeBtn);
    
    expect(screen.queryByText(/Intelligence Archives/i)).not.toBeInTheDocument();
  });

  it('handles chat clearing', async () => {
    render(<Chat />);
    
    // Add a message first
    const input = screen.getByPlaceholderText(/Query the intelligence engine/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByLabelText(/Send message to AI assistant/i));
    
    expect(screen.getByText('Test message')).toBeInTheDocument();

    // Open clear modal
    fireEvent.click(screen.getByLabelText(/Clear chat history/i));
    expect(screen.getByText(/Clear Engine Cache/i)).toBeInTheDocument();

    // Confirm clear
    fireEvent.click(screen.getByText(/Confirm Purge/i));
    
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    // Should still have greeting
    expect(screen.getByText(/ElectionIQ Intelligence Engine/i)).toBeInTheDocument();
  });
});

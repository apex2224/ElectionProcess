/**
 * @file Home.test.jsx
 * @description Unit tests for the Home page component.
 * Validates that key UI sections render correctly.
 */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from './Home';

/** Helper to render Home wrapped in the router context it needs */
const renderHome = () =>
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

describe('Home Page', () => {
  it('renders the hero section heading', () => {
    renderHome();
    expect(screen.getByText(/The Future of/i)).toBeInTheDocument();
    expect(screen.getByText(/Civic Intelligence/i)).toBeInTheDocument();
  });

  it('renders the hero CTA buttons', () => {
    renderHome();
    // Uses aria-label for accessibility; match the aria-label text
    expect(screen.getByRole('link', { name: /Start Exploring/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ask the AI assistant a civic question/i })).toBeInTheDocument();
  });

  it('renders the features section', () => {
    renderHome();
    expect(screen.getByText(/Architected for Clarity/i)).toBeInTheDocument();
    // Use getAllByText since nav links may also match these terms
    expect(screen.getAllByText(/Interactive Guides/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/AI Chatbot/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Civic Quizzes/i).length).toBeGreaterThan(0);
  });

  it('renders the Polling Day Guide section', () => {
    renderHome();
    expect(screen.getByText(/Polling Day Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/Check Your Name in Voter List/i)).toBeInTheDocument();
    expect(screen.getByText(/Cast Your Vote \(EVM\)/i)).toBeInTheDocument();
  });

  it('renders the hero image with proper alt text', () => {
    renderHome();
    // The hero image has a specific meaningful alt attribute
    const heroImage = screen.getByAltText(/Indian voters standing/i);
    expect(heroImage).toBeInTheDocument();
    expect(heroImage.getAttribute('alt')).not.toBe('');
  });

  it('renders the Do\'s and Don\'ts section', () => {
    renderHome();
    expect(screen.getByText(/Do's/i)).toBeInTheDocument();
    expect(screen.getByText(/Don'ts/i)).toBeInTheDocument();
    expect(screen.getByText(/Carry a valid, approved original Photo ID/i)).toBeInTheDocument();
  });
});

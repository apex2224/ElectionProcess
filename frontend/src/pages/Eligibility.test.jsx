/**
 * @file Eligibility.test.jsx
 * @description Unit tests for the Eligibility checker component.
 * Validates age calculation and eligibility logic.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Eligibility from './Eligibility';

const renderEligibility = () =>
  render(
    <BrowserRouter>
      <Eligibility />
    </BrowserRouter>
  );

describe('Voter Eligibility Page', () => {
  it('renders the form heading', () => {
    renderEligibility();
    expect(screen.getByText(/Voter Eligibility/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Check Eligibility/i })).toBeInTheDocument();
  });

  it('does not show a result when the form has not been submitted', () => {
    renderEligibility();
    // Before submission, no result card should exist
    expect(screen.queryByText(/You Are Eligible!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Not Eligible/i)).not.toBeInTheDocument();
  });

  it('shows eligible result for an adult Indian citizen', () => {
    renderEligibility();
    // Set DOB to 25 years ago
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);
    const dobStr = dob.toISOString().split('T')[0];

    const dobInput = document.getElementById('dob-input') || screen.getByLabelText(/Date of birth/i);
    fireEvent.change(dobInput, { target: { value: dobStr } });
    fireEvent.click(screen.getByRole('button', { name: /Check Eligibility/i }));

    expect(screen.getByText(/You Are Eligible!/i)).toBeInTheDocument();
  });

  it('shows ineligible result for an underage person', () => {
    renderEligibility();
    // Set DOB to 16 years ago
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 16);
    const dobStr = dob.toISOString().split('T')[0];

    const dobInput = document.getElementById('dob-input') || screen.getByLabelText(/Date of birth/i);
    fireEvent.change(dobInput, { target: { value: dobStr } });
    fireEvent.click(screen.getByRole('button', { name: /Check Eligibility/i }));

    expect(screen.getByText(/Not Eligible/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 18 years old/i)).toBeInTheDocument();
  });
});

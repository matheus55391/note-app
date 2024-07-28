// src/components/NoteCard/NoteCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoteCard from './NoteCard';

describe('NoteCard', () => {
  const mockOnSelect = jest.fn();

  const defaultProps = {
    id: '1',
    title: 'Sample Note',
    time: '12:34',
    additionalText: 'This is a sample additional text.',
    isSelected: false,
    onSelect: mockOnSelect,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders NoteCard with title, time, and additional text', () => {
    render(<NoteCard {...defaultProps} />);
    expect(screen.getByText('Sample Note')).toBeInTheDocument();
    expect(screen.getByText('12:34')).toBeInTheDocument();
    expect(screen.getByText('This is a sample additional text.')).toBeInTheDocument();
  });

  test('calls onSelect with note id when clicked', () => {
    render(<NoteCard {...defaultProps} />);
    fireEvent.click(screen.getByText('Sample Note'));
    expect(mockOnSelect).toHaveBeenCalledWith('1');
  });

  test('applies selected styles when isSelected is true', () => {
    render(<NoteCard {...defaultProps} isSelected={true} />);
    expect(screen.getByText('Sample Note').closest('div')).toHaveClass('bg-yellow-300');
  });

  test('applies default styles when isSelected is false', () => {
    render(<NoteCard {...defaultProps} isSelected={false} />);
    expect(screen.getByText('Sample Note').closest('div')).toHaveClass('bg-gray-200');
  });

  test('renders default additional text if additionalText is not provided', () => {
    const propsWithoutAdditionalText = { ...defaultProps, additionalText: undefined };
    render(<NoteCard {...propsWithoutAdditionalText} />);
    expect(screen.getByText('No additional text')).toBeInTheDocument();
  });
});

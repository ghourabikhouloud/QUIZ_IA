import React from 'react';
import { render, screen } from '@testing-library/react';
import CircularProgress from 'react-circular-progressbar';

describe('CircularProgress Component', () => {
  test('renders without crashing', () => {
    render(<CircularProgress value={50} text="50%" />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('renders with default value of 0', () => {
    render(<CircularProgress />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  test('renders with specified value of 100', () => {
    render(<CircularProgress value={100} text="100%" />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  test('renders with specified value less than 0 as 0', () => {
    render(<CircularProgress value={-10} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  test('renders with specified value greater than 100 as 100', () => {
    render(<CircularProgress value={200} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  test('renders with custom text', () => {
    render(<CircularProgress value={75} text="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
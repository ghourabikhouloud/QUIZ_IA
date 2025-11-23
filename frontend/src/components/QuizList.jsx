import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import MyComponent from './MyComponent'; // Import the component to test

describe('MyComponent', () => {
  test('renders header element properly', () => {
    const { getByTestId } = render(<MyComponent />);
    const headerElement = getByTestId('header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveStyle('background: #282c34; color: white; padding: 1rem;');
  });

  test('renders footer element properly', () => {
    const { getByTestId } = render(<MyComponent />);
    const footerElement = getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveStyle('background: #f1f1f1; color: #333; padding: 1rem; text-align: center; margin-top: auto;');
  });

  test('renders main content element properly', () => {
    const { getByTestId } = render(<MyComponent />);
    const mainContentElement = getByTestId('main-content');
    expect(mainContentElement).toBeInTheDocument();
    expect(mainContentElement).toHaveStyle('flex: 1; padding: 2rem;');
  });

  test('renders fade enter elements properly', () => {
    const { getByTestId } = render(<MyComponent />);
    const fadeEnterElement = getByTestId('fade-enter');
    expect(fadeEnterElement).toBeInTheDocument();
    expect(fadeEnterElement).toHaveStyle('opacity: 0;');
  });

  test('renders fade enter active elements properly', () => {
    const { getByTestId } = render(<MyComponent />);
    const fadeEnterActiveElement = getByTestId('fade-enter-active');
    expect(fadeEnterActiveElement).toBeInTheDocument();
    expect(fadeEnterActiveElement).toHaveStyle('opacity: 1; transition: opacity 300ms;');
  });

  test('renders fade exit elements properly', () => {
    const { getByTestId } = render(<MyComponent />);
    const fadeExitElement = getByTestId('fade-exit');
    expect(fadeExitElement).toBeInTheDocument();
    expect(fadeExitElement).toHaveStyle('opacity: 1;');
  });

  test('renders fade exit active elements properly', () => {
    const { getByTestId } = render(<MyComponent />);
    const fadeExitActiveElement = getByTestId('fade-exit-active');
    expect(fadeExitActiveElement).toBeInTheDocument();
    expect(fadeExitActiveElement).toHaveStyle('opacity: 0; transition: opacity 300ms;');
  });
});
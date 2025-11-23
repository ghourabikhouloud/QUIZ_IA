import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import App from './App';

describe('App rendering', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders App component inside StrictMode', () => {
    act(() => {
      ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        container
      );
    });

    expect(container.querySelector('.app-container')).toBeTruthy();
  });

  it('logs error when root element not found', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const originalGetElementById = document.getElementById;
    document.getElementById = jest.fn(() => null);

    act(() => {
      // Render App component inside StrictMode
      ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        container
      );
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Root element not found');

    document.getElementById = originalGetElementById;
    consoleErrorSpy.mockRestore();
  });
});
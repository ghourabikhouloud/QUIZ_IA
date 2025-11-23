import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import QuizList from './QuizList';

describe('QuizList Component', () => {
  it('renders loading state correctly', () => {
    render(<QuizList />);
    expect(screen.getByText('Chargement des quiz...')).toBeInTheDocument();
  });

  it('renders error state correctly', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Mock Error'));
    render(<QuizList />);
    await waitFor(() => {
      expect(screen.getByText('Erreur lors du chargement des quiz : Mock Error')).toBeInTheDocument();
    });
  });

  it('renders empty state correctly', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce([]) });
    render(<QuizList />);
    await waitFor(() => {
      expect(screen.getByText('Aucun quiz disponible')).toBeInTheDocument();
    });
  });

  it('renders quiz list correctly', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce([{ id: 1, title: 'Test Quiz', description: 'Test Description' }]) });
    render(<QuizList />);
    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  it('navigates to quiz on start button click', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce([{ id: 1, title: 'Test Quiz', description: 'Test Description' }]) });
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
    render(<QuizList />);
    await waitFor(() => {
      const startButton = screen.getByText('Démarrer');
      startButton.click();
      expect(mockNavigate).toHaveBeenCalledWith('/quiz/1');
    });
  });
});
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FilmsPanel from '../Components/FilmsPanel'; 
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('FilmsPanel', () => {
  it('deve renderizar o estado de carregamento inicialmente', () => {
    render(
      <BrowserRouter>
        <FilmsPanel />
      </BrowserRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('deve renderizar os filmes quando a chamada à API for bem-sucedida', async () => {
    const films = [{ id: 1, title: 'Film 1', poster_path: '/film1.jpg' }];
    axios.get.mockResolvedValueOnce({ data: { results: films } });

    render(
      <BrowserRouter>
        <FilmsPanel />
      </BrowserRouter>
    );

 
    await waitFor(() => {
      expect(screen.getByText('Film 1')).toBeInTheDocument();
    });
  });

  it('deve renderizar uma mensagem de erro quando a chamada à API falhar', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching films'));

    render(
      <BrowserRouter>
        <FilmsPanel />
      </BrowserRouter>
    );


    await waitFor(() => {
      expect(screen.getByText(/error loading films/i)).toBeInTheDocument();
    });
  });

  it('deve renderizar uma mensagem "nenhum filme encontrado" quando não houver filmes disponíveis', async () => {
    axios.get.mockResolvedValueOnce({ data: { results: [] } });

    render(
      <BrowserRouter>
        <FilmsPanel />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/No films available/i)).toBeInTheDocument();
    });
  });

  it('deve renderizar múltiplos filmes corretamente', async () => {
    const films = [
      { id: 1, title: 'Film 1', poster_path: '/film1.jpg' },
      { id: 2, title: 'Film 2', poster_path: '/film2.jpg' },
      { id: 3, title: 'Film 3', poster_path: '/film3.jpg' }
    ];
    axios.get.mockResolvedValueOnce({ data: { results: films } });

    render(
      <BrowserRouter>
        <FilmsPanel />
      </BrowserRouter>
    );

    await waitFor(() => {
      films.forEach(film => {
        expect(screen.getByText(film.title)).toBeInTheDocument();
      });
    });
  });
});
